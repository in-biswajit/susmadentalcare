// ============================================================
//  SUSMA DENTAL CARE — shared (language-independent) details.
//  All visible text (English + Odia) lives in src/content.js
// ============================================================

export const clinic = {
  defaultLang: 'en', // 'en' or 'or' (Odia) — language shown on first visit
  doctorPhoto: '/doctor.webp', // file lives in /public
  experience: 10, // TODO: years of experience
  patients: 5000, // TODO
  rating: 4.9, // TODO
  phone: '+91 79740 90543',
  whatsapp: '917974090543', // country code + number, no "+"
  email: '', // TODO: add clinic email (hidden on the site while empty)
  mapEmbed: 'https://www.google.com/maps?q=Susma+Dental+Care,+Junagarh,+Kalahandi,+Odisha+766014&output=embed',
  // Gallery photos: put files in /public/gallery and list them here, in the
  // same order as the captions in content.js. '' shows a styled placeholder.
  gallery: ['', '', '', '', '', ''], // TODO: e.g. '/gallery/reception.jpg'
  social: {
    instagram: 'https://www.instagram.com/susma_dentalcare/',
    facebook: 'https://www.facebook.com/profile.php?id=61591864407482',
  },
}
