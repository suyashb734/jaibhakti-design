/* Media screen designs. Shared helpers come from components.js; samples from fixtures.js. */
(() => {
  "use strict";
  const {
    getOccurrence,
    page,
    esc,
    date,
    icon,
    formatted,
    action,
    button,
    state,
    notice,
    support,
    certificateSvg,
    posterSvg,
    certificatePreview,
    assetButtons,
    videoBlocks,
    sampleSwitch,
  } = window.JBDesign;

  function certificatePage(id) {
    const o = getOccurrence(id);
    return page(
      "Seva Certificate",
      `<p class="eyebrow">${esc(date(o.date))} · Performed</p>${sampleSwitch("certificate", o)}${certificatePreview(o, false)}<p class="small muted">This certificate belongs to the seva performed on ${esc(formatted(o.date))}.</p>${assetButtons(o, "certificate")}<div class="section-title"><h2>Seva videos</h2></div><div class="card">${o.videos ? `<p class="small">${o.videos} ${o.videos === 1 ? "video is" : "videos are"} ready for this date.</p>${videoBlocks(o)}` : '<p class="small">Your seva videos are being prepared.</p><p class="micro muted spaced">Available within 48 hours of completion.</p>'}</div>`,
      { back: `occurrence/${o.id}` },
    );
  }
  function videoPage(id) {
    const o = getOccurrence(id),
      selected = state.selectedVideo,
      total = o.mixed ? 2 : Math.max(1, o.videos),
      preparing = o.mixed && selected === 2,
      failed = o.videoError && selected === 1,
      land = o.orient === "landscape",
      frameClass = land ? "landscape" : "portrait",
      posterUri = "data:image/svg+xml;utf8," + encodeURIComponent(posterSvg(land, true));
    const player = preparing
      ? `<div class="video-frame ${frameClass}">${icon("clock", "scene-icon")}</div>${notice("Video 2 is being prepared", "Video 1 is ready to watch, download and share. Video 2 will be available within 48 hours of completion.", "", "clock")}`
      : failed
        ? `<div class="video-frame ${frameClass}">${icon("alert", "scene-icon")}</div>${notice("This video couldn’t be loaded", "Try again or choose Video 2. Your ready certificate and other video remain available.", "red", "alert")}${action("Try Video Again", "retry-video", "secondary")}`
        : `<video class="video-frame ${frameClass}" controls playsinline preload="metadata" poster="${posterUri}" aria-label="Seva video ${selected} of ${total} for ${esc(o.beneficiary)} on ${esc(formatted(o.date))}"><source src="assets/sample-seva-preview.webm" type="video/webm">Your browser does not support this video. Use Download to save it.</video>`;
    return page(
      "Seva Videos",
      `<p class="eyebrow">${esc(date(o.date))} · Performed</p><h2 class="subheading">For ${esc(o.beneficiary)}</h2><p class="subtext">${esc(o.gotra)} gotra · ${esc(o.ref)}</p>${sampleSwitch("video", o)}${player}<h3 class="video-title">Seva video ${selected} of ${total}</h3><p class="video-caption">${esc(o.name)}<br>${esc(o.temple)}</p><div class="video-selector" role="group" aria-label="Choose a seva video">${Array.from({ length: total }, (_, i) => `<button type="button" data-action="choose-video" data-value="${i + 1}" aria-pressed="${selected === i + 1}" aria-label="Seva video ${i + 1} of ${total}${o.mixed && i === 1 ? ", preparing" : ""}">Video ${i + 1}${o.mixed && i === 1 ? " · Preparing" : ""}</button>`).join("")}</div>${!preparing && !failed ? `<div class="button-row"><a class="button" href="assets/sample-seva-preview.webm" download="sample-seva-video-${selected}.webm">${icon("download")}Download</a>${action("Share", "asset-share", "secondary", 'data-id="' + esc(o.id) + '" data-kind="video"', "share")}</div>` : ""}<section class="detail-section"><h2>Seva certificate</h2><div class="card"><div class="asset-card"><span class="asset-icon">${icon("certificate")}</span><div><h3>${o.certificate === "Ready" ? "Certificate ready" : "Certificate being prepared"}</h3><p>${o.certificate === "Ready" ? "Available independently of your videos." : "Available within 48 hours of completion."}</p></div></div>${o.certificate === "Ready" ? certificatePreview(o) + assetButtons(o, "certificate") : ""}</div></section>${support(o.ref)}`,
      { back: `occurrence/${o.id}` },
    );
  }
  function certificateBlob(o) {
    const svg = certificateSvg(o, true);
    return new Blob([svg], { type: "image/svg+xml" });
  }

  Object.assign(window.JBDesign, {
    certificatePage,
    videoPage,
    certificateBlob,
  });
})();