import { createContext, useContext, useEffect, useState } from 'react'
import { content } from './content'
import { clinic } from './data'

const LangContext = createContext(null)

function initialLang() {
  // A ?lang=or / ?lang=en link always wins (handy for sharing the Odia version).
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'en' || fromUrl === 'or') return fromUrl
  try {
    const saved = localStorage.getItem('susma-lang')
    if (saved === 'en' || saved === 'or') return saved
  } catch {
    /* storage unavailable */
  }
  return clinic.defaultLang
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const t = content[lang]

  useEffect(() => {
    try {
      localStorage.setItem('susma-lang', lang)
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
