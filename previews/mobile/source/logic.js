
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = this.initState(props.start || 'home');
  }

  initState(start) {
    if (!start || ['splash', 'login', 'otp', 'sevaManage', 'gyan', 'panchang', 'aarti', 'article', 'bookings'].indexOf(start) > -1) start = 'home';
    const pre = ['splash', 'login', 'otp'].indexOf(start) === -1;
    const withCart = ['detail', 'cart', 'pay'].indexOf(start) > -1;
    const sevaOn = ['sevaSuccess', 'sevaManage'].indexOf(start) > -1;
    const s = {
      screen: start === 'mandate' ? 'sevaSetup' : start, hist: [], tab: (start === 'bhent' || start === 'gyan' || start.indexOf('seva') === 0 || start === 'mandate') ? (start === 'gyan' ? 'gyan' : (start === 'home' ? 'home' : 'bhent')) : 'home',
      pickLang: 'en', lang: 'en', ob: 0, hDeity: 'all',
      sWeeks: 8, sFam: false, sName2: '', sFaq: 0, apApp: 'phonepe', apConsent: start === 'mandate', mandate: start === 'mandate' ? 'approve' : null, pin: start === 'mandate' ? '48' : '',
      sevaActive: null,
      phone: (pre || start === 'otp') ? '9876543210' : '',
      channel: 'wa', consent: false, otp: '', otpAt: Date.now(),
      name: pre ? 'Rohit Sharma' : '', gotra: pre ? 'Kashyap (assigned)' : '',
      sheet: null, bhentId: 'khatu', cartB: 'khatu', sevaId: 'laxmi',
      cart: withCart ? { nishan: 1, ittar: 1 } : {},
      q: '', deity: 'all', problem: null, faq: 0,
      family: false, name2: '', prasad: false, pay: 'phonepe', paying: false,
      bookings: [], lastBooking: null, toast: null,
      gq: '', gcat: 'all', articleId: 'haare', playing: false, playAt: 0, playBase: 0,
      track: null, rashi: 0, heroOff: 0, now: Date.now()
    };
    if (start === 'success' || start === 'bookings') {
      const bk = this.makeBooking(Object.assign({}, s, { cart: { nishan: 1, ittar: 1 } }));
      s.bookings = [bk];
      s.lastBooking = bk;
    }
    if (sevaOn) s.sevaActive = this.makeSeva(s);
    if (start === 'home') s.tab = 'home';
    return s;
  }

  makeSeva(st) {
    const d = this.data();
    const now = Date.now();
    const n = new Date(now + 19800000);
    const names = [st.name || 'Rohit Sharma'];
    if (st.sFam && st.sName2 && st.sName2.trim()) names.push(st.sName2.trim());
    const app = d.PAY.filter((p) => p.id === st.apApp)[0] || d.PAY[0];
    return {
      id: 'DS-' + n.getUTCFullYear() + this.pad(n.getUTCMonth() + 1) + this.pad(n.getUTCDate()) + '-' + (1000 + Math.floor(Math.random() * 9000)),
      weeks: st.sWeeks || 8, x: names.length - 1, startClose: this.nextClose(d.SEVA, now),
      title: this.sevaFor(st.sevaId || 'laxmi').title,
      names: names.join(', '), gotra: st.gotra || 'Kashyap (assigned)', app: app.l, appI: app.i, appC: app.c, status: 'active'
    };
  }

  sevaFor(id) {
    const d = this.data();
    const MANDIR = {
      ganesh: { p1: 'Shri Chintamani Ganesh Mandir sits in the old lanes of Kashi, close to the ghats of the Ganga. It is one of the revered Vinayaka shrines that, by tradition, guard the sacred city, and devotees often visit it before beginning any important work.', p2: 'The murti is self-manifested (swayambhu) and is worshipped with sindoor and laddoo bhog. On Wednesdays and on Sankashti Chaturthi the mandir fills with families offering durva, modak and laddoos for clarity of mind and freedom from worry.', loc: 'Kashi (Varanasi), Uttar Pradesh', known: 'Swayambhu Ganesh · Kashi Vinayaka', busy: 'Wednesdays · Sankashti Chaturthi' },
      khatu: { p1: 'Shri Shyam Mandir in Khatu, Sikar district, is the principal dhaam of Khatu Shyam Ji. The shish (head) of Barbarik is said to have been found here, and the present temple stands on the site where it was enshrined.', p2: 'The mandir is built in white marble with a richly carved sanctum. During the Phalguna Mela, lakhs of devotees walk to Khatu carrying saffron nishans, chanting "Haare ka Sahara, Baba Shyam Hamara".', loc: 'Khatu, Sikar, Rajasthan', known: 'Shish of Barbarik · Nishan yatra', busy: 'Ekadashi · Phalguna Mela' },
      mahakal: { p1: 'Shri Mahakaleshwar in Ujjain is one of the twelve Jyotirlingas and the only one that faces south, which is why Mahadev here is worshipped as Dakshinamukhi, the lord of time and death.', p2: 'The temple rises in five levels beside the Rudra Sagar lake. Its pre-dawn Bhasma Aarti is among the most sacred rituals in Bharat, and Ujjain also hosts the Simhastha Kumbh every twelve years.', loc: 'Ujjain, Madhya Pradesh', known: 'Jyotirlinga · Bhasma Aarti', busy: 'Mondays · Shravan · Mahashivratri' },
      hanuman: { p1: 'Shri Sankat Mochan Hanuman Mandir in Varanasi stands on the banks of the Assi river. Tradition holds that it was founded by Goswami Tulsidas, author of the Ramcharitmanas, at the spot where he had darshan of Hanuman ji.', p2: 'Hanuman ji faces his Prabhu Shri Ram, whose shrine stands opposite. Devotees offer besan laddoos and sindoor, recite the Hanuman Chalisa, and the Tuesday and Saturday aartis draw thousands.', loc: 'Varanasi, Uttar Pradesh', known: 'Founded by Tulsidas · Laddoo prasad', busy: 'Tuesdays · Saturdays · Hanuman Jayanti' },
      shani: { p1: 'Shri Shanaishwar Devasthan in Shani Shingnapur is one of the best-known Shani temples in India. Shani Dev is worshipped here as a black stone, standing open to the sky on a raised platform, with no roof above him.', p2: 'The village is famous for its faith in Shani Dev\'s protection: homes traditionally have no doors or locks. Devotees offer sesame oil (tel abhishek) and black til, especially on Saturdays and on Shani Amavasya.', loc: 'Shingnapur, Ahilyanagar, Maharashtra', known: 'Open-air swayambhu shila · Tel abhishek', busy: 'Saturdays · Shani Amavasya' },
      laxmi: { p1: 'Shri Mahalakshmi Mandir in Kolhapur, called Ambabai by devotees, is one of the Shakti Peethas described in the Puranas. The temple is built in black stone in the Hemadpanthi style and is believed to date back over a thousand years.', p2: 'The murti of Maa Mahalakshmi is carved in precious black stone and faces west. During Kiranotsav, the setting sun falls directly on the deity for a few days each year, and Navratri brings lakhs of devotees to Kolhapur.', loc: 'Kolhapur, Maharashtra', known: 'Shakti Peetha · Kiranotsav', busy: 'Fridays · Navratri · Diwali' },
      pitru: { p1: 'Vishnupad Mandir in Gaya stands on the banks of the Phalgu river and enshrines a footprint of Bhagwan Vishnu set in solid rock, about forty centimetres long, surrounded by a silver basin.', p2: 'Gaya is considered the foremost place in Bharat for pind daan and shraddh. During Pitru Paksha, families from across the country gather here to offer tarpan for the peace of their ancestors.', loc: 'Gaya, Bihar', known: 'Vishnu\'s footprint · Pind daan', busy: 'Pitru Paksha · Amavasya' }
    };
    const SE = d.SEVA;
    const WDL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const base = {
      offerTitle: 'Laddoo Seva', planTitle: 'Ganesh Ketu Shanti seva', dayName: 'Wednesday', setupName: 'Chintamani Ganesh Saptahik Laddoo Seva',
      ticks: ['Laddoo bhog offered at Chintamani Ganesh every Wednesday', 'Sankalp with your name and gotra, every week', 'Full puja video on WhatsApp after each puja', 'Live updates on WhatsApp on puja day', 'First Wednesday at ₹51 only, then ₹101 per week by UPI Autopay', 'Ends by itself after your last Wednesday · pause or stop in 2 taps'],
      about1: 'Wednesday belongs to Budh and to Ganesha, the remover of obstacles. In the Jyotish tradition Ganesha is the presiding deity of Ketu, the shadow graha of sudden turns and unexplained unease, which is why Ketu shanti begins with Ganapati upasana.',
      about2: "At Chintamani Ganesh in Kashi, the deity's name itself means the jewel that dissolves worry. Keeping the seva for a count of Wednesdays follows the Budhvar vrat tradition: a sankalp kept, week after week, and then completed.",
      why: [
        { t: 'Ketu shanti', x: 'For restlessness, confusion and sudden obstacles, as per tradition.' },
        { t: 'Career and exams', x: 'Devotees keep Budhvar seva for clear thinking and steadier work.' },
        { t: 'A vrat, completed', x: 'A fixed count of Wednesdays, kept and finished, with proof every week.' }
      ]
    };
    const b = d.B.filter((x) => x.id === id)[0];
    if (!b) return Object.assign({}, SE, base, { mandir: MANDIR.ganesh, hasImg: false, noImg: true });
    const dn = b.day >= 0 ? WDL[b.day] : 'evening';
    const it = b.items[0];
    const who = b.short;
    const EXTRA = {
      laxmi: {
        deity: 'Maa Lakshmi', startedWeek: '12,000', img: (window.__resources && window.__resources.imgChunri) || './assets/laal-chunri.png', offerLine: 'Kumkum and laal chunri offered at Maa Lakshmi\'s feet',
        faqA: 'Pure kumkum and a laal chunri are offered at the feet of Maa Mahalakshmi in Kolhapur by the temple pandit, as per Vedic vidhi, every Friday.',
        why: [
          { t: 'Lakshmi stays where she is welcomed', x: 'In tradition, kumkum and laal chunri are how a home welcomes Maa Lakshmi. Offering them every Friday invites her to stay, not just visit.' },
          { t: 'Relief from money worries', x: 'Devotees keep this seva when income feels unsteady, debts weigh heavy or savings never seem to last.' },
          { t: 'Shukra made strong', x: 'Friday belongs to Shukra, the graha of comfort and fortune. Seva on this day is kept to strengthen it, as per Jyotish.' },
          { t: 'From a Shakti Peetha', x: 'Your offering is made at Mahalakshmi Kolhapur, one of the most powerful seats of the Devi in Bharat, not at a local shrine.' },
          { t: 'Proof, every single time', x: 'You see your seva being offered on video and receive a certificate. Faith, with nothing left to doubt.' }
        ],
        reviews: [
          { n: 'Sunita Agarwal', c: 'Jaipur', dt: '23 Oct 2026', st: 5, x: 'Our shop had been slow for almost a year. Three Fridays after starting the chunri seva, a big wholesale order came in. Maa ne sun li.' },
          { n: 'Rakesh Jain', c: 'Indore', dt: '16 Oct 2026', st: 5, x: 'A loan I had been chasing for months was finally sanctioned. I watch the seva video every Friday with my wife.' },
          { n: 'Priya Kulkarni', c: 'Pune', dt: '16 Oct 2026', st: 5, x: 'I could never travel to Kolhapur. Seeing the laal chunri offered to Ambabai in my name made me cry. There is a new peace at home.' },
          { n: 'Manoj Gupta', c: 'Kanpur', dt: '9 Oct 2026', st: 5, x: 'Money used to slip away as soon as it came. In two months of seva, we have saved for the first time in years.' },
          { n: 'Kavita Shah', c: 'Ahmedabad', dt: '9 Oct 2026', st: 4, x: 'My husband got the promotion he had been waiting for. The certificate with our gotra is now framed in our mandir.' },
          { n: 'Deepa Reddy', c: 'Hyderabad', dt: '2 Oct 2026', st: 5, x: 'Fights over money had become daily at home. Since the seva, things are calmer and we sit together for aarti again.' },
          { n: 'Anil Mehta', c: 'Mumbai', dt: '25 Sep 2026', st: 5, x: 'A property dispute in the family was settled amicably. I believe Maa Lakshmi brought everyone to the table.' },
          { n: 'Ritu Saxena', c: 'Lucknow', dt: '18 Sep 2026', st: 5, x: 'I started my boutique after the first seva. Orders have been steady ever since. Har Shukravar ab Maa ke naam.' }
        ]
      },
      hanuman: {
        deity: 'Hanuman ji', startedWeek: '9,800', img: (window.__resources && window.__resources.imgChurma) || './assets/laddoo-churma.png', offerLine: 'Laddoo and churma offered at Hanuman ji\'s feet',
        faqA: 'Fresh laddoo and churma are offered as bhog to Hanuman ji at Sankat Mochan Mandir, Varanasi, by the temple pandit, as per Vedic vidhi, every Tuesday.',
        why: [
          { t: 'Sankat Mochan, the remover of trouble', x: 'When a problem refuses to go away, devotees turn to Hanuman ji. This seva places your sankat at his feet, every Tuesday.' },
          { t: 'Courage when you need it most', x: 'For exams, interviews, court matters or a hard phase at work, Hanuman ji is invoked for strength and fearlessness.' },
          { t: 'Protection for the family', x: 'Laddoo churma bhog is offered for protection from negativity, accidents and the evil eye, as per tradition.' },
          { t: 'Mangal and Shani softened', x: 'Tuesday seva to Hanuman ji is kept to calm the effects of Mangal dosh and Shani\'s sade sati.' },
          { t: 'Where Tulsidas had darshan', x: 'Your offering is made at Sankat Mochan, Varanasi, the mandir linked to Goswami Tulsidas himself, with a video as proof.' }
        ],
        reviews: [
          { n: 'Amit Tiwari', c: 'Patna', dt: '20 Oct 2026', st: 5, x: 'I had failed my bank exam twice. Kept the laddoo churma seva for a month and cleared it this time. Jai Bajrangbali.' },
          { n: 'Suresh Yadav', c: 'Varanasi', dt: '20 Oct 2026', st: 5, x: 'A court case had dragged on for four years. Two weeks after starting the seva, the judgement came in our favour.' },
          { n: 'Neha Singh', c: 'Delhi', dt: '13 Oct 2026', st: 5, x: 'My father was in hospital and we were scared. The seva video every Tuesday gave us strength. He is home and healthy now.' },
          { n: 'Rahul Verma', c: 'Bhopal', dt: '13 Oct 2026', st: 5, x: 'I used to get anxious and nervous before every meeting. Since the seva I feel a steady courage I did not have before.' },
          { n: 'Pooja Mishra', c: 'Lucknow', dt: '6 Oct 2026', st: 4, x: 'Bad dreams and fear had troubled my son for months. After a few Tuesdays of seva, he sleeps peacefully again.' },
          { n: 'Vikram Chauhan', c: 'Jaipur', dt: '29 Sep 2026', st: 5, x: 'My pandit ji said Mangal was troubling my marriage plans. The rishta was fixed within two months of seva.' },
          { n: 'Sanjay Pandey', c: 'Prayagraj', dt: '22 Sep 2026', st: 5, x: 'Business losses had shaken my confidence. Things have turned around and I keep this seva every week now as thanks.' },
          { n: 'Meera Joshi', c: 'Bengaluru', dt: '15 Sep 2026', st: 5, x: 'We live far from Kashi, but watching laddoo churma being offered at Sankat Mochan in our name feels like being there.' }
        ]
      }
    };
    const X = EXTRA[b.id] || { deity: 'the deity', startedWeek: '146', offerLine: it.desc, faqA: it.desc + ', at ' + b.temple + ', by the temple pandit.' };
    return Object.assign({}, SE, {
      id: b.id, short: b.short, cat: b.cat, problems: b.problems || [], title: b.title, plaque: b.plaque, plaqueSub: b.plaqueSub + ' · every ' + dn,
      purpose: b.purpose, temple: b.temple, templeShort: b.templeShort, visesh: b.visesh, day: b.day, ch: b.ch, cm: b.cm, closeTxt: b.closeTxt, pujaTime: b.pujaTime, bg: b.bg,
      devotees: b.devotees, rating: b.rating, reviewsN: b.reviewsN,
      offerTitle: it.name, planTitle: who + ' ' + b.visesh + ' seva', dayName: dn, setupName: who + ' ' + it.name,
      ticks: [X.offerLine + ', every ' + dn, 'You will receive a certificate and video of your seva', 'You can choose to add your name and gotra sankalp by Pandit ji during the seva', 'Regular updates will be shared on WhatsApp', 'Introductory offer at ₹51, then ₹101 per seva'],
      deityName: X.deity, startedWeek: X.startedWeek, offerImgStyle: X.img ? "background: url('" + X.img + "') center / contain no-repeat;" : '', hasImg: !!X.img, noImg: !X.img,
      about1: b.about, about2: b.deityTxt || '', why: X.why || b.why || base.why, mandir: MANDIR[b.id] || MANDIR.ganesh,
      reviews: X.reviews || [
        { n: 'Sunita Verma', c: 'Indore', dt: '16 Sep 2026', st: 5, x: 'Things at home had been tense for months. Since we began the ' + it.name + ' at ' + b.templeShort + ', there is a peace in the house again.' },
        { n: 'Rajesh Gupta', c: 'Lucknow', dt: '12 Sep 2026', st: 5, x: 'My business was stuck with one obstacle after another. After a few sevas to ' + who + ', two pending payments came through.' },
        { n: 'Kavita Joshi', c: 'Pune', dt: '9 Sep 2026', st: 5, x: 'I used to wake up anxious every night. Watching the seva video every ' + dn + ' has brought a calm I had not felt in years.' },
        { n: 'Amit Tiwari', c: 'Patna', dt: '5 Sep 2026', st: 5, x: 'I got the job offer I had been waiting for. I keep this seva every week now, as thanks to ' + who + '.' },
        { n: 'Meena Iyer', c: 'Bengaluru', dt: '2 Sep 2026', st: 4, x: 'We live far from ' + b.templeShort + ', but hearing my husband\'s name in the sankalp felt like standing there. His health has been steadier since.' },
        { n: 'Pooja Agarwal', c: 'Jaipur', dt: '29 Aug 2026', st: 5, x: 'My daughter\'s rishta kept breaking at the last moment. This month the engagement happened without a single hurdle.' },
        { n: 'Vikas Mehra', c: 'Delhi', dt: '26 Aug 2026', st: 5, x: 'A court case pending for three years finally settled in our favour. The family watches every seva video together.' },
        { n: 'Neha Saxena', c: 'Bhopal', dt: '22 Aug 2026', st: 5, x: 'I was confused about a big decision. After the seva I felt clear-headed and chose with peace. It was the right choice.' }
      ],
      faqs: [
        { q: 'What is offered in the ' + it.name + '?', a: X.faqA },
        { q: 'Will my name and gotra be taken?', a: 'Yes, if you choose the Sankalp add-on on the payment page. Pandit ji will then take your name and gotra in the sankalp during the seva.' },
        { q: 'When will I receive my seva video?', a: 'Your seva video is sent to you on WhatsApp within 48 hours of the seva.' },
        { q: 'Will I receive prasad at home?', a: 'No. The seva is offered to ' + X.deity + ' at the temple, and you receive the blessings at home.' },
        { q: 'What if the seva does not happen?', a: 'Under the Jai Bhakti promise, if your seva is not offered or the video does not reach you, the amount for that seva is refunded in full.' }
      ]
    });
  }

  sevaSched(startClose, n, x) {
    const SV = this.data().SEVA;
    const D = 86400000, IST = 19800000;
    const first = SV.first + SV.extra * x, weekly = SV.weekly + SV.extra * x;
    const total = first + weekly * (n - 1);
    const pd = (k) => new Date(startClose + IST + k * 7 * D);
    const last = pd(n - 1);
    const exp = new Date(last.getTime() + 7 * D);
    const inr = (v) => this.inr(v);
    const rows = [];
    for (let k = 0; k < n; k++) rows.push({ k: k, wk: 'Week ' + (k + 1), date: this.fmtD(pd(k)), amt: inr(k === 0 ? first : weekly), note: k === 0 ? 'Paid today' : 'Autopay on ' + this.fmtD(new Date(pd(k).getTime() - D)) });
    return {
      n: n, first: first, weekly: weekly, total: total,
      firstTxt: inr(first), weeklyTxt: inr(weekly), totalTxt: inr(total), thenLine: inr(weekly) + ' × ' + (n - 1), ordinal: n + 'th', debits: n - 1,
      range: this.fmtD(pd(0)) + ' – ' + this.fmtDL(last), startTxt: this.fmtD(pd(0)), endShort: this.fmtD(last), expTxt: this.fmtDL(exp),
      firstDebitTxt: this.fmtD(new Date(pd(1).getTime() - D)), lastDebitTxt: this.fmtD(new Date(last.getTime() - D)),
      pujaMs: (k) => startClose + k * 7 * D + 2 * 3600000, debitMs: (k) => startClose + k * 7 * D - D, rows: rows
    };
  }

  componentDidMount() {
    this.iv = setInterval(() => this.setState({ now: Date.now() }), 1000);
    if (this.state.screen === 'splash' && !this.props.still) {
      this.sp = setTimeout(() => { if (this.state.screen === 'splash') this.setState({ screen: 'login' }); }, 2800);
    }
  }

  componentDidUpdate(prev) {
    if (this.props.start && prev.start !== this.props.start) this.setState(this.initState(this.props.start));
  }

  componentWillUnmount() {
    clearInterval(this.iv);
    clearTimeout(this.sp);
    clearTimeout(this.pt);
  }

  pad(n) { return (n < 10 ? '0' : '') + n; }
  inr(n) { return '₹' + Number(n).toLocaleString('en-IN'); }
  fmtD(x) {
    const W = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return W[x.getUTCDay()] + ', ' + x.getUTCDate() + ' ' + M[x.getUTCMonth()];
  }
  fmtDL(x) { return this.fmtD(x) + ' ' + x.getUTCFullYear(); }

  nextClose(b, now) {
    const IST = 19800000;
    const n = new Date(now + IST);
    let t = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), b.ch, b.cm || 0);
    if (b.day >= 0) t += ((b.day - n.getUTCDay() + 7) % 7) * 86400000;
    if (t <= now + IST) t += (b.day >= 0 ? 7 : 1) * 86400000;
    return t - IST;
  }

  cd(ms) {
    const t = Math.max(0, Math.floor(ms / 1000));
    const dd = Math.floor(t / 86400), h = Math.floor((t % 86400) / 3600), m = Math.floor((t % 3600) / 60), sec = t % 60;
    const p = (v) => this.pad(v);
    return {
      d: dd, dd: p(dd), hh: p(h), mm: p(m), ss: p(sec), hasD: dd > 0, urgent: t < 6 * 3600,
      short: dd > 0 ? dd + 'd ' + p(h) + 'h ' + p(m) + 'm' : p(h) + 'h ' + p(m) + 'm ' + p(sec) + 's',
      clock: (dd > 0 ? dd + 'd ' : '') + p(h) + ':' + p(m) + ':' + p(sec)
    };
  }

  icon(i) {
    const k = i.icon;
    return {
      ic: { flag: k === 'flag', bottle: k === 'bottle', feather: k === 'feather', rose: k === 'rose', diya: k === 'diya', laddoo: k === 'laddoo', bowl: k === 'bowl', leaf: k === 'leaf', kalash: k === 'kalash', garland: k === 'garland', book: k === 'book' },
      liquid: i.liquid || 'url(#lGold)', grain: i.grain || '#E8C27A', f1: i.f1 || 'url(#dMari)', f2: i.f2 || 'url(#dMari2)'
    };
  }

  addItem(bid, iid, delta) {
    this.setState((st) => {
      const switching = st.cartB !== bid && Object.keys(st.cart).length > 0;
      const cart = st.cartB === bid ? Object.assign({}, st.cart) : {};
      const q = Math.max(0, (cart[iid] || 0) + delta);
      if (q === 0) delete cart[iid]; else cart[iid] = q;
      const out = { cart: cart, cartB: bid };
      if (switching && delta > 0) out.toast = { m: 'Started a new seva here. One temple per sankalp.', t: Date.now() };
      return out;
    });
  }

  makeBooking(st) {
    const d = this.data();
    const b = d.B.filter((x) => x.id === st.cartB)[0] || d.B[0];
    const lines = b.items.filter((i) => (st.cart[i.id] || 0) > 0);
    const sub = lines.reduce((a, i) => a + i.price * st.cart[i.id], 0);
    const free = sub >= 301;
    const fee = free ? 0 : (st.prasad ? 101 : 0);
    const now = Date.now();
    const close = this.nextClose(b, now);
    const offer = new Date(close + 19800000 + (b.nextDay ? 86400000 : 0));
    const vid = new Date(offer.getTime() + 2 * 86400000);
    const n = new Date(now + 19800000);
    const names = [st.name || 'Rohit Sharma'];
    if (st.family && st.name2 && st.name2.trim()) names.push(st.name2.trim());
    return {
      id: 'DH-' + n.getUTCFullYear() + this.pad(n.getUTCMonth() + 1) + this.pad(n.getUTCDate()) + '-' + (1000 + Math.floor(Math.random() * 9000)),
      bhentId: b.id, title: b.title, templeShort: b.templeShort, temple: b.temple,
      linesTxt: lines.map((i) => i.name + ' × ' + st.cart[i.id]).join(', '),
      names: names.join(', '), nameCount: names.length, gotra: st.gotra || 'Kashyap (assigned)',
      when: this.fmtD(offer) + ' · ' + b.pujaTime + ' IST', video: this.fmtD(vid),
      totalTxt: this.inr(sub + fee),
      prasadTxt: free ? 'Home delivery · free' : (st.prasad ? 'Home delivery · ₹101' : 'Not added')
    };
  }

  reviews(b) {
    if (b.id === 'pitru') {
      return [
        { n: 'Priya Nair', c: 'New Jersey', dt: '21 Sep 2026', st: 5, x: 'I could not travel to Gaya for Papa. Seeing his name read at Vishnupad meant a great deal to my mother.', item: 'Til Jal Tarpan' },
        { n: 'Anil Verma', c: 'Indore', dt: '20 Sep 2026', st: 5, x: 'The pandit explained each step of the tarpan in the video. Quiet and respectful.', item: 'Pind Daan' },
        { n: 'Suresh Iyer', c: 'Chennai', dt: '19 Sep 2026', st: 4, x: "We did not know Dadaji's tithi. They explained the Sarva Pitru option clearly before we paid.", item: 'Brahmin Bhojan' }
      ];
    }
    return [
      { n: 'Meena Agarwal', c: 'Jaipur', dt: '17 Sep 2026', st: 5, x: 'The video came on WhatsApp in two days. Pandit ji read our names and gotra clearly before the ' + b.items[0].name + '.', item: b.items[0].name },
      { n: 'Rohit Sharma', c: 'Gurugram', dt: '10 Sep 2026', st: 5, x: 'I added my parents at the last minute. The countdown told me exactly how long I had.', item: b.items[1].name },
      { n: 'Kavita Joshi', c: 'Pune', dt: '3 Sep 2026', st: 4, x: 'Beautifully filmed at ' + b.templeShort + '. Prasad took nine days to reach Pune, but it was well packed.', item: b.items[2].name }
    ];
  }

  faqs(b) {
    const WDL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return [
      { q: 'Will my name really be read?', a: 'Yes. Pandit ji reads every name and gotra in the sankalp before offering your seva at ' + b.templeShort + '. The moment is in your video.' },
      { q: 'When will I receive the video?', a: 'Within 48 hours of the offering, on WhatsApp and in My bookings.' },
      { q: "I don't know my gotra.", a: 'Tradition allows Kashyap gotra when yours is not known. We mark it as “Kashyap (assigned)”.' },
      { q: 'Can I add my family?', a: 'Yes. Add family names on the next step. All are read in the same sankalp.' },
      { q: 'What happens when the countdown ends?', a: 'The sankalp list goes to Pandit ji and closes for this date. You can still book for the next ' + (b.day < 0 ? 'day' : WDL[b.day]) + '.' },
      { q: 'Is prasad included?', a: 'Prasad delivery is optional at ₹101, and free on seva of ₹301 or more. It reaches you in 7–10 days.' }
    ];
  }

  data() {
    if (this._d) return this._d;
    const B = [
      {
        id: 'khatu', short: 'Khatu Shyam', cat: 'shyam', title: 'Khatu Shyam Ji Guruvar Visesh Seva',
        purpose: "For Shyam Baba's grace, peace and prosperity at home",
        temple: 'Shri Shyam Mandir, Khatu, Sikar (Rajasthan)', templeShort: 'Khatu', plaque: 'Shri Shyam Mandir, Khatu', plaqueSub: 'Guruvar Visesh Seva',
        visesh: 'Guruvar Visesh', day: 4, ch: 17, cm: 0, closeTxt: '5:00 PM', pujaTime: '7:00 PM', bg: 'url(#bMaroon)',
        devotees: '1,24,318', rating: '4.8', reviewsN: '2.1k', filled: 1812, cap: 2100, lastHour: 37, showLive: true, showCap: false, glyph: 'श्याम', problems: ['money', 'family'],
        about: "Shri Shyam Mandir at Khatu, in Rajasthan's Sikar district, is the principal dhaam of Khatu Shyam Ji. Lakhs of devotees walk here for the Phalguna mela every year, carrying nishans that are tied at the temple.",
        deityTxt: 'Khatu Shyam Ji is Barbarik of the Mahabharata, grandson of Bhima. He offered his own head to Shri Krishna as dakshina, and Krishna blessed him to be worshipped in Kaliyuga under His own name, Shyam — Haare ka Sahara, the refuge of those who feel defeated.',
        why: [
          { t: 'Haare ka sahara', x: 'Devotees turn to Shyam Baba when a matter feels lost or stuck.' },
          { t: 'Peace at home', x: 'Gulab jal and ittar are offered the way one welcomes a beloved guest.' },
          { t: 'Guruvar visesh', x: "This week's seva is offered with Thursday's evening aarti at Khatu." }
        ],
        items: [
          { id: 'nishan', name: 'Nishan Seva', desc: "A saffron nishan tied at Shyam Baba's shikhara in your name", price: 201, icon: 'flag', badge: 'Most offered', week: '1,284 offered this week' },
          { id: 'gulabjal', name: 'Gulab Jal Arpan', desc: 'Rose water offered for peace and sweetness in the family', price: 171, icon: 'bottle', liquid: 'url(#lPink)' },
          { id: 'ittar', name: 'Ittar Arpan Seva', desc: "Baba's favourite fragrance, offered for overall well-being", price: 121, icon: 'bottle', liquid: 'url(#lGold)', badge: 'Most offered', week: '962 offered this week' },
          { id: 'mayur', name: 'Mayur Pankh Daan', desc: 'Peacock feathers offered for removing obstacles', price: 111, icon: 'feather' },
          { id: 'gulab', name: 'Gulab Arpan', desc: 'Fresh red roses offered at the garbhagriha', price: 101, icon: 'rose' },
          { id: 'makhan', name: 'Makhan Mishri Bhog', desc: 'The bhog Shyam Baba loves, shared with devotees as prasad', price: 151, icon: 'bowl', grain: '#FFF3D6' },
          { id: 'deep', name: 'Akhand Deep Daan', desc: 'A ghee diya lit in your name through the evening aarti', price: 51, icon: 'diya' }
        ]
      },
      {
        id: 'mahakal', short: 'Mahakaleshwar', cat: 'shiv', title: 'Somvar Mahakal Jal & Dugdh Abhishek Seva',
        purpose: "For good health, long life and Mahadev's protection",
        temple: 'Shri Mahakaleshwar Jyotirlinga, Ujjain (MP)', templeShort: 'Ujjain', plaque: 'Shri Mahakaleshwar, Ujjain', plaqueSub: 'Somvar Visesh Abhishek',
        visesh: 'Somvar Visesh', day: 1, ch: 17, cm: 0, closeTxt: '5:00 PM', pujaTime: '7:00 PM', bg: 'url(#bIndigo)',
        devotees: '1,63,210', rating: '4.9', reviewsN: '3.2k', filled: 1874, cap: 2100, lastHour: 52, showLive: true, showCap: false, glyph: 'शिव', problems: ['health', 'family'],
        about: 'Shri Mahakaleshwar in Ujjain is one of the twelve Jyotirlingas and the only one that faces south (Dakshinamukhi). Its pre-dawn Bhasma Aarti is known across Bharat.',
        deityTxt: 'Mahadev as Mahakal is the lord of time itself. Somvar abhishek with jal, milk and bel patra is the simplest and most beloved form of Shiv seva.',
        why: [
          { t: 'Health and long life', x: 'The Mahamrityunjay tradition is closely tied to Mahakal, the lord of time.' },
          { t: 'A calmer mind', x: 'Somvar abhishek with jal and milk is the simplest, most loved Shiv seva.' },
          { t: 'Jyotirlinga darshan', x: 'Mahakaleshwar is one of the twelve Jyotirlingas, and the only one facing south.' }
        ],
        items: [
          { id: 'dugdh', name: 'Dugdh Abhishek', desc: 'Milk abhishek on the Jyotirlinga in your name', price: 151, icon: 'kalash', badge: 'Most offered', week: '1,688 offered this week' },
          { id: 'gangajal', name: 'Ganga Jal Abhishek', desc: 'Ganga jal poured with your sankalp', price: 51, icon: 'kalash' },
          { id: 'bel', name: '108 Bel Patra Arpan', desc: 'One hundred and eight bel leaves, each with Om Namah Shivaya', price: 101, icon: 'leaf' },
          { id: 'dhatura', name: 'Dhatura & Aak Pushp', desc: "Mahadev's own flowers, offered on Somvar", price: 71, icon: 'garland', f1: 'url(#dWhite)', f2: 'url(#dBlue)' },
          { id: 'panchamrit', name: 'Panchamrit Abhishek', desc: 'Milk, curd, ghee, honey and sugar, offered together', price: 251, icon: 'kalash' },
          { id: 'jaap', name: 'Mahamrityunjay Jaap (108)', desc: 'The Mahamrityunjay mantra chanted 108 times for you', price: 501, icon: 'book' }
        ]
      },
      {
        id: 'hanuman', short: 'Sankat Mochan', cat: 'hanuman', title: 'Mangalvar Sankat Mochan Laddoo Churma Seva',
        purpose: 'For courage, protection and relief from sankat',
        temple: 'Shri Sankat Mochan Hanuman Mandir, Varanasi', templeShort: 'Sankat Mochan', plaque: 'Sankat Mochan, Kashi', plaqueSub: 'Mangalvar Visesh Seva',
        visesh: 'Mangalvar Visesh', day: 2, ch: 17, cm: 0, closeTxt: '5:00 PM', pujaTime: '7:00 PM', bg: 'url(#bSaffron)',
        devotees: '1,41,902', rating: '4.9', reviewsN: '2.8k', filled: 1960, cap: 2100, lastHour: 44, showLive: true, showCap: false, glyph: 'राम', problems: ['health', 'obstacles', 'career'],
        about: 'Sankat Mochan Hanuman Mandir in Varanasi is traditionally linked with Goswami Tulsidas, who is said to have had darshan of Hanuman ji here. Its Tuesday aarti draws thousands.',
        deityTxt: 'Hanuman ji is invoked as Sankat Mochan, the one who frees devotees from trouble. Offerings of sindoor and chola on Tuesday are among the oldest forms of his seva.',
        why: [
          { t: 'Sankat Mochan', x: 'Hanuman ji is invoked to free devotees from trouble and fear.' },
          { t: 'Courage and health', x: 'Sindoor chola and the Sundarkand are traditional offerings for strength.' },
          { t: 'Mangal dosh', x: 'As per tradition, Tuesday seva is kept to soften the effects of Mangal.' }
        ],
        items: [
          { id: 'churma', name: 'Laddoo Churma Arpan', desc: 'Laddoo and churma offered at Hanuman ji\'s feet', price: 251, icon: 'laddoo', badge: 'Most offered', week: '1,512 offered this week' },
          { id: 'boondi', name: 'Boondi Laddoo Bhog', desc: 'Boondi laddoo bhog, shared as prasad after aarti', price: 101, icon: 'laddoo' },
          { id: 'chameli', name: 'Chameli Tel Arpan', desc: 'Jasmine oil offered for the chola', price: 71, icon: 'bottle', liquid: 'url(#lGold)' },
          { id: 'tulsi', name: 'Tulsi Mala Arpan', desc: 'A fresh tulsi garland for Ram bhakt Hanuman', price: 51, icon: 'leaf' },
          { id: 'sundarkand', name: 'Sundarkand Path', desc: 'The full Sundarkand recited with your sankalp', price: 501, icon: 'book' },
          { id: 'lal', name: 'Lal Vastra Daan', desc: 'A red cloth offered at the murti', price: 121, icon: 'flag' }
        ]
      },
      {
        id: 'laxmi', short: 'Mahalakshmi', cat: 'laxmi', title: 'Shukravar Kumkum Laal Chunri Seva',
        purpose: 'For wealth, abundance and Maa Lakshmi\'s grace in the home',
        temple: 'Shri Mahalakshmi (Ambabai) Mandir, Kolhapur (Maharashtra)', templeShort: 'Kolhapur', plaque: 'Shri Mahalakshmi, Kolhapur', plaqueSub: 'Shukravar Visesh Seva',
        visesh: 'Shukravar Visesh', day: 5, ch: 17, cm: 0, closeTxt: '5:00 PM', pujaTime: '7:00 PM', bg: 'url(#bCrimson)',
        devotees: '98,420', rating: '4.9', reviewsN: '1.9k', filled: 1690, cap: 2100, lastHour: 41, showLive: true, showCap: false, glyph: 'लक्ष्मी', problems: ['money', 'family'],
        about: 'Shri Mahalakshmi Mandir in Kolhapur, lovingly called Ambabai, is one of the Shakti Peethas and among the most important seats of Maa Lakshmi in Bharat. Friday aarti here draws devotees from across Maharashtra and beyond.',
        deityTxt: 'Maa Lakshmi is the goddess of wealth, fortune and auspiciousness, the eternal consort of Bhagwan Vishnu. Friday belongs to her, and offerings of lotus, kumkum and kheer are made for prosperity and harmony at home.',
        why: [
          { t: 'Wealth and stability', x: 'Devotees keep Shukravar seva for steady income and relief from money worries.' },
          { t: 'Harmony at home', x: 'Maa Lakshmi is welcomed for peace, sweetness and abundance in the family.' },
          { t: 'Shukra shanti', x: 'As per tradition, Friday seva strengthens Shukra, the graha of comfort and fortune.' }
        ],
        items: [
          { id: 'chunri', name: 'Kumkum Laal Chunri Arpan', desc: 'Kumkum and laal chunri offered at Maa Lakshmi\'s feet', price: 151, icon: 'rose', badge: 'Most offered', week: '1,108 offered this week' },
          { id: 'kheer', name: 'Kheer Bhog', desc: 'Sweet rice kheer offered as bhog and shared as prasad', price: 101, icon: 'bowl', grain: '#FFF3D6' },
          { id: 'kumkum', name: 'Kumkum Archana', desc: 'Kumkum archana with the 108 names of Maa Lakshmi', price: 121, icon: 'diya' },
          { id: 'shringar', name: 'Shringar Daan', desc: 'Bangles, bindi and red chunri offered to Maa', price: 201, icon: 'garland' }
        ]
      },
      {
        id: 'ganesh', short: 'Chintamani Ganesh', cat: 'ganesh', title: 'Budhvar Chintamani Ganesh Visesh Seva',
        purpose: 'For clearing obstacles and a calmer mind',
        temple: 'Shri Chintamani Ganesh Mandir, Kashi (Varanasi)', templeShort: 'Kashi', plaque: 'Chintamani Ganesh, Kashi', plaqueSub: 'Budhvar Visesh Seva',
        visesh: 'Budhvar Visesh', day: 3, ch: 17, cm: 0, closeTxt: '5:00 PM', pujaTime: '7:00 PM', bg: 'url(#bCrimson)',
        devotees: '1,06,775', rating: '4.8', reviewsN: '1.9k', filled: 1690, cap: 2100, lastHour: 31, showLive: true, showCap: false, glyph: 'गं', problems: ['obstacles', 'career'],
        about: 'Chintamani Ganesh is one of the ancient Ganesh shrines of Kashi. The name itself means the jewel that dissolves worry (chinta).',
        deityTxt: 'Ganesha is Vighnaharta, invoked first in every puja. In the Jyotish tradition he is also considered the presiding deity of Ketu.',
        why: [
          { t: 'Vighnaharta', x: 'Ganesha is invoked first to clear the path before any new beginning.' },
          { t: 'Ketu shanti', x: 'In the Jyotish tradition, Ganesha is the presiding deity of Ketu.' },
          { t: 'Budhvar visesh', x: 'Wednesday belongs to Budh and Ganesha; durva and modak are his favourites.' }
        ],
        items: [
          { id: 'modak', name: '21 Modak Bhog', desc: "Twenty-one modaks, Ganesha's favourite, offered with the aarti", price: 151, icon: 'laddoo', badge: 'Most offered', week: '1,037 offered this week' },
          { id: 'durva', name: 'Durva Mala Arpan', desc: 'A garland of 21 durva blades, offered in pairs', price: 51, icon: 'leaf' },
          { id: 'sindoor', name: 'Sindoor Chola Arpan', desc: 'Sindoor with ghee offered on the murti', price: 201, icon: 'bowl', grain: '#D7261E' },
          { id: 'laddoo', name: 'Motichoor Laddoo Bhog', desc: 'Fresh laddoos offered and shared as prasad', price: 101, icon: 'laddoo' },
          { id: 'path', name: 'Ganesh Atharvashirsha Path', desc: 'The Atharvashirsha recited with your sankalp', price: 251, icon: 'book' },
          { id: 'gud', name: 'Gud Dhaniya Bhog', desc: 'Jaggery and coriander, the simplest Budhvar bhog', price: 51, icon: 'bowl', grain: '#B8741A' }
        ]
      },
      {
        id: 'shani', short: 'Shani Shingnapur', cat: 'shani', title: 'Shanivar Shani Dev Tel Abhishek Seva',
        purpose: 'For relief during Sade Sati and steadiness in career',
        temple: 'Shri Shanaishwar Devasthan, Shani Shingnapur (Maharashtra)', templeShort: 'Shani Shingnapur', plaque: 'Shani Dev, Shingnapur', plaqueSub: 'Shanivar Visesh Tel Abhishek',
        visesh: 'Shanivar Visesh', day: 6, ch: 17, cm: 0, closeTxt: '5:00 PM', pujaTime: '7:00 PM', bg: 'url(#bNight)',
        devotees: '98,420', rating: '4.7', reviewsN: '1.6k', filled: 1540, cap: 2100, lastHour: 24, showLive: true, showCap: false, glyph: 'शनि', problems: ['career', 'money', 'obstacles'],
        about: "At Shani Shingnapur the deity is a swayambhu black stone standing in the open, without a roof. The village is known for homes without doors, a sign of faith in Shani Dev's protection.",
        deityTxt: 'Shani Dev, son of Surya and Chhaya, is the graha of karma, discipline and time. Saturday tel abhishek is the classical offering, especially during Sade Sati and dhaiya.',
        why: [
          { t: 'Sade Sati and dhaiya', x: "Tel abhishek is the classical Shanivar remedy during Shani's difficult periods." },
          { t: 'Steadiness at work', x: 'Shani rewards patience; devotees offer seva for delays in career and property.' },
          { t: 'Karma and daan', x: 'Til, urad and oil given in daan are traditional ways to honour Shani Dev.' }
        ],
        items: [
          { id: 'tel', name: 'Sarson Tel Abhishek', desc: 'Mustard oil poured over the Shani shila in your name', price: 151, icon: 'bottle', liquid: 'url(#lOil)', badge: 'Most offered', week: '1,106 offered this week' },
          { id: 'til', name: 'Kala Til Daan', desc: "Black sesame offered to ease Shani's influence", price: 101, icon: 'bowl', grain: '#2E2A2A' },
          { id: 'urad', name: 'Sabut Urad Daan', desc: 'Whole black urad given in daan on Shanivar', price: 111, icon: 'bowl', grain: '#4A3F3A' },
          { id: 'neel', name: 'Neel Pushp Arpan', desc: 'Blue aparajita flowers offered to Shani Dev', price: 71, icon: 'garland', f1: 'url(#dBlue)', f2: 'url(#dBlue)' },
          { id: 'chalisa', name: 'Shani Chalisa Path', desc: 'Chalisa recited by the temple pandit with your sankalp', price: 251, icon: 'book' },
          { id: 'deep', name: 'Til Tel Deep Daan', desc: 'A sesame oil diya lit under the peepal', price: 51, icon: 'diya' }
        ]
      },
      {
        id: 'pitru', short: 'Vishnupad, Gaya', cat: 'pitru', title: 'Pitru Paksha Tarpan & Pind Daan at Gaya',
        purpose: 'For the peace of ancestors and harmony at home',
        temple: 'Vishnupad Mandir, Gaya (Bihar)', templeShort: 'Gaya', plaque: 'Vishnupad Mandir, Gaya', plaqueSub: 'Pitru Paksha · 26 Sep – 10 Oct',
        visesh: 'Pitru Paksha', day: -1, ch: 20, cm: 0, closeTxt: '8:00 PM', pujaTime: '9:00 AM', nextDay: true, bg: 'url(#bDusk)',
        devotees: '52,386', rating: '4.9', reviewsN: '940', filled: 0, cap: 1, lastHour: 0, showLive: false, showCap: false, glyph: 'पितृ', problems: ['ancestors', 'family'],
        about: 'Vishnupad Mandir in Gaya holds the footprint of Vishnu on basalt rock. The Garuda Purana names Gaya as the foremost place for pind daan, and families travel here to perform shraddha for their ancestors.',
        deityTxt: 'During Pitru Paksha, the sixteen lunar days from Bhadrapada Purnima to Sarva Pitru Amavasya, tarpan and pind daan are offered so that ancestors are at peace. Names close each evening at 8:00 PM; the tarpan is offered the next morning.',
        why: [
          { t: 'Peace for ancestors', x: 'Tarpan and pind daan are offered so that ancestors are at rest.' },
          { t: 'Pitru dosh', x: 'As per tradition, shraddha during Pitru Paksha eases pitru dosh in the family.' },
          { t: 'Gaya, the foremost tirtha', x: 'The Garuda Purana names Gaya as the foremost place for pind daan.' }
        ],
        items: [
          { id: 'tarpan', name: 'Til Jal Tarpan', desc: "Water with black til offered with your ancestors' names", price: 151, icon: 'kalash' },
          { id: 'pind', name: 'Pind Daan', desc: 'Pind of rice, til and barley offered at Vishnupad', price: 501, icon: 'bowl', grain: '#EADBB8' },
          { id: 'bhojan', name: 'Brahmin Bhojan', desc: "A sattvic meal offered in your ancestors' names", price: 251, icon: 'bowl', grain: '#F2C35A' },
          { id: 'gau', name: 'Gau Seva', desc: 'Green fodder for the cows of the Gaya gaushala', price: 101, icon: 'leaf' },
          { id: 'deep', name: 'Deep Daan at Phalgu', desc: 'A diya floated on the Phalgu river at dusk', price: 51, icon: 'diya' }
        ]
      }
    ];
    const A = [
      {
        id: 'haare', cat: 'temples', catLabel: 'Temples', title: 'Haare ka Sahara: why Khatu Shyam is the refuge of the defeated',
        sub: 'The story of Barbarik, the three arrows and the head offered as dakshina.',
        author: 'Pt. Govind Sharma, Khatu', date: '18 Sep 2026', read: 5, dur: 372, bg: 'url(#bMaroon)', glyph: 'श्याम', related: 'khatu',
        blocks: [
          { t: 'p', x: 'Ask any devotee at Khatu why they came, and you will often hear the same three words: haare ka sahara — the support of those who have lost. To understand why, you have to go back to the eve of the Kurukshetra war.' },
          { t: 'h', x: 'The warrior with three arrows' },
          { t: 'p', x: 'Barbarik was the son of Ghatotkacha and the grandson of Bhima. Through tapasya he received three arrows that could settle any war, and he made one vow: he would always fight for the side that was losing.' },
          { t: 'p', x: 'Shri Krishna saw what that vow meant. Whichever side Barbarik joined would start winning, so he would have to switch again and again, until only he remained. Disguised as a Brahmin, Krishna asked him for dakshina — and Barbarik offered his own head.' },
          { t: 'h', x: 'Why he is called Shyam' },
          { t: 'p', x: "Moved by the sacrifice, Krishna blessed Barbarik to be worshipped in Kaliyuga under Krishna's own name, Shyam. The head, tradition says, was later found at Khatu in Rajasthan, where the temple stands today." },
          { t: 'sh', dev: 'ॐ श्री श्याम देवाय नमः', tr: 'Om Shri Shyam Devaya Namah', mean: 'Salutations to Shri Shyam Dev.' },
          { t: 'h', x: 'How devotees offer seva' },
          { t: 'li', items: ['Nishan — a saffron flag carried to the temple and tied at the shikhara', 'Gulab and ittar — the fragrance of welcoming a beloved guest', 'Makhan-mishri — the bhog Shyam Baba is fondest of', 'Deep daan — a ghee diya lit through the evening aarti'] },
          { t: 'tip', x: "If you cannot travel to Khatu, a seva offered in your name, with your sankalp read by the temple's pandit, is received in the same spirit." }
        ]
      },
      {
        id: 'pitru', cat: 'festivals', catLabel: 'Festivals', title: 'Pitru Paksha 2026: dates, tarpan at home and why Gaya matters',
        sub: 'Sixteen days for our ancestors, and what to do if you do not know the tithi.',
        author: 'Acharya Vinod Mishra, Gaya', date: '20 Sep 2026', read: 6, dur: 415, bg: 'url(#bDusk)', glyph: 'पितृ', related: 'pitru',
        blocks: [
          { t: 'p', x: 'Pitru Paksha begins on Bhadrapada Purnima, Saturday 26 September 2026, and ends on Sarva Pitru Amavasya, Saturday 10 October 2026. For these sixteen lunar days, families remember their ancestors with tarpan, pind daan and daan.' },
          { t: 'h', x: "Which day is your ancestor's shraddha?" },
          { t: 'p', x: 'Shraddha is traditionally performed on the tithi on which the ancestor passed away. If you do not know the tithi, Sarva Pitru Amavasya is meant for all ancestors, including those whose date is not remembered.' },
          { t: 'h', x: 'A simple tarpan at home' },
          { t: 'li', items: ['Bathe early and sit facing south', 'Take water in a copper vessel with black til and a little kusha grass', 'Say the name and gotra of your ancestor, and let the water flow from your palm three times', 'Offer food to a cow, a crow and a dog before the family eats'] },
          { t: 'sh', dev: 'ॐ सर्वपितृदेवताभ्यो नमः', tr: 'Om Sarva Pitru Devatabhyo Namah', mean: 'Salutations to all our ancestors.' },
          { t: 'h', x: 'Why Gaya' },
          { t: 'p', x: 'The Vishnupad shrine in Gaya holds the footprint of Vishnu on basalt rock, and the Garuda Purana names Gaya as the foremost place for pind daan. Many families travel there once in a lifetime; others have it performed in their name by the pandits of Gaya.' },
          { t: 'tip', x: 'Pitru Paksha is kept with restraint: sattvic food, a pause on celebrations, and time given to the elders of the family.' }
        ]
      },
      {
        id: 'ketu', cat: 'astrology', catLabel: 'Astrology', title: 'Why Ganesha is invoked for Ketu',
        sub: 'The shadow planet, the remover of obstacles and a simple Budhvar practice.',
        author: 'Dr. Ananya Pathak, Jyotish Acharya', date: '16 Sep 2026', read: 4, dur: 268, bg: 'url(#bCrimson)', glyph: 'गं', related: 'ganesh',
        blocks: [
          { t: 'p', x: 'In Jyotish, Ketu is a chhaya graha — a shadow planet with no body of its own. It is linked with detachment, sudden turns and a restlessness that is hard to name.' },
          { t: 'h', x: 'Ganesha, the presiding deity of Ketu' },
          { t: 'p', x: 'Classical remedies assign each graha a devata. For Ketu, that devata is Ganesha: the one who removes obstacles, Vighnaharta, and steadies a clouded mind. This is why Ketu shanti usually begins with Ganapati upasana.' },
          { t: 'sh', dev: 'ॐ गं गणपतये नमः', tr: 'Om Gam Ganapataye Namah', mean: 'Salutations to Ganapati, whose seed sound is Gam.' },
          { t: 'h', x: 'Simple offerings on Budhvar' },
          { t: 'li', items: ['21 blades of durva grass, offered in pairs', 'Modak or laddoo bhog', 'Sindoor, offered with a little ghee', 'The mantra above, chanted 108 times'] },
          { t: 'p', x: 'Wednesday belongs to Budh and to Ganesha alike, which makes Budhvar the natural day for Ketu shanti.' },
          { t: 'tip', x: 'Remedies are an act of devotion, not a guarantee. For a full reading of Ketu in your chart, speak to an astrologer.' }
        ]
      },
      {
        id: 'shani', cat: 'remedies', catLabel: 'Remedies', title: 'Shanivar: why mustard oil and black til for Shani Dev',
        sub: 'Patience, daan and the oldest Saturday remedies.',
        author: 'Pt. Mahesh Kulkarni, Shingnapur', date: '14 Sep 2026', read: 3, dur: 205, bg: 'url(#bNight)', glyph: 'शनि', related: 'shani',
        blocks: [
          { t: 'p', x: 'Shani Dev is the graha of karma and time. He is slow, exacting and fair, which is why Saturday remedies are about patience and giving, not quick fixes.' },
          { t: 'h', x: 'Why mustard oil' },
          { t: 'p', x: "Tradition holds that oil soothes the heat of Shani's gaze. Pouring mustard oil over the Shani shila, or lighting a sesame-oil diya under a peepal tree on Saturday evening, are the most widely kept Shanivar remedies." },
          { t: 'sh', dev: 'ॐ शं शनैश्चराय नमः', tr: 'Om Sham Shanaishcharaya Namah', mean: 'Salutations to Shani, the slow-moving one.' },
          { t: 'li', items: ['Black til and whole urad, given in daan', 'A blue flower offered at the temple', "Help to someone who works with their hands — Shani's own people"] },
          { t: 'tip', x: 'Sade Sati lasts about seven and a half years; its remedies are kept steadily, week after week.' }
        ]
      },
      {
        id: 'mangal', cat: 'mantra', catLabel: 'Mantra & Aarti', title: 'Hanuman Chalisa on Mangalvar: when and how to recite',
        sub: 'Forty chaupais by Goswami Tulsidas, and a simple way to begin.',
        author: 'Pt. Ramesh Tripathi, Varanasi', date: '12 Sep 2026', read: 4, dur: 240, bg: 'url(#bSaffron)', glyph: 'राम', related: 'hanuman',
        blocks: [
          { t: 'p', x: 'The Hanuman Chalisa is forty chaupais composed by Goswami Tulsidas in Awadhi. Tuesday and Saturday are its traditional days, and many families recite it every evening.' },
          { t: 'h', x: 'A simple way to begin' },
          { t: 'li', items: ['Bathe and light a diya of chameli or til oil', 'Face east or north and remember Shri Ram first', 'Recite once, three, seven or eleven times, and keep the same count through your vrat', 'Offer boondi or gud-chana as bhog'] },
          { t: 'sh', dev: 'ॐ हं हनुमते नमः', tr: 'Om Ham Hanumate Namah', mean: 'Salutations to Hanuman.' },
          { t: 'tip', x: 'Sankat Mochan temple in Varanasi is traditionally linked with Tulsidas himself.' }
        ]
      },
      {
        id: 'somvar', cat: 'vrat', catLabel: 'Vrat Katha', title: 'Somvar vrat: jal, doodh and bel patra for Mahadev',
        sub: 'The simplest vrat to keep, and what to offer.',
        author: 'Acharya Sanjay Joshi, Ujjain', date: '10 Sep 2026', read: 4, dur: 232, bg: 'url(#bIndigo)', glyph: 'शिव', related: 'mahakal',
        blocks: [
          { t: 'p', x: 'Somvar belongs to Chandra and to Shiva, who wears the moon in his hair. A Monday vrat is among the simplest to keep: a single sattvic meal, and abhishek in the morning or evening.' },
          { t: 'h', x: 'What to offer' },
          { t: 'li', items: ['Jal — Ganga jal if you have it, clean water if you do not', 'Milk, poured gently in a thin stream', 'Bel patra with three leaves intact, smooth side facing the linga', "Dhatura or aak flowers, which are Mahadev's own"] },
          { t: 'sh', dev: 'ॐ नमः शिवाय', tr: 'Om Namah Shivaya', mean: 'Salutations to Shiva.' },
          { t: 'p', x: 'Sixteen Mondays, solah somvar, is the traditional count for a vrat kept with a sankalp.' }
        ]
      },
      {
        id: 'panchang', cat: 'astrology', catLabel: 'Astrology', title: "How to read today's panchang in two minutes",
        sub: 'Five limbs, one page: tithi, vaar, nakshatra, yoga and karana.',
        author: 'Jai Bhakti Gyan team', date: '8 Sep 2026', read: 3, dur: 190, bg: 'url(#bMaroon)', glyph: 'तिथि', related: null,
        blocks: [
          { t: 'p', x: 'A panchang has five limbs — that is what pancha-anga means. Once you know them, the daily page stops looking like a wall of words.' },
          { t: 'li', items: ['Tithi — the lunar day, 1 to 15 in each paksha', 'Vaar — the weekday and its graha', 'Nakshatra — the star the moon is passing through', 'Yoga — a combination of sun and moon positions', 'Karana — half of a tithi'] },
          { t: 'h', x: 'Rahu kaal and muhurat' },
          { t: 'p', x: 'Rahu kaal is a daily window of about ninety minutes considered unsuited to new beginnings. Brahma muhurat, before sunrise, is considered best for prayer and study.' },
          { t: 'tip', x: "Timings change with your city. Jai Bhakti's panchang uses your location when you allow it." }
        ]
      }
    ];
    const T = {
      en: { namaste: 'Namaste', navBhent: 'Seva', navDhaam: 'Jai Bhakti', navGyan: 'Gyan', qBhent: 'Seva', qPanchang: 'Panchang', qRashi: 'Rashifal', qAarti: 'Aarti', closing: 'Closing soon', closingSub: 'Add your name before the list closes', nextClose: 'Next sankalp list closes in', worry: 'Kis baat ki chinta hai?', worrySub: "Choose what's on your mind", trust: 'Why devotees trust Jai Bhakti', how: 'How Jai Bhakti works', exp: 'Devotee experiences', gyanToday: 'Gyan for today', seeAll: 'See all', addName: 'Add my name before it closes', bh1: 'Sacred ', bh2: 'Seva', bh3: ' at Top Temples of Bharat', bhSub: 'Daan, bhog and arpan offered in your name. Watch it on video within 48 hours.', search: 'Search temples, deities, offerings', gyanTitle: 'Gyan', gyanSub: 'Short reads and listens for daily bhakti', panchang: 'Aaj ka Panchang', rashifal: 'Aaj ka Rashifal', latest: 'Latest reads', listen: 'Listen: aarti & chalisa' },
      hi: { namaste: 'नमस्ते', navBhent: 'सेवा', navDhaam: 'जय भक्ति', navGyan: 'ज्ञान', qBhent: 'सेवा', qPanchang: 'पंचांग', qRashi: 'राशिफल', qAarti: 'आरती', closing: 'जल्द बंद हो रहे हैं', closingSub: 'सूची बंद होने से पहले अपना नाम जोड़ें', nextClose: 'अगली संकल्प सूची बंद होगी', worry: 'किस बात की चिंता है?', worrySub: 'जो मन में है, वह चुनें', trust: 'भक्त जय भक्ति पर भरोसा क्यों करते हैं', how: 'जय भक्ति कैसे काम करता है', exp: 'भक्तों के अनुभव', gyanToday: 'आज का ज्ञान', seeAll: 'सभी देखें', addName: 'सूची बंद होने से पहले नाम जोड़ें', bh1: 'असली मंदिरों में ', bh2: 'पवित्र सेवा', bh3: '', bhSub: 'आपके नाम से दान, भोग और अर्पण। 48 घंटे में वीडियो देखें।', search: 'मंदिर, देवता, सेवा खोजें', gyanTitle: 'ज्ञान', gyanSub: 'रोज़ की भक्ति के लिए छोटे लेख और ऑडियो', panchang: 'आज का पंचांग', rashifal: 'आज का राशिफल', latest: 'नए लेख', listen: 'सुनें: आरती और चालीसा' }
    };
    const OB = {
      en: { skip: 'Skip', next: 'Next', start: 'Get started', slides: [
        { k: '1 of 3', t: 'Seva at a real temple, in your name.', x: 'Verified pandits offer your seva and read your sankalp at temples across Bharat. You receive the full video.' },
        { k: '2 of 3', t: 'Watch it happen.', x: 'Every seva is filmed. Your name, your gotra and your offering, on WhatsApp within 48 hours.' },
        { k: '3 of 3', t: 'Never miss a sacred day.', x: 'Live countdowns for every Guruvar, Shanivar and festival, so your sankalp reaches Pandit ji in time.' }
      ] },
      hi: { skip: 'छोड़ें', next: 'आगे', start: 'शुरू करें', slides: [
        { k: '3 में से 1', t: 'असली मंदिर में, आपके नाम से सेवा।', x: 'सत्यापित पंडित भारत भर के मंदिरों में आपकी सेवा अर्पित करते हैं और संकल्प पढ़ते हैं। पूरा वीडियो आपको मिलता है।' },
        { k: '3 में से 2', t: 'अपनी आँखों से देखें।', x: 'हर सेवा का वीडियो बनता है। आपका नाम, गोत्र और अर्पण — 48 घंटे में WhatsApp पर।' },
        { k: '3 में से 3', t: 'कोई पावन दिन न छूटे।', x: 'हर गुरुवार, शनिवार और पर्व का काउंटडाउन, ताकि आपका संकल्प समय पर पंडित जी तक पहुँचे।' }
      ] }
    };
    const LANGS = [
      { id: 'hi', n: 'हिंदी', e: 'Hindi' }, { id: 'en', n: 'English', e: 'English' }, { id: 'bn', n: 'বাংলা', e: 'Bengali' },
      { id: 'mr', n: 'मराठी', e: 'Marathi' }, { id: 'te', n: 'తెలుగు', e: 'Telugu' }, { id: 'ta', n: 'தமிழ்', e: 'Tamil' },
      { id: 'kn', n: 'ಕನ್ನಡ', e: 'Kannada' }, { id: 'gu', n: 'ગુજરાતી', e: 'Gujarati' }, { id: 'pa', n: 'ਪੰਜਾਬੀ', e: 'Punjabi' }
    ];
    const DEITIES = [
      { id: 'all', l: 'All' }, { id: 'shyam', l: 'Khatu Shyam' }, { id: 'shiv', l: 'Mahadev' }, { id: 'hanuman', l: 'Hanuman' },
      { id: 'ganesh', l: 'Ganesh' }, { id: 'shani', l: 'Shani Dev' }, { id: 'pitru', l: 'Pitru Paksha' }
    ];
    const PROBLEMS = { obstacles: 'Obstacles', money: 'Money & debt', career: 'Career & exams', health: 'Health', family: 'Marriage & family', ancestors: 'Ancestors & peace' };
    const GCATS = [
      { id: 'all', l: 'All' }, { id: 'festivals', l: 'Festivals' }, { id: 'temples', l: 'Temples' }, { id: 'mantra', l: 'Mantra & Aarti' },
      { id: 'vrat', l: 'Vrat Katha' }, { id: 'astrology', l: 'Astrology' }, { id: 'remedies', l: 'Remedies' }
    ];
    const R = [
      { n: 'Mesh', dev: 'मेष', x: 'Energy runs high. Put it into one important task before noon and let small arguments pass in the evening.', rem: 'Offer sindoor to Hanuman ji.', bh: 'hanuman' },
      { n: 'Vrishabh', dev: 'वृष', x: 'A pending payment moves forward. Keep family plans simple and spend on comfort, not show.', rem: 'Offer white flowers to Mahadev.', bh: 'mahakal' },
      { n: 'Mithun', dev: 'मिथुन', x: 'A good day for the conversation you have been putting off. Write things down.', rem: 'Offer durva to Ganesh ji.', bh: 'ganesh' },
      { n: 'Kark', dev: 'कर्क', x: "Rest early. An elder's advice helps with a decision at home.", rem: 'Offer jal to the Shivling.', bh: 'mahakal' },
      { n: 'Simha', dev: 'सिंह', x: 'Recognition at work. Share the credit and it grows.', rem: 'Offer water to Surya at sunrise.', bh: 'khatu' },
      { n: 'Kanya', dev: 'कन्या', x: 'Details matter today. Budh favours careful writing and quiet planning.', rem: 'Offer durva and modak to Ganesh ji.', bh: 'ganesh' },
      { n: 'Tula', dev: 'तुला', x: 'Balance spending with saving. Avoid lending money today.', rem: 'Offer rose ittar to Shyam Baba.', bh: 'khatu' },
      { n: 'Vrishchik', dev: 'वृश्चिक', x: 'A quiet win. Keep your plans to yourself until Friday.', rem: 'Recite the Hanuman Chalisa once.', bh: 'hanuman' },
      { n: 'Dhanu', dev: 'धनु', x: 'Travel or study plans get a green light. Start the paperwork.', rem: 'Offer yellow flowers on Thursday.', bh: 'khatu' },
      { n: 'Makar', dev: 'मकर', x: 'Shani rewards steady effort. Finish what you started this week.', rem: 'Offer mustard oil to Shani Dev.', bh: 'shani' },
      { n: 'Kumbh', dev: 'कुंभ', x: 'Friends bring an opportunity. Say yes to one, not all.', rem: 'Give black til in daan on Saturday.', bh: 'shani' },
      { n: 'Meen', dev: 'मीन', x: 'A calm mind today. Good for prayer, planning and family time.', rem: 'Light a diya for your ancestors.', bh: 'pitru' }
    ];
    const TRACKS = [
      { id: 'jagdish', t: 'Om Jai Jagdish Hare', sub: 'Aarti · 5:40' },
      { id: 'chalisa', t: 'Hanuman Chalisa', sub: 'Chalisa · 9:12' },
      { id: 'shiv', t: 'Shiv Tandav Stotram', sub: 'Stotra · 7:05' },
      { id: 'ganesh', t: 'Jai Ganesh Deva', sub: 'Aarti · 4:18' }
    ];
    const TST = [
      { n: 'Sunita Verma', c: 'Indore', st: 5, bh: 'Chintamani Ganesh', x: 'Every Wednesday I watch my Ganesh seva on WhatsApp. It feels like I was standing there.' },
      { n: 'Priya Nair', c: 'New Jersey', st: 5, bh: 'Vishnupad, Gaya', x: 'I booked tarpan at Gaya for Papa from the US. Seeing his name read at Vishnupad meant everything to my mother.' },
      { n: 'Rohit Sharma', c: 'Gurugram', st: 5, bh: 'Khatu Shyam', x: "I could hear Pandit ji read my wife's name and gotra. That was all the proof I needed." },
      { n: 'Meena Agarwal', c: 'Jaipur', st: 4, bh: 'Khatu Shyam', x: 'The countdown saved me. Our names went in twenty minutes before the Thursday list closed.' }
    ];
    const PAY = [
      { id: 'phonepe', l: 'PhonePe', s: 'UPI', c: '#5F259F', i: 'Pe', upi: true },
      { id: 'gpay', l: 'Google Pay', s: 'UPI', c: '#1A73E8', i: 'G', upi: true },
      { id: 'paytm', l: 'Paytm', s: 'UPI', c: '#0B8BD1', i: 'P', upi: true },
      { id: 'bhim', l: 'BHIM', s: 'UPI', c: '#E0661B', i: 'B', upi: true },
      { id: 'upiid', l: 'Any UPI ID', s: 'name@bank', c: '#3A1604', i: '@', upi: true },
      { id: 'card', l: 'Credit or debit card', s: 'Indian and international cards', c: '#8A2406', i: 'C', upi: false },
      { id: 'nb', l: 'Net banking', s: 'All major banks', c: '#1F7A3A', i: 'NB', upi: false },
      { id: 'intl', l: 'Pay in USD, GBP or AED', s: 'For devotees outside India · charged in INR', c: '#12304F', i: '$', upi: false }
    ];
    const SEVA = {
      id: 'ketuSeva', short: 'Chintamani Ganesh', cat: 'ganesh', problems: ['obstacles', 'career'],
      title: 'Budhvar Ketu Shanti Chintamani Ganesh Saptahik Laddoo Seva',
      plaque: 'Chintamani Ganesh, Kashi', plaqueSub: 'Saptahik Laddoo Seva · every Wednesday',
      purpose: 'For Ketu shanti, a steady mind and obstacles cleared, week after week',
      recommended: '2 months (8 Wednesdays) recommended',
      temple: 'Shri Chintamani Ganesh Mandir, Kashi (Varanasi)', templeShort: 'Kashi', visesh: 'Budhvar Visesh',
      day: 3, ch: 17, cm: 0, closeTxt: '5:00 PM', pujaTime: '7:00 PM', bg: 'url(#bCrimson)',
      devotees: '3,412', rating: '4.8', reviewsN: '860', first: 51, weekly: 101, extra: 51,
      durations: [
        { n: 4, label: 'Minimum · 4 Wednesdays', tag: '', short: 'Minimum', text: 'A short sankalp, for one wish or one difficult month.' },
        { n: 8, label: '8 Wednesdays', tag: 'Recommended · 62% choose', short: 'Recommended', text: 'Two months, the count most devotees keep for Ketu shanti.' },
        { n: 16, label: '16 Wednesdays', tag: 'Full vrat', short: 'Full vrat', text: 'Four months, for a deeper sankalp or a long Ketu period.' }
      ],
      reviews: [
        { n: 'Sunita Verma', c: 'Indore', dt: '16 Sep 2026', st: 5, x: 'My son had failed his entrance twice. We kept the laddoo seva in his name and this time he cleared it with a good rank. Ganpati Bappa ne sun li.' },
        { n: 'Rajesh Gupta', c: 'Lucknow', dt: '12 Sep 2026', st: 5, x: 'Business was stuck for months with one obstacle after another. Since I started the seva, two pending payments came through and the worry in my mind has eased.' },
        { n: 'Kavita Joshi', c: 'Pune', dt: '9 Sep 2026', st: 5, x: 'I used to wake up anxious every night. Watching the puja video every week has brought a calm I had not felt in a long time.' },
        { n: 'Amit Tiwari', c: 'Patna', dt: '5 Sep 2026', st: 5, x: 'My pandit ji said Ketu was troubling my career. After a few sevas I got the transfer I had been waiting two years for.' },
        { n: 'Meena Iyer', c: 'Bengaluru', dt: '2 Sep 2026', st: 4, x: 'We live far from Kashi, but hearing my husband\'s name in the sankalp felt like we were standing there. His health has been steadier since.' },
        { n: 'Pooja Agarwal', c: 'Jaipur', dt: '29 Aug 2026', st: 5, x: 'My daughter\'s rishta kept breaking at the last moment. We offered laddoo bhog to Chintamani Ganesh and the engagement happened smoothly this month.' },
        { n: 'Vikas Mehra', c: 'Delhi', dt: '26 Aug 2026', st: 5, x: 'Court case pending for three years finally settled in our favour. I keep the seva every Wednesday now as thanks.' },
        { n: 'Neha Saxena', c: 'Bhopal', dt: '22 Aug 2026', st: 5, x: 'Confusion about my job switch had me stuck. After the seva I felt clear-headed and made the decision with peace. It turned out to be the right one.' }
      ],
      faqs: [
        { q: 'What is offered in the Laddoo Seva?', a: 'Pure desi ghee besan laddoos are offered as bhog to Shri Chintamani Ganesh in Kashi, followed by sankalp and aarti by the temple pandit.' },
        { q: 'Will my name and gotra be read?', a: 'Yes. Pandit ji reads your name and gotra in the sankalp before the bhog is offered. The moment is captured in your puja video.' },
        { q: 'When will I receive my puja video?', a: 'Your personal puja video reaches you on WhatsApp within 48 hours of the puja. You also get live updates on WhatsApp on puja day.' },
        { q: 'Will I receive prasad at home?', a: 'Yes. Blessed prasad is packed at the temple and dispatched to your address. It usually reaches you in 7–10 days within India, with tracking on WhatsApp.' },
        { q: 'How much do I pay?', a: '₹51 for your first seva, then ₹101 per seva. You pay securely by UPI and receive a receipt on WhatsApp.' },
        { q: 'What if the puja does not happen?', a: 'Under the Jai Bhakti promise, if your puja is not performed or the video does not reach you, your dakshina is refunded in full to the same UPI account.' }
      ]
    };
    this._d = { B, A, T, OB, LANGS, DEITIES, PROBLEMS, GCATS, R, TRACKS, TST, PAY, SEVA };
    return this._d;
  }
  renderVals() {
    const s = this.state;
    const now = s.now;
    const d = this.data();
    const hi = s.lang === 'hi';
    const t = hi ? d.T.hi : d.T.en;
    const inr = (n) => this.inr(n);

    const SERIF = "'Poppins', 'Noto Sans Devanagari', sans-serif";
    const GL = 'background: linear-gradient(160deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.58) 100%); backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%); border: 1px solid rgba(255,255,255,0.75); box-shadow: 0 10px 26px rgba(255,138,61,0.14);';
    const GOLD = 'background: linear-gradient(100deg, #FFD24A 0%, #FF8A3D 100%); border: 0; box-shadow: 0 12px 26px rgba(255,107,26,0.32); color: #41240A;';
    const GOLDS = 'background: linear-gradient(100deg, #FFD24A 0%, #FF8A3D 100%); border: 0; box-shadow: 0 6px 14px rgba(255,107,26,0.24); color: #41240A;';
    const DIM = 'background: linear-gradient(100deg, rgba(255,210,74,0.4) 0%, rgba(255,138,61,0.34) 100%); border: 0; color: rgba(65,36,10,0.5); box-shadow: none;';
    const BTN = 'width: 100%; height: 56px; border-radius: 999px; font: inherit; font-size: 16px; font-weight: 600; letter-spacing: 0.005em; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;';
    const chip = (on) => 'flex-shrink: 0; height: 38px; padding: 0 16px; border-radius: 999px; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; ' + (on ? GOLDS : 'background: rgba(255,255,255,0.62); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 4px 14px rgba(255,138,61,0.1); color: rgba(58,43,26,0.72);');
    const pillS = (u) => 'position: absolute; top: 18px; right: 18px; z-index: 2; height: 28px; padding: 0 11px; border-radius: 999px; display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; font-variant-numeric: tabular-nums; ' + (u ? 'background: rgba(200,30,15,0.88); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); color: #FFFFFF; box-shadow: 0 8px 18px rgba(200,30,15,0.3);' : GOLDS);
    const rowS = (u) => 'display: flex; align-items: center; gap: 6px; height: 30px; padding: 0 11px; border-radius: 999px; font-size: 12.5px; font-weight: 600; font-variant-numeric: tabular-nums; ' + (u ? 'background: rgba(220,38,38,0.08); color: #B91C1C;' : 'background: rgba(255,154,79,0.14); color: #B5470C;');
    const coin = (sz, fs) => 'width: ' + sz + 'px; height: ' + sz + 'px; border-radius: 999px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: ' + SERIF + '; font-size: ' + (fs + 4) + 'px; font-weight: 400; color: #5B330F; background: linear-gradient(150deg, #FFE7A0 0%, #FF9A4F 100%); box-shadow: 0 6px 14px rgba(255,107,26,0.2);';
    const avS = (bg, first) => 'width: 30px; height: 30px; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: #FFFFFF; border: 2px solid #FFFDF9; background: ' + bg + '; box-shadow: 0 3px 8px rgba(90,30,0,0.18); ' + (first ? '' : 'margin-left: -9px;');

    const go = (screen, extra) => this.setState((st) => Object.assign({ hist: st.hist.concat([{ screen: st.screen, bhentId: st.bhentId, articleId: st.articleId }]), screen: screen, sheet: null }, extra || {}));
    const tabTo = (tb, extra) => this.setState(Object.assign({ tab: tb, screen: tb, hist: [], sheet: null }, extra || {}));
    const say = (m) => this.setState({ toast: { m: m, t: Date.now() } });
    const back = () => this.setState((st) => {
      const h = st.hist.slice();
      const p = h.pop();
      if (!p) return { screen: st.tab, playing: false };
      return { hist: h, screen: p.screen, bhentId: p.bhentId, articleId: p.articleId, playing: false };
    });

    const is = {};
    ['sevaOrder', 'splash', 'login', 'otp', 'home', 'bhent', 'detail', 'cart', 'pay', 'success', 'seva', 'sevaSetup', 'sevaSuccess', 'sevaManage', 'gyan', 'panchang', 'rashifal', 'aarti', 'article', 'profile', 'bookings'].forEach((k) => { is[k] = s.screen === k; });
    const showNav = is.home || is.bhent || is.gyan || is.panchang || is.rashifal || is.aarti;

    const WDL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bv = (b) => {
      const close = this.nextClose(b, now);
      const c = this.cd(close - now);
      const ci = new Date(close + 19800000);
      const min = Math.min.apply(null, b.items.map((i) => i.price));
      const pct = b.cap > 1 ? Math.round(b.filled / b.cap * 100) : 0;
      return Object.assign({}, b, {
        c: c, closeMs: close,
        closeLabel: this.fmtD(ci) + ', ' + b.closeTxt + ' IST',
        dateLine: this.fmtDL(ci) + ' · ' + b.visesh,
        dayName: b.day >= 0 ? WDL[b.day] : 'evening',
        fromTxt: 'From ₹51',
        rot: b.items[Math.floor(now / 2400) % b.items.length].name,
        minis: b.items.slice(0, 4).map((i, k) => Object.assign(this.icon(i), { style: 'position: relative; z-index: ' + (10 - k) + '; width: 34px; height: 34px; border-radius: 999px; padding: 5px; box-sizing: border-box; background: radial-gradient(circle at 35% 30%, #FFFFFF 0%, #FFE2C2 100%); border: 2px solid #FFFDF9; box-shadow: 0 3px 8px rgba(160,70,0,0.16); margin-left: ' + (k ? '-10px' : '0') + ';' })),
        filledTxt: b.filled.toLocaleString('en-IN'), capTxt: b.cap.toLocaleString('en-IN'), leftTxt: (b.cap - b.filled).toLocaleString('en-IN'),
        capBar: 'height: 100%; width: ' + pct + '%; border-radius: 999px; background: linear-gradient(90deg, #FFE08A, #FFC233); box-shadow: 0 0 10px rgba(255,210,80,0.48);',
        capBarLight: 'height: 100%; width: ' + pct + '%; border-radius: 999px; background: linear-gradient(90deg, #FFD24A, #FF8A3D); box-shadow: 0 0 8px rgba(232,89,12,0.3);',
        pill: pillS(c.urgent), timerRow: rowS(c.urgent),
        stickyTimer: 'font-family: ' + SERIF + '; font-size: 25px; line-height: 28px; font-weight: 400; font-variant-numeric: tabular-nums; color: ' + (c.urgent ? '#B91C1C' : '#B5470C') + ';',
        open: () => go('seva', { sevaId: b.id, sFaq: 0 })
      });
    };
    const TMETA = {
      khatu: { name: 'Shri Shyam Mandir', loc: 'Khatu, Rajasthan' },
      mahakal: { name: 'Mahakaleshwar', loc: 'Ujjain, Madhya Pradesh' },
      hanuman: { name: 'Sankat Mochan', loc: 'Varanasi, Uttar Pradesh' },
      ganesh: { name: 'Chintamani Ganesh', loc: 'Kashi, Uttar Pradesh' },
      shani: { name: 'Shani Shingnapur', loc: 'Shingnapur, Maharashtra' },
      pitru: { name: 'Vishnupad Mandir', loc: 'Gaya, Bihar' }
    };
    const all = d.B.map(bv);
    const byId = {};
    all.forEach((x) => { byId[x.id] = x; });
    const sorted = all.slice().sort((a, c) => a.closeMs - c.closeMs);
    const nearest = sorted[0];

    // weekly seva (subscription with UPI Autopay)
    const SV = this.sevaFor(s.sevaId);
    const svClose = this.nextClose(SV, now);
    const svc = this.cd(svClose - now);
    const sx = s.sFam && s.sName2.trim() ? 1 : 0;
    const sch = this.sevaSched(svClose, s.sWeeks, sx);
    const sv = Object.assign({}, SV, {
      c: svc, pill: pillS(svc.urgent), timerRow: rowS(svc.urgent),
      closeLabel: this.fmtD(new Date(svClose + 19800000)) + ', ' + SV.closeTxt + ' IST',
      dateLine: 'First puja ' + this.fmtDL(new Date(svClose + 19800000)) + ' · ' + SV.visesh,
      sch: sch,
      durations: SV.durations.map((u) => {
        const on = s.sWeeks === u.n;
        const p = this.sevaSched(svClose, u.n, sx);
        return {
          n: String(u.n), label: u.label, tag: u.tag, hasTag: !!u.tag, short: u.short, text: u.text, sel: on,
          totalTxt: p.totalTxt, totalLine: p.firstTxt + ' today · ' + p.thenLine + ' · total ' + p.totalTxt + ' · ends ' + p.endShort,
          tagStyle: 'height: 22px; padding: 0 9px; border-radius: 999px; display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; ' + (u.n === 8 ? 'color: #41240A; background: linear-gradient(100deg, #FFD24A 0%, #FF8A3D 100%);' : 'color: #9A3A0A; background: rgba(255,214,102,0.3);'),
          style: 'display: flex; gap: 12px; align-items: flex-start; width: 100%; padding: 14px; border-radius: 20px; cursor: pointer; font: inherit; color: #3A2B1A; text-align: left; ' + (on ? 'background: linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,224,150,0.5) 100%); border: 1.5px solid #FFB25C; box-shadow: 0 12px 24px -14px rgba(226,120,0,0.48);' : GL),
          radio: 'width: 22px; height: 22px; margin-top: 1px; border-radius: 999px; box-sizing: border-box; flex-shrink: 0; ' + (on ? 'border: 7px solid #FF8A3D; background: #FFFFFF;' : 'border: 1.5px solid rgba(58,43,26,0.25);'),
          chip: 'display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 6px; border-radius: 16px; cursor: pointer; font: inherit; color: #3A2B1A; ' + (on ? 'background: linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,224,150,0.5) 100%); border: 1.5px solid #FFB25C;' : GL),
          pick: () => this.setState({ sWeeks: u.n })
        };
      }),
      whyList: SV.why.map((w, k) => ({ n: String(k + 1), t: w.t, x: w.x })),
      reviews: SV.reviews.map((r) => Object.assign({}, r, { on: '★★★★★'.slice(0, r.st), off: '★★★★★'.slice(r.st), ini: r.n.split(' ').map((w) => w[0]).join('') })),
      faqs: SV.faqs.map((f, idx) => ({ q: f.q, a: f.a, open: s.sFaq === idx, chev: 'flex-shrink: 0; transform: rotate(' + (s.sFaq === idx ? '180' : '0') + 'deg);', toggle: () => this.setState({ sFaq: s.sFaq === idx ? -1 : idx }) }))
    });
    const sqn = s.q.trim().toLowerCase();
    const sevaShow = (s.deity === 'all' || s.deity === SV.cat) && (!s.problem || SV.problems.indexOf(s.problem) > -1) && (!sqn || (SV.title + ' ' + SV.temple + ' laddoo seva weekly autopay').toLowerCase().indexOf(sqn) > -1);
    const apApps = d.PAY.filter((p) => ['phonepe', 'gpay', 'paytm', 'bhim'].indexOf(p.id) > -1);
    const apPick = apApps.filter((p) => p.id === s.apApp)[0] || apApps[0];
    const apReady = !!s.name.trim();
    const finishSeva = () => {
      this.pt = setTimeout(() => {
        const sa = this.makeSeva(this.state);
        this.setState({ sevaActive: sa, mandate: null, pin: '', screen: 'sevaSuccess', hist: [], tab: 'bhent' });
      }, 1800);
    };
    const pressKey = (k) => {
      if (this.state.mandate !== 'approve') return;
      const cur = this.state.pin;
      if (k === 'del') { this.setState({ pin: cur.slice(0, -1) }); return; }
      if (k === '' || cur.length >= 6) return;
      const next = cur + k;
      if (next.length === 6) { this.setState({ pin: next, mandate: 'busy' }); finishSeva(); }
      else this.setState({ pin: next });
    };
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((k) => ({
      t: k === 'del' ? '⌫' : k, label: k === 'del' ? 'Delete' : (k === '' ? 'Blank' : 'Digit ' + k), press: () => pressKey(k),
      style: 'height: 50px; border-radius: 12px; border: 0; font: inherit; font-size: 22px; font-weight: 500; cursor: pointer; color: #1A1A1A; ' + (k === '' ? 'background: transparent; pointer-events: none;' : 'background: #F3EFE8;')
    }));
    const pinDots = [0, 1, 2, 3, 4, 5].map((i) => ({ style: 'width: 14px; height: 14px; border-radius: 999px; box-sizing: border-box; ' + (i < s.pin.length ? 'background: #1A1A1A;' : 'border: 2px solid #9A9A9A;') }));

    // active seva (manage)
    const SA = s.sevaActive;
    const ssch = SA ? this.sevaSched(SA.startClose, SA.weeks, SA.x) : sch;
    let done = 0;
    if (SA) { for (let k = 0; k < SA.weeks; k++) { if (ssch.pujaMs(k) < now) done++; } }
    const nextK = Math.min(done, ssch.n - 1);
    let nextDebitK = -1;
    if (SA) { for (let k = 1; k < SA.weeks; k++) { if (ssch.debitMs(k) > now) { nextDebitK = k; break; } } }
    const saStatus = SA ? SA.status : 'none';
    const paidCount = SA ? 1 + (function () { let c = 0; for (let k = 1; k < SA.weeks; k++) { if (ssch.debitMs(k) <= now) c++; } return c; })() : 0;
    const paidAmt = SA ? ssch.first + (paidCount - 1) * ssch.weekly : 0;
    const ss = {
      title: SA && SA.title ? SA.title : sv.title,
      id: SA ? SA.id : '', names: SA ? SA.names : '', gotra: SA ? SA.gotra : '', app: SA ? SA.app : apPick.l, appI: SA ? SA.appI : apPick.i, appColor: SA ? SA.appC : apPick.c,
      sch: ssch, firstVideo: this.fmtD(new Date(ssch.pujaMs(0) + 19800000 + 2 * 86400000)),
      statusLabel: saStatus === 'paused' ? 'Paused' : (saStatus === 'stopped' ? 'Stopped' : 'Active · week ' + (nextK + 1) + ' of ' + ssch.n),
      chip: 'align-self: flex-start; height: 22px; padding: 0 8px; border-radius: 6px; display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; ' + (saStatus === 'active' ? 'color: #3A1604; background: linear-gradient(100deg, #FFD24A 0%, #FF8A3D 100%);' : (saStatus === 'paused' ? 'color: #FFFFFF; background: #7A5530;' : 'color: #FFFFFF; background: #991B1B;')),
      ring: (Math.max(0.12, (done + (saStatus === 'stopped' ? 0 : 1)) / ssch.n) * 219.9).toFixed(1) + ' 219.9',
      weekLine: done + ' of ' + ssch.n + ' Wednesdays completed · ' + ssch.range,
      nextPuja: saStatus === 'stopped' ? '—' : this.fmtD(new Date(ssch.pujaMs(nextK) + 19800000)) + ', 7 PM',
      nextDebit: saStatus === 'active' && nextDebitK > 0 ? ssch.weeklyTxt + ' · ' + this.fmtD(new Date(ssch.debitMs(nextDebitK) + 19800000)) : (saStatus === 'paused' ? 'Paused' : '—'),
      videos: done + ' delivered',
      paidLine: 'Paid so far ' + this.inr(paidAmt) + ' · ' + (saStatus === 'stopped' ? 'nothing more will be charged' : 'remaining ' + this.inr(ssch.total - paidAmt)) + ' · total ' + ssch.totalTxt,
      rows: ssch.rows.map((w) => {
        const paid = w.k === 0 || (SA && ssch.debitMs(w.k) <= now);
        const status = paid ? 'Paid ✓' : (saStatus === 'stopped' ? 'Cancelled' : (saStatus === 'paused' ? 'Paused' : 'Scheduled'));
        return { wk: w.wk, date: w.date, amt: w.amt, status: status, st: 'width: 76px; text-align: right; font-size: 11px; font-weight: 600; ' + (paid ? 'color: #15803D;' : (saStatus === 'stopped' ? 'color: #9A7A5A; text-decoration: line-through;' : (saStatus === 'paused' ? 'color: #7A5530;' : 'color: #C2410C;'))) };
      }),
      mandateTitle: saStatus === 'stopped' ? 'UPI Autopay cancelled' : (saStatus === 'paused' ? 'UPI Autopay paused' : 'UPI Autopay active via ' + (SA ? SA.app : apPick.l)),
      mandateLine: saStatus === 'stopped' ? 'It disappears from your UPI app within 24 hours.' : 'Up to ' + ssch.weeklyTxt + ' a week · ' + ssch.debits + ' debits · expires ' + ssch.expTxt,
      canAct: saStatus === 'active' || saStatus === 'paused', isStopped: saStatus === 'stopped',
      pauseLabel: saStatus === 'paused' ? 'Resume seva' : 'Pause seva for a week',
      stopText: 'You have completed ' + done + ' of ' + ssch.n + ' Wednesdays. No further dakshina will be charged and the Autopay mandate is cancelled. Your videos stay in your account.'
    };

    // home hero carousel
    const heroSet = sorted.slice(0, 3);
    const slot = Math.floor(now / 4500);
    const heroIdx = (slot + s.heroOff) % heroSet.length;
    const hero = heroSet[heroIdx];
    const heroDots = heroSet.map((x, i) => ({
      label: 'Show ' + x.short,
      style: 'height: 8px; border: 0; padding: 0; cursor: pointer; border-radius: 999px; ' + (i === heroIdx ? 'width: 24px; background: linear-gradient(90deg, #FFD24A, #FF8A3D);' : 'width: 7px; background: rgba(58,43,26,0.16);'),
      pick: () => this.setState({ heroOff: (i - (Math.floor(Date.now() / 4500) % heroSet.length) + heroSet.length * 3) % heroSet.length })
    }));

    // seva list
    const qn = s.q.trim().toLowerCase();
    const LIVE = ['laxmi', 'hanuman'];
    const LPRICE = { khatu: 21, mahakal: 29, ganesh: 35, shani: 71, pitru: 49 };
    const notif = s.notify || {};
    const lockCard = (x) => {
      const live = LIVE.indexOf(x.id) > -1;
      const on = !!notif[x.id];
      return Object.assign({}, x, {
        live: live, locked: !live, notified: on, priceTxt: live ? '₹51' : '₹' + (LPRICE[x.id] || 21),
        open: live ? x.open : () => {}, cardCursor: live ? 'pointer' : 'default',
        blur: live ? '' : 'filter: blur(5px); user-select: none;',
        pill: x.pill + (live ? '' : ' filter: blur(5px);'),
        notify: () => { this.setState({ notify: Object.assign({}, notif, { [x.id]: !on }) }); if (!on) say('We will notify you when ' + x.short + ' seva opens'); },
        notifyLabel: on ? '✓ Notified' : 'Notify me',
        notifyStyle: 'height: 44px; padding: 0 18px; border-radius: 999px; flex-shrink: 0; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; ' + (on ? 'color: #FFFFFF; border: 0; background: linear-gradient(160deg, #22C55E 0%, #15803D 100%); box-shadow: 0 8px 16px -8px rgba(21,128,61,0.6);' : 'color: #3A1604; border: 0; background: linear-gradient(100deg, #FFE7A3 0%, #FFD24A 100%);')
      });
    };
    const list = sorted.map(lockCard).sort((a, b) => (b.live ? 1 : 0) - (a.live ? 1 : 0)).filter((x) => (s.deity === 'all' || x.cat === s.deity) && (!s.problem || x.problems.indexOf(s.problem) > -1) && (!qn || (x.title + ' ' + x.temple + ' ' + x.short + ' ' + x.items.map((i) => i.name).join(' ')).toLowerCase().indexOf(qn) > -1));
    const deities = d.DEITIES.map((x) => ({ l: x.l, style: chip(s.deity === x.id), pick: () => this.setState({ deity: x.id }) }));
    const homeDeities = d.DEITIES.map((x) => ({ l: x.l, style: chip(s.hDeity === x.id), pick: () => this.setState({ hDeity: x.id }) }));

    // cart
    const cb = byId[s.cartB] || all[0];
    const qty = (id) => s.cart[id] || 0;
    const lines = cb.items.filter((i) => qty(i.id) > 0).map((i) => Object.assign(this.icon(i), { name: i.name, q: qty(i.id), unitTxt: inr(i.price) + ' each', amtTxt: inr(i.price * qty(i.id)), add: () => this.addItem(cb.id, i.id, 1), sub: () => this.addItem(cb.id, i.id, -1) }));
    const count = lines.reduce((a, l) => a + l.q, 0);
    const sub = cb.items.reduce((a, i) => a + i.price * qty(i.id), 0);
    const free = sub >= 301;
    const fee = free ? 0 : (s.prasad ? 101 : 0);
    const total = sub + fee;
    const upsell = cb.items.filter((i) => qty(i.id) === 0).sort((a, c) => (c.badge ? 1 : 0) - (a.badge ? 1 : 0)).slice(0, 3).map((i) => ({ name: i.name, priceTxt: inr(i.price), add: () => this.addItem(cb.id, i.id, 1) }));
    const countTxt = count + (count === 1 ? ' offering' : ' offerings');
    const prasadOn = free || s.prasad;

    // detail
    const cur = byId[s.bhentId] || all[0];
    const here = s.cartB === cur.id;
    const dsub = here ? sub : 0;
    const dcount = here ? count : 0;
    const b = Object.assign({}, cur, {
      items: cur.items.map((i) => {
        const q = here ? qty(i.id) : 0;
        return Object.assign(this.icon(i), { name: i.name, desc: i.desc, badge: i.badge || '', week: i.week || '', hasBadge: !!i.badge, priceTxt: inr(i.price), q: q, has: q > 0, none: q === 0, add: () => this.addItem(cur.id, i.id, 1), sub: () => this.addItem(cur.id, i.id, -1) });
      }),
      reviews: this.reviews(cur).map((r) => Object.assign({}, r, { on: '★★★★★'.slice(0, r.st), off: '★★★★★'.slice(r.st), ini: r.n.split(' ').map((w) => w[0]).join('') })),
      faqs: this.faqs(cur).map((f, idx) => ({ q: f.q, a: f.a, open: s.faq === idx, chev: 'flex-shrink: 0; transform: rotate(' + (s.faq === idx ? '180' : '0') + 'deg);', toggle: () => this.setState({ faq: s.faq === idx ? -1 : idx }) })),
      whyList: cur.why.map((w, i) => ({ t: w.t, x: w.x, n: String(i + 1) }))
    });
    const freeMsg = dsub === 0 ? 'Offer seva worth ₹301 or more and prasad comes home free' : (dsub < 301 ? 'Add ' + inr(301 - dsub) + ' more to get prasad home free' : 'Free prasad delivery unlocked for this seva');
    const freeBar = 'height: 100%; width: ' + Math.min(100, Math.round(dsub / 301 * 100)) + '%; border-radius: 999px; background: ' + (dsub >= 301 ? 'linear-gradient(90deg, #34D399, #1F8A4C)' : 'linear-gradient(90deg, #FFD24A, #FF8A3D)') + ';';

    // onboarding
    const OBL = hi ? d.OB.hi : d.OB.en;
    const slide = OBL.slides[s.ob] || OBL.slides[0];
    const obFrac = Math.max(0.04, Math.min(1, (nearest.closeMs - now) / (7 * 86400000)));
    const obDots = [0, 1, 2].map((i) => ({ label: 'Slide ' + (i + 1), style: 'height: 8px; border: 0; padding: 0; cursor: pointer; border-radius: 999px; ' + (i === s.ob ? 'width: 28px; background: linear-gradient(90deg, #FFD24A, #FF8A3D);' : 'width: 8px; background: rgba(160,90,20,0.3);'), pick: () => this.setState({ ob: i }) }));

    // otp
    const rsec = Math.max(0, 30 - Math.floor((now - s.otpAt) / 1000));
    const otpBoxes = [0, 1, 2, 3, 4, 5].map((i) => {
      const dg = s.otp[i] || '';
      const act = i === s.otp.length;
      return { d: dg, style: 'height: 60px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-family: ' + SERIF + '; font-size: 28px; font-weight: 400; color: #3A2B1A; box-sizing: border-box; background: #FFFFFF; ' + (dg ? 'border: 1px solid rgba(255,138,61,0.55); box-shadow: 0 8px 18px rgba(255,138,61,0.14);' : (act ? 'border: 1.5px solid #FF9A4F; box-shadow: 0 0 0 4px rgba(255,154,79,0.16);' : 'border: 1px solid rgba(58,43,26,0.14);')) };
    });
    const phoneFmt = s.phone.length > 5 ? s.phone.slice(0, 5) + ' ' + s.phone.slice(5) : s.phone;
    const chanS = (on) => 'height: 56px; padding: 0 14px; border-radius: 16px; display: flex; align-items: center; gap: 10px; cursor: pointer; font: inherit; color: #3A2B1A; text-align: left; ' + (on ? 'background: linear-gradient(155deg, rgba(255,255,255,0.96) 0%, rgba(255,224,150,0.5) 100%); border: 1.5px solid #FFB25C; box-shadow: 0 10px 22px rgba(255,138,61,0.16);' : 'background: #FFFFFF; border: 1px solid rgba(58,43,26,0.12);');

    // gyan
    const gqn = s.gq.trim().toLowerCase();
    const av = (a) => Object.assign({}, a, { readTxt: a.read + ' min read · ' + Math.round(a.dur / 60) + ' min listen', ini: a.author.split(' ').filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join(''), open: () => go('article', { articleId: a.id, playing: false, playBase: 0 }) });
    const gAll = d.A.map(av);
    const gList = gAll.filter((a) => (s.gcat === 'all' || a.cat === s.gcat) && (!gqn || (a.title + ' ' + a.sub).toLowerCase().indexOf(gqn) > -1));
    const feat = gList[0] || gAll[0];
    const gcats = d.GCATS.map((c) => ({ l: c.l, style: chip(s.gcat === c.id), pick: () => this.setState({ gcat: c.id }) }));
    const rsd = d.R[s.rashi] || d.R[5];
    const rs = { dev: rsd.dev, n: rsd.n, x: rsd.x, rem: rsd.rem, bh: byId[rsd.bh].short, bhentCta: 'Explore ' + byId[rsd.bh].short + ' Seva', open: () => go('detail', { bhentId: rsd.bh, faq: 0 }) };
    const tracks = d.TRACKS.map((tr) => ({ t: tr.t, sub: tr.sub, on: s.track === tr.id, off: s.track !== tr.id, style: 'width: 44px; height: 44px; border-radius: 999px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; ' + GOLD, toggle: () => this.setState({ track: s.track === tr.id ? null : tr.id }) }));
    const aartiRows = d.TRACKS.map((tr) => ({ t: tr.t, sub: tr.sub, pick: () => say(tr.t + ' selected · audio playback will be available soon') }));

    // article + audio
    const A0 = d.A.filter((a) => a.id === s.articleId)[0] || d.A[0];
    const pos = Math.min(A0.dur, s.playBase + (s.playing ? (now - s.playAt) / 1000 : 0));
    const mmss = (x) => Math.floor(x / 60) + ':' + this.pad(Math.floor(x % 60));
    const rel = A0.related ? byId[A0.related] : null;
    const art = Object.assign(av(A0), {
      blocks: A0.blocks.map((bl) => ({ x: bl.x || '', dev: bl.dev || '', tr: bl.tr || '', mean: bl.mean || '', isP: bl.t === 'p', isH: bl.t === 'h', isSh: bl.t === 'sh', isLi: bl.t === 'li', isTip: bl.t === 'tip', items: (bl.items || []).map((v) => ({ x: v })) })),
      hasRel: !!rel, rel: rel || all[0]
    });

    // success / bookings
    const bk = s.lastBooking || { id: '—', title: cb.title, templeShort: cb.templeShort, linesTxt: '', names: s.name, gotra: s.gotra, when: '', video: '', prasadTxt: '', totalTxt: inr(0) };
    const nameCount = s.bookings.reduce((a, x) => a + (x.nameCount || 1), 0);

    // profile menu
    const menu = [
      { l: 'My bookings', s: s.bookings.length ? s.bookings.length + ' upcoming' : 'None yet', d: 'M6 3h12v18l-3-2-3 2-3-2-3 2z M9 8h6 M9 12h6', pick: () => go('bookings') },
      { l: 'My weekly seva', s: s.sevaActive ? (s.sevaActive.status === 'stopped' ? 'Stopped' : (s.sevaActive.status === 'paused' ? 'Paused' : 'Active · Autopay on')) : 'Start with ₹51', d: 'M17 2l4 4-4 4 M3 11V9a3 3 0 0 1 3-3h15 M7 22l-4-4 4-4 M21 13v2a3 3 0 0 1-3 3H3', pick: () => go('sevaManage') },
      { l: 'My family', s: 'Names you add to every sankalp', d: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3 3-5 6-5s6 2 6 5 M16 6a2.5 2.5 0 0 1 0 5 M17 15c2.5.3 4 1.8 4 4.5', pick: () => say('Family names arrive in the next build') },
      { l: 'Birth details & kundli', s: 'For seva chosen for your chart', d: 'M12 3v18 M3 12h18 M5.6 5.6l12.8 12.8 M18.4 5.6L5.6 18.4', pick: () => say('Kundli-based suggestions arrive in the next build') },
      { l: 'Saved addresses', s: 'For prasad delivery', d: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', pick: () => say('Addresses arrive in the next build') },
      { l: 'App language', s: hi ? 'हिंदी · tap for English' : 'English · tap for हिंदी', d: 'M4 5h9 M8.5 3v2 M6 5c0 4 3 7 6 8 M11 5c-1 4-4 7-7 8 M13 21l4-9 4 9 M14.5 18h5', pick: () => this.setState({ lang: hi ? 'en' : 'hi' }) },
      { l: 'Countdown alerts', s: '3 hours before every list closes', d: 'M6 17v-6a6 6 0 0 1 12 0v6l1.5 2H4.5L6 17z M10 21h4', pick: () => say('Alerts on: 3 hours and 30 minutes before each list closes') },
      { l: 'Help & support', s: 'WhatsApp or call, 10:30 AM – 9 PM', d: 'M4 20l1.5-4A8 8 0 1 1 8 18.5L4 20z', pick: () => say('Opening WhatsApp chat with the Jai Bhakti team') },
      { l: 'Jai Bhakti promise & refunds', s: '100% refund if not offered', d: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z M9 12l2 2 4-4', pick: () => say('If your seva is not offered, you get a 100% refund') },
      { l: 'Refer a friend', s: 'Gift ₹51 dakshina, get ₹51', d: 'M20 12v8H4v-8 M2 7h20v5H2z M12 22V7 M12 7c-2-4-6-3-4 0 M12 7c2-4 6-3 4 0', pick: () => say('Invite link copied') }
    ];

    // payment
    const payRow = (p) => ({
      l: p.l, s: p.s, i: p.i, sel: s.pay === p.id, pick: () => this.setState({ pay: p.id }),
      row: 'width: 100%; min-height: 62px; padding: 8px 10px; border-radius: 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; font: inherit; color: #3A2B1A; ' + (s.pay === p.id ? 'background: linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,224,150,0.5) 100%); border: 1.5px solid #FFB25C;' : 'background: transparent; border: 1.5px solid transparent;'),
      badge: 'width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 600; font-size: 14px; background: ' + p.c + '; box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 12px -6px ' + p.c + ';',
      radio: 'width: 22px; height: 22px; border-radius: 999px; box-sizing: border-box; flex-shrink: 0; ' + (s.pay === p.id ? 'border: 7px solid #FF8A3D; background: #FFFFFF;' : 'border: 1.5px solid rgba(58,43,26,0.25);')
    });
    const payPick = d.PAY.filter((p) => p.id === s.pay)[0] || d.PAY[0];

    const toastOn = !!s.toast && (Date.now() - s.toast.t < 2800);
    const toastBottom = showNav ? 100 : ((is.detail || is.cart || is.pay || is.seva || is.sevaSetup) ? 100 : 28);
    const firstName = (s.name || 'Devotee').trim().split(' ')[0] || 'Devotee';
    const initials = (s.name || 'Devotee').trim().split(/\s+/).slice(0, 2).map((w) => (w[0] || '').toUpperCase()).join('') || 'D';

    const DONE = (() => {
        const IST = 19800000, D = 86400000;
        const W = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const M = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const nm = s.name.trim() || 'Rohit Sharma';
        const rates = s.rates || {};
        const pick = [['hanuman', 0], ['mahakal', 0], ['khatu', 1], ['hanuman', 1]];
        return pick.map((p, idx) => {
          const b = d.B.filter((x) => x.id === p[0])[0] || d.B[idx % d.B.length];
          const today = new Date(now + IST);
          let back = (today.getUTCDay() - (b.day >= 0 ? b.day : today.getUTCDay()) + 7) % 7 || 7;
          const dt = new Date(now + IST - (back + 7 * p[1]) * D);
          const key = b.id + '-' + idx;
          const r = rates[key] || 0;
          return {
            bid: String(19003571 + idx * 37), temple: b.temple, visesh: b.visesh, plaque: b.plaque, dateShort: dt.getUTCDate() + ' ' + M[dt.getUTCMonth()] + ', ' + dt.getUTCFullYear(), dateNum: this.pad(dt.getUTCDate()) + '/' + this.pad(dt.getUTCMonth() + 1) + '/' + dt.getUTCFullYear(),
            open: () => go('sevaOrder', { orderIdx: idx }), share: () => say('Opening WhatsApp to share'),
            title: b.title, bg: b.bg, glyph: b.glyph || '', name: nm, item: (b.items[p[1] % b.items.length] || b.items[0]).name,
            date: dt.getUTCDate() + ' ' + M[dt.getUTCMonth()] + ' ' + dt.getUTCFullYear() + ', ' + W[dt.getUTCDay()],
            watch: () => say('Opening your seva video on WhatsApp'),
            rateLabel: r ? 'Thank you for rating · ' + r + ' of 5' : 'Please give your rating',
            stars: [1, 2, 3, 4, 5].map((n) => ({ label: n + ' star' + (n > 1 ? 's' : ''), style: 'width: 40px; height: 40px; padding: 0; border: 0; background: none; cursor: pointer; font-size: 28px; line-height: 40px; color: ' + (n <= r ? '#F59E0B' : '#E2CFB2') + ';', pick: () => this.setState({ rates: Object.assign({}, rates, { [key]: n }) }) }))
          };
        });
    })();
    return {
      is: is, showNav: showNav, t: t, fx: this.props.still ? '' : 'animation: dhFade 0.45s ease both;', glow: this.props.still ? '' : 'animation: dhGlow 6s ease-in-out infinite;', spin: this.props.still ? '' : 'animation: dhSpin 90s linear infinite;', soft: this.props.still ? '' : 'animation: dhSoft 6s ease-in-out infinite;', rise: this.props.still ? '' : 'animation: dhRise 0.7s ease 0.15s both;', serif: 'font-family: ' + SERIF + ';',
      glassCard: GL, goldText: 'background: linear-gradient(180deg, #FFF3C4 0%, #FFD24D 55%, #F2A007 100%); -webkit-background-clip: text; background-clip: text; color: transparent;',
      saffronText: 'background: linear-gradient(90deg, #FF8A00 0%, #D9480F 100%); -webkit-background-clip: text; background-clip: text; color: transparent;',
      glassPill: 'height: 36px; padding: 0 14px; border-radius: 999px; cursor: pointer; font: inherit; font-size: 13px; font-weight: 500; color: rgba(58,43,26,0.75); ' + 'background: rgba(255,255,255,0.62); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 4px 14px rgba(255,138,61,0.1);',
      backBtn: 'width: 44px; height: 44px; border-radius: 999px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; color: #40260E; ' + 'background: rgba(255,255,255,0.62); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 4px 14px rgba(255,138,61,0.1);',
      linkBtn: 'border: 0; background: none; padding: 6px 0; cursor: pointer; font: inherit; font-size: 13px; line-height: 18px; font-weight: 500; color: #C4571A;',
      inputStyle: 'height: 54px; padding: 0 16px; border-radius: 16px; background: #FFFFFF; border: 1px solid rgba(58,43,26,0.14); font: inherit; font-size: 16px; font-weight: 400; color: #3A2B1A; outline: none;',
      avatarBtn: 'width: 40px; height: 40px; border-radius: 999px; padding: 0; cursor: pointer; font: inherit; font-size: 13px; font-weight: 600; color: #5B330F; border: 1px solid rgba(255,255,255,0.8); background: linear-gradient(150deg, #FFE0A0 0%, #FF9A4F 100%); box-shadow: 0 6px 16px rgba(255,107,26,0.2);',
      langBtn: 'height: 34px; padding: 0 12px; border-radius: 999px; display: flex; align-items: center; gap: 5px; cursor: pointer; font: inherit; font-size: 12.5px; font-weight: 500; color: rgba(58,43,26,0.7); ' + 'background: rgba(255,255,255,0.62); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 4px 14px rgba(255,138,61,0.1);',
      langChip: hi ? 'हिं' : 'En',
      toggleLang: () => this.setState({ lang: hi ? 'en' : 'hi', toast: { m: hi ? 'Language: English' : 'भाषा: हिंदी', t: Date.now() } }),
      qaStyle: 'display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 4px 12px 4px; border-radius: 22px; cursor: pointer; font: inherit; color: #3A2B1A; ' + GL,
      qaCoin: 'width: 48px; height: 48px; border-radius: 999px; display: flex; align-items: center; justify-content: center; background: linear-gradient(150deg, rgba(255,214,102,0.55) 0%, rgba(255,138,61,0.28) 100%);',
      worryTile: 'display: flex; flex-direction: column; align-items: flex-start; gap: 12px; padding: 14px 12px; min-height: 108px; box-sizing: border-box; border-radius: 22px; cursor: pointer; font: inherit; font-size: 13px; line-height: 17px; font-weight: 500; color: #3A2B1A; text-align: left; ' + GL,
      worryCoin: 'width: 40px; height: 40px; border-radius: 999px; display: flex; align-items: center; justify-content: center; background: linear-gradient(150deg, rgba(255,214,102,0.55) 0%, rgba(255,138,61,0.28) 100%);',
      stepCoin: coin(30, 14), iniCoin: coin(38, 11), incCoin: 'width: 40px; height: 40px; border-radius: 999px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(150deg, rgba(255,214,102,0.55) 0%, rgba(255,138,61,0.28) 100%);',
      cdBox: 'display: flex; flex-direction: column; align-items: center; min-width: 58px; padding: 7px 8px 6px 8px; border-radius: 16px; background: rgba(255,255,255,0.94); box-shadow: 0 8px 20px rgba(90,20,0,0.16); color: #9A2A06;',
      cdNum: 'font-family: ' + SERIF + '; font-size: 28px; line-height: 30px; font-weight: 400; font-variant-numeric: tabular-nums;',
      cdUnit: 'font-size: 10px; line-height: 12px; font-weight: 500; letter-spacing: 0.05em; color: #B5601C;',
      goldMini: 'height: 30px; padding: 0 14px; border-radius: 999px; display: flex; align-items: center; font-size: 12px; font-weight: 600; ' + GOLDS,
      goldBtnSm: 'height: 44px; padding: 0 20px; border-radius: 999px; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; ' + GOLDS,
      goldBtnLg: 'height: 54px; padding: 0 24px; border-radius: 999px; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; flex-shrink: 0; ' + GOLD,
      goldBtnFull: BTN + ' ' + GOLD,
      av1: avS('linear-gradient(135deg, #F59E0B, #C2410C)', true), av2: avS('linear-gradient(135deg, #E4572E, #8A2406)', false), av3: avS('linear-gradient(135deg, #2A5A8C, #12304F)', false), av4: avS('linear-gradient(135deg, #1F8A4C, #145C33)', false), av5: avS('linear-gradient(135deg, #7A3B72, #3A1638)', false),
      pCell: 'display: flex; flex-direction: column; gap: 3px; padding: 11px 13px; border-radius: 16px; background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.16);',
      pLbl: 'font-size: 11px; line-height: 14px; font-weight: 500; letter-spacing: 0.04em; color: #F5D6B0;',
      pVal: 'font-family: ' + SERIF + '; font-size: 17px; line-height: 21px; font-weight: 400; color: #FFF6E0;',

      splashNext: () => this.setState({ screen: 'login' }),
      hasName: !!s.name.trim(), noName: !s.name.trim(), greetName: s.name.trim() ? ', ' + firstName : '',
      sv: sv, ss: ss, sevaShow: false, hasSeva: !!SA, noSeva: !SA,
      openSeva: () => go('seva', { sevaId: 'ketuSeva', sFaq: 0 }),
      startSeva: () => go('sevaSetup'),
      addSankalp: !!s.addSankalp, toggleSankalp: () => this.setState({ addSankalp: !s.addSankalp }), payTxt: s.addSankalp ? '₹71' : '₹51',
      hUp: s.hSeg !== 'mine', hMine: s.hSeg === 'mine',
      segUp: () => this.setState({ hSeg: 'up' }), segMine: () => this.setState({ hSeg: 'mine' }),
      segUpStyle: 'height: 46px; border-radius: 14px; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; ' + (s.hSeg !== 'mine' ? 'border: 0; color: #FFFFFF; background: linear-gradient(135deg, #FF8A3D 0%, #D24A0E 100%); box-shadow: 0 8px 16px -8px rgba(200,70,0,0.55);' : 'border: 0; color: #7A5530; background: transparent;'),
      segMineStyle: 'height: 46px; border-radius: 14px; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; ' + (s.hSeg === 'mine' ? 'border: 0; color: #FFFFFF; background: linear-gradient(135deg, #FF8A3D 0%, #D24A0E 100%); box-shadow: 0 8px 16px -8px rgba(200,70,0,0.55);' : 'border: 0; color: #7A5530; background: transparent;'),
      doneSevas: DONE,
      order: DONE[s.orderIdx || 0] || DONE[0],
      goManage: () => go('sevaManage'),
      bookSeva: () => { const el = document.getElementById('jb-home-list'); if (!el) return; let p = el.parentElement; while (p && p.scrollHeight <= p.clientHeight) p = p.parentElement; if (p) p.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' }); },
      trustMarquee: (() => { const items = ['Trusted by lakhs of devotees', 'Vedic rituals by authorised pandits', 'Seva video within 48 hours', 'Offer seva from anywhere', '100% secure payments', 'Top temples of Bharat']; const row = (k) => items.map((x, j) => React.createElement('span', { key: k + j, style: { display: 'inline-flex', alignItems: 'center', gap: 14, paddingRight: 14, fontSize: 13, fontWeight: 600, color: '#2A0802', whiteSpace: 'nowrap' } }, x, React.createElement('span', { style: { width: 4, height: 4, borderRadius: 999, background: '#2A0802', opacity: 0.6 } }))); return React.createElement('div', { style: { display: 'flex', width: 'max-content', animation: this.props.still ? 'none' : 'jbMarquee 26s linear infinite' } }, row('a'), row('b')); })(),
      goHomeReset: () => this.setState({ screen: 'home', tab: 'home', hist: [] }),
      goMySeva: () => this.setState({ screen: 'home', tab: 'home', hist: [], hSeg: 'mine' }),
      setKashyap: () => this.setState({ gotra: 'Kashyap', toast: { m: 'Gotra set to Kashyap', t: Date.now() } }),
      firstPujaLong: (() => { try { const x = new Date(sv.sch.pujaMs(0) + 19800000); const dd = x.getUTCDate(); const sfx = (dd % 10 === 1 && dd !== 11) ? 'st' : (dd % 10 === 2 && dd !== 12) ? 'nd' : (dd % 10 === 3 && dd !== 13) ? 'rd' : 'th'; return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][x.getUTCDay()] + ', ' + dd + sfx + ' ' + ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][x.getUTCMonth()]; } catch (e) { return 'Wednesday'; } })(),
      homeReviews: [
        { n: 'Sunita Verma', c: 'Indore', dt: '16 Sep 2026', st: 5, x: 'My son had failed his entrance twice. We kept the laddoo seva in his name and this time he cleared it with a good rank.', item: 'Chintamani Ganesh Laddoo Seva' },
        { n: 'Priya Nair', c: 'New Jersey', dt: '21 Sep 2026', st: 5, x: 'I could not travel to Gaya for Papa. Seeing his name read at Vishnupad brought my mother a peace we had been searching for.', item: 'Pitru Tarpan, Gaya' },
        { n: 'Rajesh Gupta', c: 'Lucknow', dt: '12 Sep 2026', st: 5, x: 'Business was stuck for months. After offering the nishan to Shyam Baba, two pending payments came through within weeks.', item: 'Khatu Shyam Nishan' },
        { n: 'Anjali Singh', c: 'Varanasi', dt: '10 Sep 2026', st: 5, x: 'My father\'s surgery went smoothly and his recovery has been faster than the doctors expected. Jai Mahakal.', item: 'Mahakaleshwar Abhishek' },
        { n: 'Amit Tiwari', c: 'Patna', dt: '5 Sep 2026', st: 5, x: 'I got the transfer I had waited two years for. Every Tuesday I watch the Sankat Mochan seva video with my family.', item: 'Sankat Mochan Seva' },
        { n: 'Pooja Agarwal', c: 'Jaipur', dt: '29 Aug 2026', st: 5, x: 'My daughter\'s rishta kept breaking at the last moment. This month the engagement happened without a single hurdle.', item: 'Chintamani Ganesh Laddoo Seva' },
        { n: 'Vikas Mehra', c: 'Delhi', dt: '26 Aug 2026', st: 4, x: 'A court case pending for three years finally settled in our favour. The video with our names read aloud is something we keep.', item: 'Khatu Shyam Nishan' },
        { n: 'Meena Iyer', c: 'Bengaluru', dt: '22 Aug 2026', st: 5, x: 'We live far from every dhaam, yet hearing our gotra in the sankalp made us feel we were standing there. My mind is calmer now.', item: 'Mahakaleshwar Abhishek' }
      ].map((r) => Object.assign({}, r, { on: '★★★★★'.slice(0, r.st), off: '★★★★★'.slice(r.st), ini: r.n.split(' ').map((w) => w[0]).join('') })),
      homeFaqs: [
        { q: 'What is a seva?', a: 'A seva is an offering, such as a nishan, ittar, laddoo bhog or chadar, made in your name at the temple by an authorised pandit.' },
        { q: 'Will my name really be read?', a: 'Yes. Pandit ji reads every name and gotra in the sankalp before your offering is made. The moment is captured in your video.' },
        { q: 'When will I receive my seva video?', a: 'Your personal seva video reaches you on WhatsApp within 48 hours of the seva.' },
        { q: 'Do I get prasad at home?', a: 'For offerings that include prasad, it is dispatched from the temple and reaches you in 7–10 days within India, with tracking on WhatsApp.' },
        { q: 'How do I pay?', a: 'Pay securely with any UPI app: PhonePe, Google Pay, Paytm or BHIM. Your receipt arrives on WhatsApp.' },
        { q: 'What if my seva does not happen?', a: 'Under the Jai Bhakti promise, if your offering is not made or your video does not reach you, we refund 100%. No questions asked.' }
      ].map((f, idx) => { const hf = s.hFaq === undefined ? 0 : s.hFaq; return { q: f.q, a: f.a, open: hf === idx, chev: 'flex-shrink: 0; transform: rotate(' + (hf === idx ? '180' : '0') + 'deg);', toggle: () => this.setState({ hFaq: hf === idx ? -1 : idx }) }; }),
      sFamOn: s.sFam, sName2: s.sName2, onSName2: (e) => this.setState({ sName2: e.target.value }),
      toggleSFam: () => this.setState({ sFam: !s.sFam }), sFamLabel: s.sFam ? 'Remove family member' : '+ Add a family member (₹51 a week)',
      apApps: apApps.map(payRow).map((p, i) => Object.assign(p, { sel: s.apApp === apApps[i].id, pick: () => this.setState({ apApp: apApps[i].id }), row: 'width: 100%; min-height: 62px; padding: 8px 10px; border-radius: 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; font: inherit; color: #3A2B1A; ' + (s.apApp === apApps[i].id ? 'background: linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,224,150,0.5) 100%); border: 1.5px solid #FFB25C;' : 'background: transparent; border: 1.5px solid transparent;'), radio: 'width: 22px; height: 22px; border-radius: 999px; box-sizing: border-box; flex-shrink: 0; ' + (s.apApp === apApps[i].id ? 'border: 7px solid #FF8A3D; background: #FFFFFF;' : 'border: 1.5px solid rgba(58,43,26,0.25);') })),
      apPick: apPick, apConsent: s.apConsent, toggleApConsent: () => this.setState({ apConsent: !s.apConsent }),
      apBtn: 'height: 54px; padding: 0 18px; border-radius: 16px; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; flex-shrink: 0; ' + (apReady ? GOLD : DIM),
      apHead: 'display: flex; align-items: center; gap: 12px; padding: 14px 18px; color: #FFFFFF; background: ' + apPick.c + ';',
      openMandate: () => { if (!s.name.trim()) say('Add the name Pandit ji should read'); else this.setState({ mandate: 'approve', pin: '' }); },
      mandateOn: !!s.mandate, mandateApprove: s.mandate === 'approve', mandateBusy: s.mandate === 'busy',
      closeMandate: () => this.setState({ mandate: null, pin: '', toast: { m: 'Autopay not set up. Nothing was charged.', t: Date.now() } }),
      keys: keys, pinDots: pinDots,
      pinDemo: () => { if (s.mandate === 'approve') { this.setState({ pin: '482915', mandate: 'busy' }); finishSeva(); } },
      goSevaManage: () => go('sevaManage'),
      togglePause: () => { if (!SA) return; const nx = SA.status === 'paused' ? 'active' : 'paused'; this.setState({ sevaActive: Object.assign({}, SA, { status: nx }), toast: { m: nx === 'paused' ? 'Seva paused. No debits until you resume.' : 'Seva resumed. Next debit as scheduled.', t: Date.now() } }); },
      askStop: () => this.setState({ sheet: 'stopSeva' }), sheetStop: s.sheet === 'stopSeva',
      confirmStop: () => { if (!SA) return; this.setState({ sevaActive: Object.assign({}, SA, { status: 'stopped' }), sheet: null, toast: { m: 'Seva stopped. Autopay cancelled. Confirmation sent on WhatsApp.', t: Date.now() } }); },
      tickRow: 'display: flex; gap: 10px; align-items: flex-start;',
      tickCoin: 'width: 20px; height: 20px; margin-top: -1px; border-radius: 999px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(150deg, #6EE7A8 0%, #1F9D55 100%); box-shadow: 0 3px 8px rgba(21,128,61,0.22);',
      panditCoin: coin(56, 17),
      stepOn: 'height: 36px; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; font-weight: 600; ' + GOLDS,
      stepOff: 'height: 36px; border-radius: 999px; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; font-weight: 500; color: rgba(58,43,26,0.6); ' + 'background: rgba(255,255,255,0.62); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 4px 14px rgba(255,138,61,0.1);',
      stepDot: 'width: 20px; height: 20px; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; background: rgba(255,255,255,0.9); color: #B5470C;',
      stepDotOff: 'width: 20px; height: 20px; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; background: rgba(58,43,26,0.08); color: rgba(58,43,26,0.6);',
      mCell: 'display: flex; flex-direction: column; gap: 3px; padding: 11px 13px; border-radius: 16px; background: rgba(255,255,255,0.74); border: 1px solid rgba(255,255,255,0.85);',
      langs: d.LANGS.map((l) => ({ n: l.n, e: l.e, sel: s.pickLang === l.id, pick: () => this.setState({ pickLang: l.id }), style: 'position: relative; height: 92px; border-radius: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; cursor: pointer; font: inherit; color: #3A2B1A; padding: 0; ' + (s.pickLang === l.id ? 'background: linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,224,150,0.5) 100%); border: 1.5px solid #FFB25C; box-shadow: inset 0 1px 0 #FFFFFF, 0 12px 24px -12px rgba(226,120,0,0.48);' : GL) })),
      langContinue: () => go('onboard', { lang: s.pickLang === 'hi' ? 'hi' : 'en', ob: 0 }),

      ob: { skip: OBL.skip, k: slide.k, t: slide.t, x: slide.x, cta: s.ob < 2 ? OBL.next : OBL.start },
      ob0: s.ob === 0, ob1: s.ob === 1, ob2: s.ob === 2, obDots: obDots,
      obRing: (obFrac * 603).toFixed(1) + ' 603', obClock: nearest.c.clock, obNear: nearest.short + ' · ' + nearest.closeLabel,
      obNext: () => { if (s.ob < 2) this.setState({ ob: s.ob + 1 }); else go('login'); },
      obSkip: () => go('login'),

      phone: s.phone, phoneFmt: phoneFmt,
      onPhone: (e) => this.setState({ phone: String(e.target.value).replace(/\D/g, '').slice(0, 10) }),
      chWa: s.channel === 'wa', chSms: s.channel === 'sms', waStyle: chanS(s.channel === 'wa'), smsStyle: chanS(s.channel === 'sms'),
      pickWa: () => this.setState({ channel: 'wa' }), pickSms: () => this.setState({ channel: 'sms' }),
      consent: s.consent, toggleConsent: () => this.setState({ consent: !s.consent }),
      sendStyle: BTN + ' ' + (s.phone.length === 10 ? GOLD : DIM),
      sendOtp: () => { if (s.phone.length !== 10) say('Enter your 10-digit mobile number'); else go('otp', { otp: '', otpAt: Date.now() }); },
      truecaller: () => tabTo('home', { phone: '9876543210', name: 'Rohit Sharma', toast: { m: 'Verified with Truecaller. Welcome, Rohit', t: Date.now() } }),
      back: back,
      otpChannel: s.channel === 'wa' ? 'WhatsApp' : 'SMS', otp: s.otp, otpBoxes: otpBoxes,
      onOtp: (e) => this.setState({ otp: String(e.target.value).replace(/\D/g, '').slice(0, 6) }),
      cantResend: rsec > 0, canResend: rsec === 0, resendIn: '0:' + this.pad(rsec),
      resend: () => this.setState({ otpAt: Date.now(), otp: '', toast: { m: 'New code sent', t: Date.now() } }),
      autofill: () => this.setState({ otp: '482915' }),
      verifyStyle: BTN + ' ' + (s.otp.length === 6 ? GOLD : DIM),
      verify: () => { if (s.otp.length !== 6) say('Enter all 6 digits of the code'); else tabTo('home', { toast: { m: 'Number verified. Welcome to Jai Bhakti', t: Date.now() } }); },
      trySms: () => this.setState({ channel: 'sms', otpAt: Date.now(), otp: '', toast: { m: 'Code sent by SMS', t: Date.now() } }),
      name: s.name, onName: (e) => this.setState({ name: e.target.value }),
      gotra: s.gotra, onGotra: (e) => this.setState({ gotra: e.target.value }),
      openGotra: () => this.setState({ sheet: 'gotra' }),
      nameStyle: BTN + ' ' + (s.name.trim() ? GOLD : DIM),
      nameContinue: () => { if (!s.name.trim()) say('Please enter your name'); else tabTo('home', { toast: { m: 'Welcome to Jai Bhakti, ' + s.name.trim().split(' ')[0], t: Date.now() } }); },

      goProfile: () => go('profile'), goHome: () => tabTo('home'), goBhent: () => tabTo('bhent'), goGyan: () => tabTo('gyan'),
      initials: initials, firstName: firstName, fullName: s.name || 'Devotee',
      hero: hero, heroDots: heroDots, closing: sorted, nearest: nearest,
      homeDeities: homeDeities,
      templeCards: all.filter((x) => s.hDeity === 'all' || x.cat === s.hDeity).map((x) => ({ name: (TMETA[x.id] || {}).name || x.templeShort, loc: (TMETA[x.id] || {}).loc || x.templeShort, bg: x.bg, open: x.open })),
      qPanchang: () => go('panchang'), qRashi: () => go('rashifal', { rashi: 5 }), qAarti: () => go('aarti'),
      prob: {
        obstacles: () => tabTo('bhent', { problem: 'obstacles', deity: 'all', q: '' }), money: () => tabTo('bhent', { problem: 'money', deity: 'all', q: '' }),
        career: () => tabTo('bhent', { problem: 'career', deity: 'all', q: '' }), health: () => tabTo('bhent', { problem: 'health', deity: 'all', q: '' }),
        family: () => tabTo('bhent', { problem: 'family', deity: 'all', q: '' }), ancestors: () => tabTo('bhent', { problem: 'ancestors', deity: 'all', q: '' })
      },
      tst: d.TST.map((r) => Object.assign({}, r, { on: '★★★★★'.slice(0, r.st), off: '★★★★★'.slice(r.st), ini: r.n.split(' ').map((w) => w[0]).join('') })),
      homeArts: gAll.slice(0, 3),
      aartiRows: aartiRows,

      q: s.q, onQ: (e) => this.setState({ q: e.target.value }), deities: deities,
      probOn: !!s.problem, probLabel: s.problem ? d.PROBLEMS[s.problem] : '', clearProb: () => this.setState({ problem: null }),
      list: list, listEmpty: list.length === 0, listCount: list.length + (list.length === 1 ? ' seva' : ' sevas') + ' · closing soonest first',
      clearAll: () => this.setState({ problem: null, deity: 'all', q: '' }),

      b: b, freeMsg: freeMsg, freeBar: freeBar,
      share: () => say('Link copied. Share it with your family on WhatsApp.'),
      callUs: () => say('Calling Jai Bhakti support, 10:30 AM – 9 PM'), waUs: () => say('Opening WhatsApp chat with the Jai Bhakti team'),
      dHas: dcount > 0, dNone: dcount === 0,
      dCountTxt: dcount + (dcount === 1 ? ' seva selected' : ' sevas selected'), dSubTxt: inr(dsub),
      proceed: () => go('cart'), chooseHint: () => say('Tap + Add on any offering above'),

      cb: cb, lines: lines, cartEmpty: count === 0, cartFull: count > 0, upsell: upsell, hasUpsell: upsell.length > 0,
      name2: s.name2, onName2: (e) => this.setState({ name2: e.target.value }),
      famOn: s.family, famLabel: s.family ? 'Remove family member' : '+ Add a family member',
      toggleFamily: () => this.setState({ family: !s.family }),
      togglePrasad: () => { if (free) say('Prasad is already free on this seva'); else this.setState({ prasad: !s.prasad }); },
      prasadCard: 'display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 20px; cursor: pointer; font: inherit; color: #3A2B1A; ' + (prasadOn ? 'background: linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,224,150,0.5) 100%); border: 1.5px solid #FFB25C;' : GL),
      prasadSub: free ? 'Free on your seva · arrives in 7–10 days' : '₹101 · free on seva of ₹301 or more',
      prasadTick: 'width: 24px; height: 24px; border-radius: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; box-sizing: border-box; ' + (prasadOn ? 'background: linear-gradient(135deg, #FFB547 0%, #FF7A1A 100%); border: 0;' : 'background: #FFFFFF; border: 1.5px solid rgba(58,43,26,0.25);'),
      countTxt: countTxt, subTxt: inr(sub),
      feeTxt: free ? 'Free' : (s.prasad ? inr(101) : 'Not added'), feeStyle: 'font-weight: 500; color: ' + (free ? '#15803D' : '#3A2B1A') + ';',
      totalTxt: inr(total), goPay: () => { if (!s.name.trim()) say('Add the name Pandit ji should read'); else go('pay'); },

      upiList: d.PAY.filter((p) => p.upi).map(payRow), otherPay: d.PAY.filter((p) => !p.upi).map(payRow),
      payName: payPick.l, payLabel: 'Pay ' + inr(total) + ' with ' + payPick.l, payBtn: BTN + ' ' + GOLD, paying: s.paying,
      payNow: () => {
        if (this.state.paying || count === 0) return;
        this.setState({ paying: true });
        this.pt = setTimeout(() => {
          const bkNew = this.makeBooking(this.state);
          this.setState((st) => ({ paying: false, bookings: [bkNew].concat(st.bookings), lastBooking: bkNew, cart: {}, prasad: false, screen: 'success', hist: [] }));
        }, 2000);
      },

      bk: bk, shareWa: () => say('Opening WhatsApp with your booking card'), toBookings: () => go('bookings'),

      gq: s.gq, onGq: (e) => this.setState({ gq: e.target.value }), gcats: gcats,
      rashis: d.R.map((r, i) => ({ dev: r.dev, n: r.n, bg: s.rashi === i ? 'rgba(255,226,165,0.82)' : 'rgba(255,255,255,0.72)', border: s.rashi === i ? '#E97822' : 'rgba(255,255,255,0.9)', color: '#3A2B1A', shadow: s.rashi === i ? '0 6px 16px rgba(255,138,61,0.2)' : 'none', pick: () => this.setState({ rashi: i, sheet: null }) })),
      hasFeat: gList.length > 0, feat: feat, gRest: gList.slice(1), gEmpty: gList.length === 0, tracks: tracks,

      art: art, playing: s.playing, notPlaying: !s.playing,
      togglePlay: () => { if (s.playing) this.setState({ playing: false, playBase: pos }); else this.setState({ playing: true, playAt: Date.now(), playBase: pos >= A0.dur ? 0 : pos }); },
      audioTitle: s.playing ? 'Listening · Hindi narration' : 'Listen to this article',
      audioBar: 'height: 100%; width: ' + Math.round(pos / A0.dur * 100) + '%; border-radius: 999px; background: linear-gradient(90deg, #FFD24A, #FF8A3D);',
      audioPos: mmss(pos), audioDur: mmss(A0.dur),
      moreArts: gAll.filter((a) => a.id !== A0.id).slice(0, 2),
      shareArt: () => say('Article card ready to share on WhatsApp'),

      gotraTxt: (s.gotra || 'Kashyap (assigned)') + ' gotra', bookCount: String(s.bookings.length), nameCount: String(nameCount), menu: menu.filter((m) => !/^(My bookings|My weekly seva|My family|Birth details|Countdown alert|Jai Bhakti promise|Refer a friend)/i.test(m.l)),
      logout: () => this.setState({ screen: 'home', hist: [], tab: 'home', toast: { m: 'Logged out', t: Date.now() } }),
      bookings: s.bookings, noBookings: s.bookings.length === 0,

      navB: 'height: 66px; border: 0; background: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; font: inherit; font-size: 11px; font-weight: 500; letter-spacing: 0.02em; color: ' + (is.bhent ? '#C4571A' : 'rgba(58,43,26,0.45)') + ';',
      navG: 'height: 66px; border: 0; background: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; font: inherit; font-size: 11px; font-weight: 500; letter-spacing: 0.02em; color: ' + (is.gyan ? '#C4571A' : 'rgba(58,43,26,0.45)') + ';',
      navH: 'font-size: 11px; line-height: 14px; font-weight: 500; letter-spacing: 0.02em; color: ' + (is.home ? '#C4571A' : 'rgba(58,43,26,0.45)') + ';',
      navBCur: is.bhent ? 'page' : 'false', navGCur: is.gyan ? 'page' : 'false', navHCur: is.home ? 'page' : 'false',

      sheetGotra: s.sheet === 'gotra', sheetGotraInfo: s.sheet === 'gotraInfo', openGotraInfo: () => this.setState({ sheet: 'gotraInfo' }), sheetRashi: s.sheet === 'rashi', rs: rs,
      closeSheet: () => this.setState({ sheet: null }),
      useKashyap: () => this.setState({ gotra: 'Kashyap (assigned)', sheet: null, toast: { m: 'Gotra set to Kashyap (assigned)', t: Date.now() } }),

      toastOn: toastOn, toastMsg: s.toast ? s.toast.m : '',
      toastStyle: 'position: absolute; left: 20px; right: 20px; bottom: ' + toastBottom + 'px; z-index: 80; display: flex; align-items: center; gap: 10px; padding: 14px 18px; border-radius: 18px; font-size: 13.5px; line-height: 19px; font-weight: 500; color: #FFF6E6; background: rgba(58,36,18,0.9); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,214,107,0.22); box-shadow: 0 16px 36px rgba(58,43,26,0.28);' + (this.props.still ? '' : ' animation: dhRise 0.35s ease both;'),
    };
  }
}
