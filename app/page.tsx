'use client'

import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, ChevronDown, Clock3, Mail, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react'

const phone = '404-934-2853'
// WhatsApp number in full international format — country code + number, digits only (no +, spaces or dashes)
const whatsappNumber = '14049342853'
const whatsappText = "Hi Rea's Cleaning Services! I'd like to ask about a cleaning quote."
const services = [
  ['Commercial Office Cleaning', 'Keep your workplace clean, polished, and welcoming with dependable office cleaning tailored to your business.', '/images/office-cleaning.png'],
  ['Airbnb', 'Get your Airbnb guest-ready with detailed turnover cleaning that leaves every space fresh, spotless, and inviting.', '/images/airbnb-cleaning.png'],
  ['Moving', 'Make moving easier with thorough cleaning for move-in or move-out, helping you start fresh in a clean space.', '/images/moving-cleaning.png'],
  ['Clearing Out', 'Need a space cleared and cleaned? We help refresh and prepare areas after decluttering, cleanouts, and transitions.', '/images/clearing-out.png'],
  ['Commercial Services', 'Professional cleaning solutions designed to help commercial spaces maintain a clean, organized, and professional environment.', '/images/commercial-cleaning.png'],
]
const faqs = [
  ['What areas do you serve?', 'We proudly serve Atlanta, GA and surrounding areas. Contact us to confirm service availability for your location.'],
  ['What cleaning services do you offer?', 'We offer commercial office cleaning, Airbnb cleaning, moving cleaning, clearing-out services, and commercial services.'],
  ['Can I request a custom cleaning service?', 'Yes. We can discuss your specific needs and recommend a cleaning plan that works for your space.'],
  ['What are your business hours?', 'We are available from 9:00 AM to 9:00 PM.'],
  ['How can I get a quote?', `Call or text us at ${phone}, or use the contact form below to request a quote.`],
  ['How long have you been in business?', "Rea's Cleaning Services has more than 10 years of cleaning experience."],
]
const galleryImages = [
  ['/image-1.jpg', 'Office cleaning'],
  ['/image-9.jpg', 'Bathroom deep clean'],
  ['/image-5.jpg', 'Restroom care'],
  ['/image-10.jpg', 'Finishing touches'],
  ['/image-2.jpg', 'Workspace refresh'],
  ['/image-8.jpg', 'Floor & lobby care'],
  ['/image-7.jpg', 'Premium interiors'],
  ['/image-6.jpg', 'After-hours offices'],
]

function Button({ children, href = '#contact', variant = 'primary' }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'light' | 'outline' }) {
  return <a href={href} className={`button button-${variant}`}>{children}<ArrowUpRight size={16} /></a>
}

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    const play = () => { const p = v.play(); if (p) p.catch(() => {}) }
    play()
    v.addEventListener('canplay', play, { once: true })
    return () => v.removeEventListener('canplay', play)
  }, [])
  return <video ref={ref} className="hero-video" autoPlay muted loop playsInline preload="auto" poster="/images/hero-cleaning.png" aria-hidden="true" tabIndex={-1}><source src="/hero-video.mp4" type="video/mp4" /></video>
}

function WhatsAppButton() {
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`
  return <a className="whatsapp-fab" href={href} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.712 6.403L3.2 28.8l6.564-1.68a12.74 12.74 0 0 0 6.235 1.597h.005c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8Zm0 23.04h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.005 1.025 1.07-3.905-.253-.4a10.56 10.56 0 0 1-1.62-5.62c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.51 1.106 7.518 3.115a10.56 10.56 0 0 1 3.113 7.52c0 5.86-4.77 10.63-10.63 10.63Zm5.83-7.96c-.32-.16-1.89-.933-2.183-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.586-.95-.847-1.592-1.894-1.779-2.214-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.622-.523-.538-.72-.548l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.46 4.824.763.33 1.36.527 1.824.674.767.244 1.464.21 2.015.127.615-.092 1.89-.773 2.157-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373Z"/></svg><span>Chat with us</span></a>
}

function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastViewedRef = useRef(0)
  const count = galleryImages.length
  const open = index !== null

  const go = (dir: number) => setIndex((i) => (i === null ? i : (i + dir + count) % count))

  useEffect(() => {
    if (index !== null) lastViewedRef.current = index
  }, [index])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      else if (e.key === 'ArrowRight') setIndex((i) => (i === null ? i : (i + 1) % count))
      else if (e.key === 'ArrowLeft') setIndex((i) => (i === null ? i : (i - 1 + count) % count))
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      const buttons = gridRef.current?.querySelectorAll<HTMLButtonElement>('.gallery-item')
      buttons?.[lastViewedRef.current]?.focus()
    }
  }, [open, count])

  return <section id="gallery" className="gallery section-pad"><div className="section-heading"><div><p className="eyebrow">Gallery</p><h2>Our Work</h2></div><p>See the difference our cleaning makes.</p></div><div className="gallery-grid" ref={gridRef}>{galleryImages.map(([src, label], i) => <button type="button" className="gallery-item" key={src} onClick={() => setIndex(i)} aria-label={`View photo: ${label}`}><Image src={src} alt={`${label} by Rea's Cleaning Services`} fill sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 25vw" /><span className="gallery-cap">{label}</span></button>)}</div>{index !== null && createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${galleryImages[index][1]}, image ${index + 1} of ${count}`} onClick={() => setIndex(null)}>
      <button type="button" ref={closeRef} className="lightbox-close" onClick={() => setIndex(null)} aria-label="Close gallery">&times;</button>
      <button type="button" className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous photo">&#8249;</button>
      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img src={galleryImages[index][0]} alt={`${galleryImages[index][1]} by Rea's Cleaning Services`} />
        <figcaption>{galleryImages[index][1]}<span>{index + 1} / {count}</span></figcaption>
      </figure>
      <button type="button" className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next photo">&#8250;</button>
    </div>,
    document.body,
  )}</section>
}

const navLinks: [string, string][] = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Gallery', '#gallery'],
  ['FAQ', '#faq'],
  ['Contact', '#contact'],
]

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const spyLock = useRef(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 850 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const els = navLinks
      .map(([, href]) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return
    const seen = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)))
        if (Date.now() < spyLock.current) return
        const current = navLinks.map(([, h]) => h.slice(1)).find((id) => seen.has(id))
        setActive(current ? `#${current}` : '')
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
    <div className="nav-shell">
      <a href="#home" className="brand" aria-label="Rea's Cleaning Services, home"><Image src="/my-logo.png" alt="Rea's Cleaning Services" width={140} height={140} className="brand-logo" priority /></a>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        {navLinks.map(([label, href]) => <a key={href} href={href} aria-current={active === href ? 'page' : undefined} onClick={() => { spyLock.current = Date.now() + 700; setActive(href); setOpen(false) }}>{label}</a>)}
      </nav>
      <Button href="#contact">Get a free quote</Button>
      <button className="menu-button" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
  </header>
}

function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !body.ok) throw new Error(body.error || 'Something went wrong. Please try again.')
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return <div className="quote-form quote-form-done"><div className="form-done-mark"><Check size={26} /></div><h3>Request received</h3><p>Thanks for reaching out. We&apos;ll be in touch shortly to talk about your space.</p><a href={`tel:${phone}`} className="text-link">Or call us now <ArrowUpRight size={15} /></a></div>
  }

  return <form className="quote-form" onSubmit={handleSubmit}><div className="form-title"><h3>Request a free quote</h3><p>We&apos;ll be in touch shortly.</p></div><div className="form-grid"><label>Full name<input required name="name" placeholder="Your name" /></label><label>Phone number<input required type="tel" name="phone" placeholder="404-000-0000" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Service needed<select required name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map(([title]) => <option key={title}>{title}</option>)}</select></label><label>Preferred date<input type="date" name="date" /></label><label className="full-field">Message<textarea name="message" placeholder="Tell us a little about your space..." rows={4} /></label></div><button className="button button-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Request a free quote'} <ArrowUpRight size={16} /></button>{status === 'error' && <p className="form-error" role="alert">{error}</p>}<small className="form-note">No obligation <span>•</span> Quick response <span>•</span> Friendly service</small></form>
}

export default function Page() {
  return <main id="home">
    <Header />
    <section className="hero"><HeroVideo /><div className="hero-overlay" aria-hidden="true" /><div className="hero-inner"><div className="hero-copy"><p className="eyebrow">Trusted cleaning services in Atlanta</p><h1>Professional cleaning services <span>you can count on.</span></h1><p className="hero-text">From spotless offices to fresh Airbnb spaces and move-out cleanups, Rea&apos;s Cleaning Services helps keep your space clean, fresh, and ready for what comes next.</p><div className="hero-actions"><Button>Get a free quote</Button><a href={`tel:${phone}`} className="phone-link"><Phone size={17} /> Call {phone}</a></div><div className="trust-row"><span><b>10+</b> Years experience</span><span><b>✓</b> Reliable &amp; professional</span><span><b>⌖</b> Atlanta &amp; surrounding areas</span></div></div></div></section>
    <section id="about" className="about section-pad"><div className="about-image"><Image src="/about-image.jpg" alt="Rea's Cleaning Services team cleaning office windows" fill sizes="(max-width: 800px) 100vw, 42vw" /></div><div className="about-copy"><p className="eyebrow">A cleaner way forward</p><h2>Cleaning done right,<br /><i>every time.</i></h2><p>For more than 10 years, Rea&apos;s Cleaning Services has helped homes, offices, Airbnb properties, and commercial spaces stay clean and welcoming. Our professional approach is built on attention to detail, dependable service, and genuine care for every customer.</p><div className="feature-list">{['Experienced team','Detail-focused cleaning','Reliable service'].map(item => <div key={item}><span><Check size={15} /></span>{item}</div>)}</div></div></section>
    <section id="services" className="services section-pad"><div className="section-heading"><div><p className="eyebrow">What we do</p><h2>Our cleaning services</h2></div><p>Flexible cleaning solutions for homes, businesses, rentals, and everything in between.</p></div><div className="service-grid">{services.map(([title, desc, image], i) => <article className="service-card" key={title}><div className="service-image"><Image src={image} alt={`${title} by Rea's Cleaning Services`} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div className="service-info"><span className="service-number">0{i + 1}</span><h3>{title}</h3><p>{desc}</p></div></article>)}</div></section>
    <Gallery />
    <section id="faq" className="faq section-pad"><div className="faq-intro"><p className="eyebrow">Good to know</p><h2>Frequently asked<br /><i>questions.</i></h2><p>Can&apos;t find what you&apos;re looking for? Give us a call and we&apos;ll be happy to help.</p><a href={`tel:${phone}`} className="text-link">Talk to our team <ArrowUpRight size={15} /></a></div><div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown size={19} /></summary><p>{a}</p></details>)}</div></section>
    <section id="contact" className="contact section-pad"><div className="contact-intro"><p className="eyebrow">Let&apos;s get started</p><h2>Let&apos;s get your space<br /><i>looking its best.</i></h2><p>Tell us what you need cleaned and we&apos;ll be happy to help.</p><div className="contact-cards"><a href={`tel:${phone}`}><Phone size={20} /><span>Call or text<strong>{phone}</strong></span></a><a href="mailto:emilie0874@gmail.com"><Mail size={20} /><span>Email us<strong>emilie0874@gmail.com</strong></span></a><div><Clock3 size={20} /><span>Hours<strong>9:00 AM – 9:00 PM</strong></span></div></div></div><QuoteForm /></section>
    <footer>
      <div className="footer-cta"><div><h3>Ready for a space that feels brand new?</h3><p>Tell us what you need cleaned — we&apos;ll take care of the rest.</p></div><Button variant="light">Get a free quote</Button></div>
      <div className="footer-top">
        <div className="footer-brand-col"><a href="#home" className="footer-wordmark">Rea&apos;s <span>Cleaning Services</span></a><p>Professional cleaning for offices, Airbnb rentals, commercial spaces, and moves across Atlanta — reliable, detail-focused, and done right.</p><a className="footer-social" href="https://www.facebook.com/reacleaningservices/about/" target="_blank" rel="noreferrer" aria-label="Rea&apos;s Cleaning Services on Facebook"><span aria-hidden="true" className="facebook-mark">f</span></a></div>
        <div className="footer-col"><h4>Services</h4>{services.map(([title]) => <a key={title} href="#contact">{title}</a>)}</div>
        <div className="footer-col"><h4>Company</h4><a href="#about">About us</a><a href="#gallery">Our work</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
        <div className="footer-col footer-reach"><h4>Get in touch</h4><a href={`tel:${phone}`}><Phone size={14} /> {phone}</a><a href="mailto:emilie0874@gmail.com"><Mail size={14} /> emilie0874@gmail.com</a><span><Clock3 size={14} /> Open daily, 9 AM – 9 PM</span><span><MapPin size={14} /> Atlanta, GA &amp; surrounding areas</span></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Rea&apos;s Cleaning Services. All rights reserved.</span><span>10+ years of trusted cleaning in Atlanta.</span></div>
    </footer>
    <div className="mobile-cta"><a href={`tel:${phone}`}><Phone size={16} /> Call</a><a href={`sms:${phone}`}><Mail size={16} /> Text</a><a href="#contact"><Sparkles size={16} /> Quote</a></div>
    <WhatsAppButton />
  </main>
}
