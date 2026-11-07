import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import BeforeAfter from './components/BeforeAfter'
import Process from './components/Process'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ToothWheel from './components/ToothWheel'
import Diwali from './components/Diwali'

// Smooth-scroll to in-page sections (#about, #gallery, ...) without
// putting the "#section" into the address bar.
function scrollToSection(id) {
  if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' })
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
const cleanUrl = () => window.history.replaceState(null, '', window.location.pathname + window.location.search)

function useCleanHashLinks() {
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      if (!id || (id !== 'top' && !document.getElementById(id))) return
      e.preventDefault()
      // small delay lets the mobile menu close and unlock scrolling first
      setTimeout(() => scrollToSection(id), 30)
      cleanUrl()
    }
    document.addEventListener('click', onClick)

    // Old links that still carry a #section: scroll there, then tidy the URL.
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      setTimeout(() => scrollToSection(id), 400)
      cleanUrl()
    }
    return () => document.removeEventListener('click', onClick)
  }, [])
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useCleanHashLinks()

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <ToothWheel />
      <main>
        <Hero />
        <About />
        <Services />
        <BeforeAfter />
        <Process />
        <Gallery />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Diwali />
    </>
  )
}
