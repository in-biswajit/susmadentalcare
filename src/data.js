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
  // Gallery photos live in /public/gallery. `caption` is a key into
  // content.js -> gallery.captions. The grid layout is tuned for this order
  // (tall photos in slots 1, 3, 4 and 7; the big tile is slot 2).
  gallery: [
    { src: '/gallery/reception.webp', caption: 'reception' },
    { src: '/gallery/treatment-1.webp', caption: 'treatment' },
    { src: '/gallery/treatment-2.webp', caption: 'treatment' },
    { src: '/gallery/clinic-front.webp', caption: 'front' },
    { src: '/gallery/equipment.webp', caption: 'equipment' },
    { src: '/gallery/treatment-3.webp', caption: 'treatment' },
    { src: '/gallery/patients-1.webp', caption: 'patients' },
    { src: '/gallery/patients-2.webp', caption: 'patients' },
    { src: '/gallery/smile.webp', caption: 'smile' },
  ],
  social: {
    instagram: 'https://www.instagram.com/susma_dentalcare/',
    facebook: 'https://www.facebook.com/profile.php?id=61591864407482',
  },
}
