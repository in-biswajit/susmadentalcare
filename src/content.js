// ============================================================
//  All website text in English (en) and Odia (or).
//  Edit both languages together. Lines marked TODO need real details.
// ============================================================
import { clinic } from './data'

const icons = ['smile', 'root', 'implant', 'braces', 'sparkle', 'crown', 'child', 'tooth']
const withIcons = (items) => items.map((s, i) => ({ ...s, icon: icons[i], featured: i === 0 }))

const en = {
  langName: 'English',
  meta: {
    title: 'Susma Dental Care | Dentist in Junagarh, Kalahandi, Odisha',
    description: 'Susma Dental Care, Junagarh (Kalahandi, Odisha) - Dr. Snigdha Singh (B.D.S). Painless root canal, implants, braces, teeth whitening, cleaning and kids dentistry. Call +91 79740 90543.',
  },
  name: 'Susma Dental Care',
  doctor: 'Dr. Snigdha Singh',
  role: 'B.D.S · Dental Surgeon',
  qualification: ['B.D.S', 'Dental Surgeon'],
  address: 'Junagarh, Kalahandi, Odisha',
  timings: [
    { day: 'Mon – Sat', time: '10 AM – 2 PM · 5 PM – 9 PM' }, // TODO
    { day: 'Sunday', time: 'By appointment' },
  ],

  nav: {
    links: [
      { href: '#about', label: 'About' },
      { href: '#services', label: 'Treatments' },
      { href: '#results', label: 'Results' },
      { href: '#reviews', label: 'Reviews' },
      { href: '#contact', label: 'Contact' },
    ],
    cta: 'Book a visit',
    open: 'Open menu',
    close: 'Close menu',
  },

  hero: {
    greet: 'Juhar!',
    pill: 'Now accepting new patients',
    before: 'Smiles,',
    words: ['crafted', 'restored', 'perfected', 'protected'],
    after: 'with gentle care.',
    lead: 'A calm, modern dental clinic where painless treatment meets honest advice. For you, your parents and your little ones.',
    cta: 'Book appointment',
    explore: 'Explore treatments',
    loved: `Loved by ${clinic.patients.toLocaleString('en-IN')}+ patients`,
    badge: 'PAINLESS • MODERN • CARING • DENTISTRY • ',
    chip1: ['100% Sterile', 'Autoclave protocol'],
    chip2: ['Same-day slots', 'Book on WhatsApp'],
    chip3: ['years of', 'trusted care'],
  },

  about: {
    kicker: 'About the doctor',
    title: 'Dentistry that feels like *care,* not a chore.',
    lead: (doc, n) => `Hi, I'm ${doc}. For over ${n} years, I've helped people who were nervous, embarrassed or simply too busy finally fall in love with their smile again.`,
    body: (name) => `Every plan at ${name} starts with listening. No upselling, no rush, just honest advice, gentle hands and technology that makes treatment faster and virtually painless.`,
    quote: '“A healthy smile changes how you walk into a room. That\'s what we really treat.”',
    photo: 'Doctor portrait',
  },

  stats: ['Years of practice', 'Smiles treated', 'Specialised treatments', 'Google rating'],

  services: {
    kicker: 'Treatments',
    title: 'Everything your smile needs, *under one roof.*',
    sub: 'From a quick cleaning to a full smile makeover, every treatment is planned around your comfort, your budget and your goals.',
    items: withIcons([
      { title: 'Smile Makeover', desc: 'Veneers, contouring and whitening, designed around your face, so the result looks naturally you.' },
      { title: 'Painless Root Canal', desc: 'Single-sitting rotary RCT with zero fuss.' },
      { title: 'Dental Implants', desc: 'Permanent teeth that look and feel natural.' },
      { title: 'Braces & Aligners', desc: 'Metal, ceramic or invisible: your choice.' },
      { title: 'Teeth Whitening', desc: 'Up to 8 shades brighter in one visit.' },
      { title: 'Crowns & Bridges', desc: 'Zirconia and ceramic, crafted to fit.' },
      { title: 'Kids Dentistry', desc: 'Gentle care that kids actually enjoy.' },
      { title: 'Checkup & Cleaning', desc: 'Scaling, polishing and preventive care.' },
    ]),
  },

  results: {
    kicker: 'Real results',
    title: 'Drag to see the *difference.*',
    lead: "Whitening, cleaning and cosmetic care can transform a dull, stained smile into one you'll want to show off, often in a single visit.",
    points: ['Up to 8 shades whiter', 'Stain & tartar removal', 'Safe for enamel', 'Results in ~60 minutes'],
    before: 'Before',
    after: 'After',
    aria: 'Compare before and after',
  },

  process: {
    kicker: 'Your visit',
    title: 'Four calm steps to a *brighter smile.*',
    steps: [
      { title: 'Consult', desc: 'A relaxed conversation about your concerns, goals and dental history.' },
      { title: 'Diagnose', desc: 'Digital X-rays and intraoral camera, so you see exactly what we see.' },
      { title: 'Treat', desc: 'Painless, precise treatment with sterilised, modern equipment.' },
      { title: 'Smile', desc: 'Follow-ups and a long-term care plan to keep your smile healthy.' },
    ],
  },

  reviews: {
    kicker: 'Kind words',
    avg: 'Average Google rating',
    aria: (n) => `Review by ${n}`,
    items: [
      { name: 'Priya Sharma', treatment: 'Root Canal', text: 'I was terrified of root canals, but I honestly felt nothing. The doctor explained every step and the clinic feels more like a spa than a hospital.' },
      { name: 'Rahul Verma', treatment: 'Dental Implants', text: 'Got two implants done here. Professional, spotless and very reasonably priced. I can finally eat everything again!' },
      { name: 'Anita Das', treatment: 'Kids Dentistry', text: 'My daughter used to cry at the word "dentist". Now she asks when her next visit is. That says everything.' },
      { name: 'Sameer Khan', treatment: 'Teeth Whitening', text: 'One sitting and my smile is visibly brighter. Friendly staff, no waiting, and genuinely honest advice.' },
    ],
  },

  faq: {
    kicker: 'Questions',
    title: 'Good to *know.*',
    help: "Still unsure about something? We're happy to talk it through, no obligation.",
    ask: 'Ask on WhatsApp',
    items: [
      { q: 'Is root canal treatment painful?', a: 'Not at all. With modern rotary instruments and effective local anaesthesia, a root canal feels very similar to getting a regular filling.' },
      { q: 'How often should I visit the dentist?', a: 'Every 6 months for a checkup and cleaning. Regular visits catch small problems before they become painful or expensive.' },
      { q: 'Do you treat children?', a: 'Yes! We love little patients. Our approach is gentle, playful and focused on building good habits early.' },
      { q: 'Do you offer EMI or payment plans?', a: 'Yes, for treatments like implants, braces and smile makeovers we offer easy, transparent EMI options.' },
      { q: 'Do I need to book in advance?', a: 'Walk-ins are welcome, but booking via WhatsApp or phone means little to no waiting time.' },
    ],
  },

  contact: {
    kicker: 'Book a visit',
    title: 'Ready for your *best smile?*',
    sub: "Send us your details and we'll confirm your slot on WhatsApp within minutes.",
    call: 'Call us',
    email: 'Email',
    visit: 'Visit',
    hours: 'Hours',
    formTitle: 'Request an appointment',
    fName: 'Full name',
    fPhone: 'Phone number',
    fTreatment: 'Treatment',
    fDate: 'Preferred date',
    fMessage: 'Anything we should know? (optional)',
    submit: 'Confirm on WhatsApp',
    note: "No spam. We'll only use your number to confirm your visit.",
    wa: (f, name) =>
      `Hello ${name}, I'd like to book an appointment.\n\n` +
      `Name: ${f.name}\nPhone: ${f.phone}\nTreatment: ${f.service || 'General checkup'}\n` +
      `Preferred date: ${f.date || 'Any'}\nNote: ${f.message || '-'}`,
  },

  footer: {
    line1: 'Healthy smiles,',
    line2: 'happy lives.',
    explore: 'Explore',
    contact: 'Contact',
    follow: 'Follow',
    top: 'Back to top ↑',
    word: 'Susma',
  },
}

const or = {
  langName: 'ଓଡ଼ିଆ',
  meta: {
    title: 'ସୁଷମା ଡେଣ୍ଟାଲ କେୟାର | ଜୁନାଗଡ଼, କଳାହାଣ୍ଡିରେ ଦନ୍ତ ଚିକିତ୍ସା',
    description: 'ସୁଷମା ଡେଣ୍ଟାଲ କେୟାର, ଜୁନାଗଡ଼ (କଳାହାଣ୍ଡି, ଓଡ଼ିଶା) - ଡାଃ ସ୍ନିଗ୍ଧା ସିଂହ (B.D.S)। ଯନ୍ତ୍ରଣାହୀନ ରୁଟ୍ କେନାଲ୍, ଇମ୍ପ୍ଲାଣ୍ଟ, ବ୍ରେସେସ୍, ଦାନ୍ତ ଧଳା କରିବା ଓ ପିଲାଙ୍କ ଦନ୍ତ ଚିକିତ୍ସା। ଫୋନ୍: +91 79740 90543।',
  },
  name: 'ସୁଷମା ଡେଣ୍ଟାଲ କେୟାର',
  doctor: 'ଡାଃ ସ୍ନିଗ୍ଧା ସିଂହ',
  role: 'B.D.S · ଦନ୍ତ ଚିକିତ୍ସକ',
  qualification: ['B.D.S', 'ଦନ୍ତ ଚିକିତ୍ସକ'],
  address: 'ଜୁନାଗଡ଼, କଳାହାଣ୍ଡି, ଓଡ଼ିଶା',
  timings: [
    { day: 'ସୋମ – ଶନି', time: 'ସକାଳ 10 – ଦିନ 2 · ସନ୍ଧ୍ୟା 5 – ରାତି 9' }, // TODO
    { day: 'ରବିବାର', time: 'ଆପଏଣ୍ଟମେଣ୍ଟ ଅନୁସାରେ' },
  ],

  nav: {
    links: [
      { href: '#about', label: 'ଆମ ବିଷୟରେ' },
      { href: '#services', label: 'ଚିକିତ୍ସା' },
      { href: '#results', label: 'ଫଳାଫଳ' },
      { href: '#reviews', label: 'ସମୀକ୍ଷା' },
      { href: '#contact', label: 'ଯୋଗାଯୋଗ' },
    ],
    cta: 'ସମୟ ବୁକ୍ କରନ୍ତୁ',
    open: 'ମେନୁ ଖୋଲନ୍ତୁ',
    close: 'ମେନୁ ବନ୍ଦ କରନ୍ତୁ',
  },

  hero: {
    greet: 'ଜୁହାର!',
    pill: 'ନୂଆ ରୋଗୀଙ୍କ ପାଇଁ ଆପଏଣ୍ଟମେଣ୍ଟ ଖୋଲା ଅଛି',
    before: 'ଆପଣଙ୍କ ହସକୁ',
    words: ['ଝଲସାଉ', 'ସଜାଡ଼ୁ', 'ଫେରାଉ', 'ସୁରକ୍ଷିତ ରଖୁ'],
    after: 'କୋମଳ ଯତ୍ନରେ।',
    lead: 'ଏକ ଶାନ୍ତ, ଆଧୁନିକ ଡେଣ୍ଟାଲ କ୍ଲିନିକ୍, ଯେଉଁଠି ଯନ୍ତ୍ରଣାହୀନ ଚିକିତ୍ସା ସହିତ ମିଳେ ସଚ୍ଚୋଟ ପରାମର୍ଶ। ଆପଣ, ଆପଣଙ୍କ ବାପାମାଆ ଓ ଛୋଟ ପିଲାମାନଙ୍କ ପାଇଁ।',
    cta: 'ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ',
    explore: 'ଚିକିତ୍ସା ଦେଖନ୍ତୁ',
    loved: `${clinic.patients.toLocaleString('en-IN')}+ ରୋଗୀଙ୍କ ଭରସା`,
    badge: 'ଯନ୍ତ୍ରଣାହୀନ • ଆଧୁନିକ • ଯତ୍ନଶୀଳ • ଦନ୍ତ ଚିକିତ୍ସା • ',
    chip1: ['100% ଜୀବାଣୁମୁକ୍ତ', 'ଅଟୋକ୍ଲେଭ୍ ପ୍ରଣାଳୀ'],
    chip2: ['ସେହି ଦିନ ସମୟ', 'WhatsApp ରେ ବୁକ୍ କରନ୍ତୁ'],
    chip3: ['ବର୍ଷର', 'ଭରସାଯୋଗ୍ୟ ସେବା'],
  },

  about: {
    kicker: 'ଡାକ୍ତରଙ୍କ ବିଷୟରେ',
    title: 'ଦାନ୍ତ ଚିକିତ୍ସା, ଯାହା ଡର ନୁହେଁ, *ଯତ୍ନ* ଭଳି ଲାଗେ।',
    lead: (doc, n) => `ନମସ୍କାର, ମୁଁ ${doc}। ${n} ବର୍ଷରୁ ଅଧିକ ସମୟ ଧରି ମୁଁ ଡରୁଥିବା, ସଂକୋଚ କରୁଥିବା କିମ୍ବା ବ୍ୟସ୍ତ ଲୋକମାନଙ୍କୁ ପୁଣି ଥରେ ନିଜ ହସକୁ ଭଲ ପାଇବାରେ ସାହାଯ୍ୟ କରିଆସୁଛି।`,
    body: (name) => `${name}ରେ ପ୍ରତ୍ୟେକ ଚିକିତ୍ସା ଯୋଜନା ଆପଣଙ୍କ କଥା ଶୁଣିବାରୁ ଆରମ୍ଭ ହୁଏ। ଅନାବଶ୍ୟକ ଚିକିତ୍ସା ନାହିଁ, ତରବର ନାହିଁ, କେବଳ ସଚ୍ଚୋଟ ପରାମର୍ଶ, କୋମଳ ହାତ ଓ ଆଧୁନିକ ପ୍ରଯୁକ୍ତି, ଯାହା ଚିକିତ୍ସାକୁ ଶୀଘ୍ର ଓ ପ୍ରାୟ ଯନ୍ତ୍ରଣାହୀନ କରେ।`,
    quote: '“ସୁସ୍ଥ ହସ ଆପଣଙ୍କ ଆତ୍ମବିଶ୍ୱାସକୁ ବଦଳାଇ ଦିଏ। ଆମେ ପ୍ରକୃତରେ ସେଇଟିର ହିଁ ଚିକିତ୍ସା କରୁ।”',
    photo: 'ଡାକ୍ତରଙ୍କ ଫଟୋ',
  },

  stats: ['ବର୍ଷର ଅଭିଜ୍ଞତା', 'ଖୁସି ରୋଗୀ', 'ବିଶେଷ ଚିକିତ୍ସା', 'Google ରେଟିଂ'],

  services: {
    kicker: 'ଚିକିତ୍ସା',
    title: 'ଆପଣଙ୍କ ହସ ପାଇଁ ସବୁକିଛି, *ଗୋଟିଏ ଛାତ ତଳେ।*',
    sub: 'ସାଧାରଣ ସଫେଇଠାରୁ ସମ୍ପୂର୍ଣ୍ଣ ସ୍ମାଇଲ୍ ମେକଓଭର ପର୍ଯ୍ୟନ୍ତ, ପ୍ରତ୍ୟେକ ଚିକିତ୍ସା ଆପଣଙ୍କ ଆରାମ, ବଜେଟ୍ ଓ ଲକ୍ଷ୍ୟକୁ ଧ୍ୟାନରେ ରଖି ଯୋଜନା କରାଯାଏ।',
    items: withIcons([
      { title: 'ସ୍ମାଇଲ୍ ମେକଓଭର', desc: 'ଭେନିୟର୍, କଣ୍ଟୁରିଂ ଓ ହ୍ୱାଇଟେନିଂ, ଆପଣଙ୍କ ଚେହେରା ଅନୁସାରେ ଡିଜାଇନ୍, ଯେପରି ଫଳାଫଳ ସ୍ୱାଭାବିକ ଦେଖାଯାଏ।' },
      { title: 'ଯନ୍ତ୍ରଣାହୀନ ରୁଟ୍ କେନାଲ୍', desc: 'ଆଧୁନିକ ରୋଟାରି ଯନ୍ତ୍ରରେ ଗୋଟିଏ ସିଟିଂରେ RCT।' },
      { title: 'ଡେଣ୍ଟାଲ୍ ଇମ୍ପ୍ଲାଣ୍ଟ', desc: 'ସ୍ଥାୟୀ ଦାନ୍ତ, ଯାହା ପ୍ରାକୃତିକ ଭଳି ଦେଖାଯାଏ ଓ ଲାଗେ।' },
      { title: 'ବ୍ରେସେସ୍ ଓ ଆଲାଇନର୍', desc: 'ମେଟାଲ୍, ସେରାମିକ୍ କିମ୍ବା ଅଦୃଶ୍ୟ, ଆପଣଙ୍କ ପସନ୍ଦ।' },
      { title: 'ଦାନ୍ତ ଧଳା କରିବା', desc: 'ଗୋଟିଏ ଭିଜିଟ୍‌ରେ 8 ସେଡ୍ ପର୍ଯ୍ୟନ୍ତ ଉଜ୍ଜ୍ୱଳ।' },
      { title: 'କ୍ରାଉନ୍ ଓ ବ୍ରିଜ୍', desc: 'ଜିର୍କୋନିଆ ଓ ସେରାମିକ୍, ସଠିକ୍ ମାପରେ ତିଆରି।' },
      { title: 'ପିଲାଙ୍କ ଦନ୍ତ ଚିକିତ୍ସା', desc: 'କୋମଳ ଯତ୍ନ, ଯାହା ପିଲାମାନେ ପସନ୍ଦ କରନ୍ତି।' },
      { title: 'ଯାଞ୍ଚ ଓ ସଫେଇ', desc: 'ସ୍କେଲିଂ, ପଲିସିଂ ଓ ପ୍ରତିରୋଧମୂଳକ ଯତ୍ନ।' },
    ]),
  },

  results: {
    kicker: 'ପ୍ରକୃତ ଫଳାଫଳ',
    title: 'ଟାଣି ଦେଖନ୍ତୁ *ପାର୍ଥକ୍ୟ।*',
    lead: 'ହ୍ୱାଇଟେନିଂ, ସଫେଇ ଓ କସମେଟିକ୍ ଯତ୍ନ ଏକ ମଳିନ, ଦାଗଯୁକ୍ତ ହସକୁ ଉଜ୍ଜ୍ୱଳ କରିଦିଏ, ଅନେକ ସମୟରେ ଗୋଟିଏ ଭିଜିଟ୍‌ରେ।',
    points: ['8 ସେଡ୍ ପର୍ଯ୍ୟନ୍ତ ଧଳା', 'ଦାଗ ଓ ଟାର୍ଟାର୍ ସଫା', 'ଏନାମେଲ୍ ପାଇଁ ସୁରକ୍ଷିତ', 'ପ୍ରାୟ 60 ମିନିଟ୍‌ରେ ଫଳାଫଳ'],
    before: 'ପୂର୍ବରୁ',
    after: 'ପରେ',
    aria: 'ପୂର୍ବରୁ ଓ ପରେ ତୁଳନା କରନ୍ତୁ',
  },

  process: {
    kicker: 'ଆପଣଙ୍କ ଭିଜିଟ୍',
    title: 'ଉଜ୍ଜ୍ୱଳ ହସ ପାଇଁ *ଚାରୋଟି ସହଜ ପଦକ୍ଷେପ।*',
    steps: [
      { title: 'ପରାମର୍ଶ', desc: 'ଆପଣଙ୍କ ସମସ୍ୟା, ଲକ୍ଷ୍ୟ ଓ ଦାନ୍ତର ଇତିହାସ ବିଷୟରେ ଆରାମରେ କଥାବାର୍ତ୍ତା।' },
      { title: 'ନିଦାନ', desc: 'ଡିଜିଟାଲ୍ X-ray ଓ ଇଣ୍ଟ୍ରାଓରାଲ୍ କ୍ୟାମେରା, ଯେପରି ଆମେ ଯାହା ଦେଖୁ ଆପଣ ବି ଦେଖିପାରିବେ।' },
      { title: 'ଚିକିତ୍ସା', desc: 'ଜୀବାଣୁମୁକ୍ତ, ଆଧୁନିକ ଯନ୍ତ୍ରରେ ଯନ୍ତ୍ରଣାହୀନ ଓ ସଠିକ୍ ଚିକିତ୍ସା।' },
      { title: 'ହସନ୍ତୁ', desc: 'ଫଲୋ-ଅପ୍ ଓ ଦୀର୍ଘକାଳୀନ ଯତ୍ନ ଯୋଜନା, ଯେପରି ହସ ସବୁଦିନ ସୁସ୍ଥ ରହେ।' },
    ],
  },

  reviews: {
    kicker: 'ରୋଗୀଙ୍କ କଥା',
    avg: 'ହାରାହାରି Google ରେଟିଂ',
    aria: (n) => `${n}ଙ୍କ ସମୀକ୍ଷା`,
    items: [
      { name: 'ପ୍ରିୟା ଶର୍ମା', treatment: 'ରୁଟ୍ କେନାଲ୍', text: 'ରୁଟ୍ କେନାଲ୍ ନାଁ ଶୁଣି ମୁଁ ବହୁତ ଡରୁଥିଲି, କିନ୍ତୁ ସତରେ ମୋତେ କିଛି ଯନ୍ତ୍ରଣା ହେଲା ନାହିଁ। ଡାକ୍ତର ପ୍ରତ୍ୟେକ ପଦକ୍ଷେପ ବୁଝାଇଲେ, ଆଉ କ୍ଲିନିକ୍‌ଟି ହସ୍ପିଟାଲ୍ ଭଳି ନୁହେଁ, ବରଂ ଏକ ଆରାମଦାୟକ ସ୍ଥାନ ଭଳି ଲାଗେ।' },
      { name: 'ରାହୁଲ ବର୍ମା', treatment: 'ଡେଣ୍ଟାଲ୍ ଇମ୍ପ୍ଲାଣ୍ଟ', text: 'ଏଠାରେ ଦୁଇଟି ଇମ୍ପ୍ଲାଣ୍ଟ କରାଇଲି। ବହୁତ ପେସାଦାର, ପରିଷ୍କାର ଓ ଉଚିତ ଦାମ୍। ଏବେ ମୁଁ ପୁଣି ସବୁକିଛି ଖାଇପାରୁଛି!' },
      { name: 'ଅନିତା ଦାସ', treatment: 'ପିଲାଙ୍କ ଦନ୍ତ ଚିକିତ୍ସା', text: 'ମୋ ଝିଅ "ଡେଣ୍ଟିଷ୍ଟ" ନାଁ ଶୁଣିଲେ କାନ୍ଦୁଥିଲା। ଏବେ ସେ ନିଜେ ପଚାରେ ପରବର୍ତ୍ତୀ ଭିଜିଟ୍ କେବେ। ଏହା ହିଁ ସବୁକିଛି କହିଦିଏ।' },
      { name: 'ସମୀର ଖାନ', treatment: 'ଦାନ୍ତ ଧଳା କରିବା', text: 'ଗୋଟିଏ ସିଟିଂରେ ମୋ ହସ ସ୍ପଷ୍ଟ ଭାବେ ଉଜ୍ଜ୍ୱଳ ହୋଇଗଲା। ବନ୍ଧୁତ୍ୱପୂର୍ଣ୍ଣ କର୍ମଚାରୀ, ଅପେକ୍ଷା ନାହିଁ, ଆଉ ସଚ୍ଚୋଟ ପରାମର୍ଶ।' },
    ],
  },

  faq: {
    kicker: 'ପ୍ରଶ୍ନୋତ୍ତର',
    title: 'ଜାଣିବା *ଜରୁରୀ।*',
    help: 'କିଛି ସନ୍ଦେହ ଅଛି କି? ଆମ ସହ ନିଃସଂକୋଚରେ କଥା ହୁଅନ୍ତୁ।',
    ask: 'WhatsApp ରେ ପଚାରନ୍ତୁ',
    items: [
      { q: 'ରୁଟ୍ କେନାଲ୍ ଚିକିତ୍ସାରେ ଯନ୍ତ୍ରଣା ହୁଏ କି?', a: 'ଆଦୌ ନୁହେଁ। ଆଧୁନିକ ରୋଟାରି ଯନ୍ତ୍ର ଓ ପ୍ରଭାବଶାଳୀ ଲୋକାଲ୍ ଆନେସ୍ଥେସିଆ ଯୋଗୁଁ ରୁଟ୍ କେନାଲ୍ ଏକ ସାଧାରଣ ଫିଲିଂ ଭଳି ଲାଗେ।' },
      { q: 'କେତେ ଦିନରେ ଥରେ ଡେଣ୍ଟିଷ୍ଟଙ୍କ ପାଖକୁ ଯିବା ଉଚିତ?', a: 'ପ୍ରତି 6 ମାସରେ ଥରେ ଯାଞ୍ଚ ଓ ସଫେଇ। ନିୟମିତ ଭିଜିଟ୍ ଛୋଟ ସମସ୍ୟାକୁ ଯନ୍ତ୍ରଣାଦାୟକ କିମ୍ବା ମହଙ୍ଗା ହେବା ପୂର୍ବରୁ ଧରିପାରେ।' },
      { q: 'ଆପଣ ପିଲାମାନଙ୍କର ଚିକିତ୍ସା କରନ୍ତି କି?', a: 'ହଁ! ଛୋଟ ରୋଗୀମାନଙ୍କୁ ଆମେ ବହୁତ ଭଲ ପାଉ। ଆମର ଢଙ୍ଗ କୋମଳ ଓ ଖେଳାଳି, ଯାହା ପିଲାଙ୍କଠାରେ ଆରମ୍ଭରୁ ଭଲ ଅଭ୍ୟାସ ଗଢ଼େ।' },
      { q: 'EMI କିମ୍ବା କିସ୍ତିରେ ଦେୟ ସୁବିଧା ଅଛି କି?', a: 'ହଁ, ଇମ୍ପ୍ଲାଣ୍ଟ, ବ୍ରେସେସ୍ ଓ ସ୍ମାଇଲ୍ ମେକଓଭର ଭଳି ଚିକିତ୍ସା ପାଇଁ ସହଜ ଓ ସ୍ପଷ୍ଟ EMI ସୁବିଧା ଅଛି।' },
      { q: 'ଆଗରୁ ବୁକ୍ କରିବା ଦରକାର କି?', a: 'ସିଧା ଆସିପାରିବେ, କିନ୍ତୁ WhatsApp କିମ୍ବା ଫୋନରେ ବୁକ୍ କଲେ ପ୍ରାୟ ଅପେକ୍ଷା କରିବାକୁ ପଡ଼ିବ ନାହିଁ।' },
    ],
  },

  contact: {
    kicker: 'ଭିଜିଟ୍ ବୁକ୍ କରନ୍ତୁ',
    title: 'ଆପଣଙ୍କ *ସବୁଠୁ ସୁନ୍ଦର ହସ* ପାଇଁ ପ୍ରସ୍ତୁତ କି?',
    sub: 'ଆପଣଙ୍କ ବିବରଣୀ ପଠାନ୍ତୁ, ଆମେ କିଛି ମିନିଟ୍‌ରେ WhatsApp ରେ ଆପଣଙ୍କ ସମୟ ନିଶ୍ଚିତ କରିବୁ।',
    call: 'ଫୋନ୍ କରନ୍ତୁ',
    email: 'ଇମେଲ୍',
    visit: 'ଠିକଣା',
    hours: 'ସମୟ',
    formTitle: 'ଆପଏଣ୍ଟମେଣ୍ଟ ପାଇଁ ଅନୁରୋଧ',
    fName: 'ପୂରା ନାମ',
    fPhone: 'ଫୋନ୍ ନମ୍ବର',
    fTreatment: 'ଚିକିତ୍ସା',
    fDate: 'ପସନ୍ଦର ତାରିଖ',
    fMessage: 'ଆଉ କିଛି କହିବାକୁ ଚାହାନ୍ତି କି? (ଇଚ୍ଛାଧୀନ)',
    submit: 'WhatsApp ରେ ନିଶ୍ଚିତ କରନ୍ତୁ',
    note: 'ଆପଣଙ୍କ ନମ୍ବର କେବଳ ଭିଜିଟ୍ ନିଶ୍ଚିତ କରିବା ପାଇଁ ବ୍ୟବହାର ହେବ।',
    wa: (f, name) =>
      `ନମସ୍କାର ${name}, ମୁଁ ଏକ ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରିବାକୁ ଚାହେଁ।\n\n` +
      `ନାମ: ${f.name}\nଫୋନ୍: ${f.phone}\nଚିକିତ୍ସା: ${f.service || 'ସାଧାରଣ ଯାଞ୍ଚ'}\n` +
      `ପସନ୍ଦର ତାରିଖ: ${f.date || 'ଯେକୌଣସି'}\nଟିପ୍ପଣୀ: ${f.message || '-'}`,
  },

  footer: {
    line1: 'ସୁସ୍ଥ ହସ,',
    line2: 'ଖୁସି ଜୀବନ।',
    explore: 'ଦେଖନ୍ତୁ',
    contact: 'ଯୋଗାଯୋଗ',
    follow: 'ଫଲୋ କରନ୍ତୁ',
    top: 'ଉପରକୁ ଯାଆନ୍ତୁ ↑',
    word: 'ସୁଷମା',
  },
}

export const content = { en, or }
