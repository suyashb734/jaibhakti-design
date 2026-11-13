"""Serve the static review hub locally or through a private Codespaces port."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit
from urllib.request import urlopen
import argparse
import hashlib
import json
import socket
import subprocess
import sys
import tempfile
import time

ROOT=Path(__file__).resolve().parents[1]
ROOT_ID=hashlib.sha256(str(ROOT).encode()).hexdigest()[:16]
HEALTH='/__design_hub_health__'


class ReviewHandler(SimpleHTTPRequestHandler):
    extensions_map={**SimpleHTTPRequestHandler.extensions_map,'.md':'text/plain; charset=utf-8'}

    def do_GET(self):
        path=unquote(urlsplit(self.path).path)
        if path==HEALTH:
            payload=json.dumps({'application':'jaibhakti-design-hub','root_id':ROOT_ID}).encode()
            self.send_response(200)
            self.send_header('Content-Type','application/json')
            self.send_header('Content-Length',str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        if any(part.startswith('.') for part in PurePosixPath(path).parts if part!='/'):
            self.send_error(403,'Internal files are not part of the review site')
            return
        super().do_GET()

    def do_HEAD(self):
        path=unquote(urlsplit(self.path).path)
        if any(part.startswith('.') for part in PurePosixPath(path).parts if part!='/'):
            self.send_error(403,'Internal files are not part of the review site')
            return
        super().do_HEAD()

    def end_headers(self):
        self.send_header('Cache-Control','no-store')
        super().end_headers()


def healthy(port):
    try:
        with urlopen(f'http://127.0.0.1:{port}{HEALTH}',timeout=.5) as response:
            status=json.load(response)
            return status.get('application')=='jaibhakti-design-hub' and status.get('root_id')==ROOT_ID
    except (OSError,ValueError):
        return False


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--port',type=int,default=8000)
    parser.add_argument('--bind',default='127.0.0.1')
    parser.add_argument('--background',action='store_true')
    args=parser.parse_args()
    if args.background:
        if healthy(args.port):
            print(f'Design hub is already running at http://localhost:{args.port}')
            return
        with socket.socket() as probe:
            if probe.connect_ex(('127.0.0.1',args.port))==0:
                raise SystemExit(f'Port {args.port} is in use by another service. Choose a different --port.')
        log=Path(tempfile.gettempdir())/f'jaibhakti-design-{ROOT_ID}-{args.port}.log'
        with log.open('ab') as output:
            process=subprocess.Popen([sys.executable,str(Path(__file__).resolve()),'--bind',args.bind,'--port',str(args.port)],cwd=ROOT,stdin=subprocess.DEVNULL,stdout=output,stderr=output,start_new_session=True)
        for _ in range(30):
            if healthy(args.port):
                print(f'Design hub at http://localhost:{args.port} (process {process.pid})')
                return
            if process.poll() is not None:break
            time.sleep(.1)
        raise SystemExit(f'Design hub did not start. Check {log}')
    handler=partial(ReviewHandler,directory=str(ROOT))
    server=ThreadingHTTPServer((args.bind,args.port),handler)
    print(f'Design hub at http://localhost:{args.port}',flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__=='__main__':main()
