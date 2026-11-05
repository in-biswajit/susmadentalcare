import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import BeforeAfter from './components/BeforeAfter'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ToothWheel from './components/ToothWheel'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

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
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
