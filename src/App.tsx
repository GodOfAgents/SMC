/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import local assets
import civilWorker from '../assets/images/Civil worker.png';
import electricalWorks from '../assets/images/Electrical works.png';
import hvacWorkers from '../assets/images/HVAC Workers.png';
import plumbingPiping from '../assets/images/Plumbing & piping.png';
import mechanicalEngineer from '../assets/images/machenical engineer.png';
import welders from '../assets/images/welders.png';
import forkLiftOperator from '../assets/images/Fork lift oprator.png';
import metalFactory from '../assets/images/Matel factory.jpeg';
import craneOperator from '../assets/images/crane oprator.jpeg';

gsap.registerPlugin(ScrollTrigger);

// ── FAQ Accordion ────────────────────────────────────────────────
interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: 'power2.in' });
    }
  }, [open]);

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 cursor-pointer" onClick={() => setOpen(o => !o)}>
      <button 
        className="flex w-full items-center justify-between text-left" 
        {...(open ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
        aria-label={open ? 'Close answer' : 'Open answer'}
      >
        <span className="font-bold text-forest-green">{question}</span>
        <span
          className={`material-symbols-outlined transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
        >
          expand_more
        </span>
      </button>
      <div 
        ref={bodyRef} 
        className="ag-collapse"
      >
        <p className="mt-4 text-sm text-slate-600">{answer}</p>
      </div>
    </div>
  );
}

// ── Animated Stat ────────────────────────────────────────────────
interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: string;
  accentColor: string;
}

function AnimatedStat({ value, suffix, label, accentColor }: AnimatedStatProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        gsap.to(obj, {
          val: value,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          },
        });
      },
    });
  }, [value, suffix]);

  return (
    <div className="flex flex-col items-center">
      <span ref={numRef} className="text-5xl font-black text-forest-green mb-2 stat-number">0{suffix}</span>
      <span className="text-sm font-bold uppercase tracking-widest text-slate-400">{label}</span>
      <div className={`mt-4 h-1 w-12 ${accentColor}`}></div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuAriaExpanded = mobileMenuOpen ? 'true' : 'false';
  const headerRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);
  const ctaWrapperRef = useRef<HTMLDivElement>(null);
  const processLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // ── Header slide down ──────────────────────────────────────
    gsap.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1,
      }
    );

    // ── Hero text staggered entrance ──────────────────────────
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.querySelectorAll('.gsap-hero-text'),
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out', delay: 0.45 }
      );
    }

    // ── Hero image float loop ─────────────────────────────────
    if (heroImageRef.current) {
      gsap.fromTo(heroImageRef.current,
        { y: 0 },
        { y: -14, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 }
      );
    }

    // ── Stat badge independent float ──────────────────────────
    if (heroBadgeRef.current) {
      gsap.fromTo(heroBadgeRef.current,
        { y: 0 },
        { y: -8, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 }
      );
    }

    // ── Blob breathing ────────────────────────────────────────
    if (blob1Ref.current) {
      gsap.to(blob1Ref.current, { scale: 1.18, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }
    if (blob2Ref.current) {
      gsap.to(blob2Ref.current, { scale: 1.2, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    }

    // ── Compliance strip cards 3D hover (handled in JSX via onMouseEnter/Leave)

    // ── Values section scroll-trigger stagger ─────────────────
    gsap.utils.toArray<HTMLElement>('.ag-values-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
          delay: i * 0.1,
        }
      );
    });

    // ── Why Us cards ──────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>('.ag-whyus-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
          delay: i * 0.08,
        }
      );
    });

    // ── Services cards stagger ───────────────────────────────
    gsap.utils.toArray<HTMLElement>('.ag-service-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.08,
        }
      );
    });

    // ── Gallery images parallax ───────────────────────────────
    gsap.utils.toArray<HTMLElement>('.ag-gallery-img').forEach((img) => {
      gsap.to(img, {
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
    });

    // ── Process line draw ─────────────────────────────────────
    if (processLineRef.current) {
      gsap.fromTo(processLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: processLineRef.current, start: 'top 75%' },
        }
      );
    }

    // ── Process step circles bounce ───────────────────────────
    gsap.utils.toArray<HTMLElement>('.ag-step-circle').forEach((circle, i) => {
      gsap.fromTo(circle,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)',
          scrollTrigger: { trigger: circle, start: 'top 80%' },
          delay: i * 0.15,
        }
      );
    });

    // ── Testimonials slide in from sides ─────────────────────
    gsap.utils.toArray<HTMLElement>('.ag-testi-left').forEach(el => {
      gsap.fromTo(el,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
      );
    });
    gsap.utils.toArray<HTMLElement>('.ag-testi-right').forEach(el => {
      gsap.fromTo(el,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
      );
    });

    // ── Footer fade up ────────────────────────────────────────
    gsap.fromTo('.ag-footer',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.ag-footer', start: 'top 95%' } }
    );

    // ── CTA card mouse parallax ───────────────────────────────
    const wrapper = ctaWrapperRef.current;
    const card = ctaCardRef.current;
    if (wrapper && card) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        gsap.to(card, {
          rotateX: -dy * 4,
          rotateY: dx * 4,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      };
      const handleMouseLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
      };
      wrapper.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        wrapper.removeEventListener('mousemove', handleMouseMove);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  // ── 3D card hover helpers ────────────────────────────────────
  const onCard3DEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -8, rotateX: 3, scale: 1.02, duration: 0.35, ease: 'power2.out', transformPerspective: 800 });
  };
  const onCard3DLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, rotateX: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 z-50 w-full ag-glass-light border-b border-black/5 shadow-xl shadow-forest-green/5"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-3">
            <img src="/SMC_logo.png" alt="SMC Logo" className="h-10 w-auto object-contain drop-shadow-md" />
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-none tracking-tight text-forest-green uppercase font-['Sansation']">Shams Modern</span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-forest-green/60 uppercase mt-0.5">Contracting LLC</span>
            </div>
          </div>
          <nav className="hidden items-center gap-8 lg:flex">
            <a className="text-sm font-semibold text-forest-green hover:text-primary transition-colors duration-300" href="#services">Services</a>
            <a className="text-sm font-semibold text-forest-green hover:text-primary transition-colors duration-300" href="#partners">Partners</a>
            <a className="text-sm font-semibold text-forest-green hover:text-primary transition-colors duration-300" href="#compliance">Compliance</a>
            <a className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-forest-green shadow-md shadow-primary/30 hover:scale-105 hover:shadow-primary/50 transition-all duration-300" href="#request">
              Request Manpower
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </nav>
          <button 
            className="lg:hidden text-forest-green p-2 z-50" 
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            {...(mobileMenuOpen ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-forest-green/90 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
          <nav className="relative flex flex-col items-center justify-center h-full gap-8 text-white p-6">
            <a className="text-2xl font-bold hover:text-primary transition-colors" href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a className="text-2xl font-bold hover:text-primary transition-colors" href="#partners" onClick={() => setMobileMenuOpen(false)}>Partners</a>
            <a className="text-2xl font-bold hover:text-primary transition-colors" href="#compliance" onClick={() => setMobileMenuOpen(false)}>Compliance</a>
            <a className="rounded-full bg-primary px-8 py-3 text-lg font-bold text-forest-green shadow-lg shadow-primary/30" href="#request" onClick={() => setMobileMenuOpen(false)}>
              Request Manpower
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-20">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white px-6 py-16 lg:px-12 lg:py-24">
          <div ref={blob1Ref} className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div ref={blob2Ref} className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-sun-yellow/10 blur-3xl pointer-events-none" />
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div ref={heroTextRef} className="flex flex-col space-y-8">
                <div className="gsap-hero-text inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-forest-green border border-primary/20 w-fit">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Vision 2030 &amp; Ajeer Compliant
                </div>
                <h1 className="gsap-hero-text text-5xl font-black leading-[1.1] text-forest-green lg:text-7xl">
                  Jeddah's #1 <span className="text-primary underline decoration-sun-yellow/30 underline-offset-8">Future-Ready</span> Manpower Partner
                </h1>
                <p className="gsap-hero-text max-w-xl text-lg leading-relaxed text-slate-600">
                  Providing certified, Ajeer-ready, and highly skilled labor for Saudi Arabia's most ambitious mega-projects. Scale your workforce with precision and professionalism.
                </p>
                <div className="gsap-hero-text flex flex-wrap gap-4">
                  <a className="rounded-xl bg-forest-green px-8 py-4 text-center font-bold text-white shadow-xl shadow-forest-green/20 hover:bg-forest-green/90 hover:shadow-forest-green/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2" href="#request">
                    Request Manpower
                    <span className="material-symbols-outlined">bolt</span>
                  </a>
                  <a className="rounded-xl border-2 border-slate-200 px-8 py-4 text-center font-bold text-forest-green hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300" href="#services">
                    Our Workforce
                  </a>
                </div>
                <div className="gsap-hero-text flex items-center gap-6 pt-4">
                  <div className="flex -space-x-3">
                    <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 shadow"></div>
                    <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-300 shadow"></div>
                    <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-400 shadow"></div>
                  </div>
                  <p className="text-sm font-medium text-slate-500">Trusted by <span className="font-bold text-forest-green">50+ Mega Projects</span> in KSA</p>
                </div>
              </div>

              {/* Hero image with float */}
              <div className="ag-perspective relative">
                <div
                  ref={heroImageRef}
                  className="ag-float aspect-square w-full rounded-2xl bg-slate-100 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center shadow-2xl shadow-slate-300/40"
                >
                  {/* Floating badge */}
                  <div
                    ref={heroBadgeRef}
                    className="ag-float absolute -bottom-6 -left-6 rounded-2xl ag-glass-light p-6 shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sun-yellow text-forest-green shadow-md shadow-sun-yellow/30">
                        <span className="material-symbols-outlined">engineering</span>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-forest-green leading-none">1,500+</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Skilled Labor Pool</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Compliance Strip ──────────────────────────────────── */}
        <section className="bg-forest-green px-6 py-12 text-white lg:px-12" id="compliance">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: 'fingerprint', label: 'National Number', value: '7052722159' },
                { icon: 'receipt_long', label: 'VAT Number', value: '314438879500003' },
                { icon: 'location_on', label: 'Headquarters', value: 'Jeddah, Saudi Arabia' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="ag-float flex items-center gap-4 rounded-2xl ag-glass border-white/10 p-6 cursor-default transition-shadow duration-300"
                  onMouseEnter={onCard3DEnter}
                  onMouseLeave={onCard3DLeave}
                >
                  <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary/80">{item.label}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats Bar ─────────────────────────────────────────── */}
        <section className="bg-white py-16 px-6 lg:px-12 border-b border-slate-100">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <AnimatedStat value={2500} suffix="+" label="Skilled Workers" accentColor="bg-primary" />
              <AnimatedStat value={50} suffix="+" label="Mega Projects" accentColor="bg-sun-yellow" />
              <AnimatedStat value={100} suffix="%" label="Ajeer Compliant" accentColor="bg-primary" />
            </div>
          </div>
        </section>

        {/* ── Values ────────────────────────────────────────────── */}
        <section className="px-6 py-24 lg:px-12 bg-forest-green text-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {[
                { icon: 'verified_user', color: 'text-sun-yellow', title: 'Uncompromising Quality', body: "We don't just provide labor; we provide expertise that meets international engineering standards." },
                { icon: 'health_and_safety', color: 'text-primary', title: 'Safety First Culture', body: 'Every worker is trained to prioritize site safety, resulting in a zero-incident track record.' },
                { icon: 'handshake', color: 'text-sun-yellow', title: 'Absolute Integrity', body: 'Transparent billing, legal compliance, and ethical labor practices are our foundations.' },
              ].map((card) => (
                <div
                  key={card.title}
                  className="ag-values-card ag-float p-8 rounded-2xl ag-glass cursor-default transition-shadow duration-300"
                  onMouseEnter={onCard3DEnter}
                  onMouseLeave={onCard3DLeave}
                >
                  <span className={`material-symbols-outlined ${card.color} text-4xl mb-6 block`}>{card.icon}</span>
                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Us ────────────────────────────────────────────── */}
        <section className="px-6 py-24 lg:px-12 bg-white" id="why-us">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black text-forest-green lg:text-5xl">Why Leading Developers Choose Us</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">Industry-standard compliance paired with agile deployment capabilities.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: 'speed', title: '24h Deployment', body: 'Rapid mobilization of pre-vetted crews for urgent project demands.' },
                { icon: 'policy', title: 'Vision 2030 Aligned', body: "Strict adherence to Saudi Arabia's long-term localization and growth goals." },
                { icon: 'fact_check', title: 'Ajeer-Ready', body: 'Fully compliant with Ajeer and Qiwa systems for legal workforce sharing.' },
                { icon: 'shield_check', title: 'Rigorous Vetting', body: 'Every worker undergoes technical assessment and safety background checks.' },
              ].map((card) => (
                <div key={card.title} className="ag-whyus-card flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 hover:-translate-y-2 transition-all duration-300 cursor-default">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary">
                    <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-forest-green">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ──────────────────────────────────────────── */}
        <section className="px-6 py-24 lg:px-12 bg-background-light" id="services">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black text-forest-green lg:text-5xl">Certified Workforce Solutions</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">Specialized skilled labor across multiple construction and engineering domains, rigorously vetted for excellence.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: 'foundation', title: 'Civil & Construction', body: 'Masons, Carpenters, Steel Fixers, and Concrete specialists for infrastructure projects.' },
                { icon: 'bolt', title: 'Electrical & Power', body: 'Industrial Electricians, Cable Jointers, and High Voltage specialists.' },
                { icon: 'plumbing', title: 'Plumbing & HVAC', body: 'Certified plumbers, Pipefitters, and HVAC maintenance technicians.' },
                { icon: 'settings_suggest', title: 'Mechanical', body: 'Millwrights, Riggers, and Mechanical fitters for heavy industry setup.' },
                { icon: 'precision_manufacturing', title: 'Welding & Fabrication', body: '6G Welders, Argon Welders, and Structural Fabricators.' },
                { icon: 'construction', title: 'Heavy Equipment', body: 'Licensed Crane Operators, Excavator Drivers, and Logistics personnel.' },
              ].map((card) => (
                <div
                  key={card.title}
                  className="ag-service-card group relative overflow-hidden rounded-2xl bg-white p-8 border border-slate-100 cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(6,78,59,0.10)]"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-[360deg]">
                    <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-forest-green">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Project Gallery ───────────────────────────────────── */}
        <section className="px-6 py-24 lg:px-12 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <h2 className="text-3xl font-black text-forest-green lg:text-5xl">Project Presence</h2>
              <p className="mt-4 text-slate-600">Glimpse of our workforce active across major construction sites in Jeddah and beyond.</p>
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {[
                { src: civilWorker, alt: 'Civil Construction' },
                { src: mechanicalEngineer, alt: 'Mechanical Engineering' },
                { src: electricalWorks, alt: 'Electrical Installation' },
                { src: welders, alt: 'Precision Welding' },
                { src: hvacWorkers, alt: 'HVAC Installation' },
                { src: plumbingPiping, alt: 'Plumbing & Piping' },
                { src: forkLiftOperator, alt: 'Heavy Equipment Operation' },
                { src: metalFactory, alt: 'Industrial Metal Fabrication' },
                { src: craneOperator, alt: 'Crane Operator on Site' },
              ].map((img) => (
                <div key={img.alt} className="break-inside-avoid overflow-hidden rounded-2xl">
                  <img
                    alt={img.alt}
                    className="ag-gallery-img w-full rounded-2xl shadow-lg hover:brightness-105 transition-[filter] duration-500"
                    src={img.src}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────── */}
        <section className="px-6 py-24 lg:px-12 bg-white" id="process">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black text-forest-green lg:text-5xl">Our Seamless Process</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">From initial inquiry to boots on the ground in three simple steps.</p>
            </div>
            <div className="relative flex flex-col gap-12 lg:flex-row lg:justify-between">
              <div
                ref={processLineRef}
                className="process-line absolute left-8 top-0 hidden h-px w-full bg-gradient-to-r from-primary/40 via-forest-green/30 to-primary/40 lg:block lg:top-12"
              />
              {[
                { n: '1', title: 'Request', body: 'Submit your workforce requirements via our portal or WhatsApp.' },
                { n: '2', title: 'Match', body: 'Our system matches your needs with our pre-vetted talent pool.' },
                { n: '3', title: 'Deploy', body: 'Teams are mobilized with full compliance documentation within 24-48h.' },
              ].map((step) => (
                <div key={step.n} className="relative z-10 flex flex-1 flex-col items-center text-center">
                  <div className="ag-step-circle mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-forest-green text-primary font-black shadow-lg shadow-forest-green/30">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-bold text-forest-green">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 max-w-[200px]">{step.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 flex justify-center">
              <a className="rounded-full bg-forest-green px-10 py-4 text-center font-bold text-white shadow-xl shadow-forest-green/20 hover:scale-105 hover:shadow-forest-green/40 transition-all duration-300 flex items-center gap-2" href="#request">
                Talk to an Expert
                <span className="material-symbols-outlined">support_agent</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────── */}
        <section className="px-6 py-24 lg:px-12 bg-background-light" id="testimonials">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black text-forest-green lg:text-5xl">Project Outcomes</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">What site managers and project directors say about our workforce.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="ag-testi-left rounded-3xl bg-white p-10 shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="mb-6 flex text-sun-yellow">
                  {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined fill-1">star</span>)}
                </div>
                <p className="text-lg font-medium italic text-slate-700 leading-relaxed">"Shams Modern provided a crew of 40 certified welders for our NEOM phase in record time. Their compliance with Ajeer was flawless, saving us weeks of administrative work."</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 shadow"></div>
                  <div>
                    <p className="font-bold text-forest-green">Ahmed Al-Rashidi</p>
                    <p className="text-xs font-bold text-slate-400 uppercase">Project Director, Infrastructure KSA</p>
                  </div>
                </div>
              </div>
              <div className="ag-testi-right rounded-3xl bg-white p-10 shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="mb-6 flex text-sun-yellow">
                  {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined fill-1">star</span>)}
                </div>
                <p className="text-lg font-medium italic text-slate-700 leading-relaxed">"Reliability is key in construction. The mechanical team from Shams demonstrated high technical proficiency and, most importantly, zero safety incidents during the 12-month contract."</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 shadow"></div>
                  <div>
                    <p className="font-bold text-forest-green">M. Sudirman</p>
                    <p className="text-xs font-bold text-slate-400 uppercase">Site Manager, Industrial Division</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Partners Marquee ──────────────────────────────────── */}
        <section className="border-y border-slate-200 bg-white py-16 overflow-hidden" id="partners">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Strategic Partners &amp; Clients</p>
          </div>
          <div className="relative flex overflow-x-hidden group">
            <div className="py-4 animate-marquee whitespace-nowrap flex items-center gap-16 min-w-full">
              {['Sejong', 'Nesma Havatek', 'Saudi Building System', 'Doosan', 'Binladin', 'Aramco', 'Neom'].map(name => (
                <span key={name} className="text-2xl font-black text-slate-300 uppercase hover:text-slate-400 transition-colors duration-300 cursor-default">{name}</span>
              ))}
            </div>
            <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex items-center gap-16 min-w-full">
              {['Sejong', 'Nesma Havatek', 'Saudi Building System', 'Doosan', 'Binladin', 'Aramco', 'Neom'].map(name => (
                <span key={name} className="text-2xl font-black text-slate-300 uppercase hover:text-slate-400 transition-colors duration-300 cursor-default">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="px-6 py-24 lg:px-12 bg-white" id="faq">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black text-forest-green lg:text-5xl">Frequently Asked Questions</h2>
              <p className="mt-4 text-slate-600">Quick answers to common inquiries regarding our manpower services.</p>
            </div>
            <div className="space-y-4">
              <FaqItem question="What are your safety standards?" answer="All personnel are certified with OSHA/KSA safety standards and undergo mandatory safety induction before site entry." />
              <FaqItem question="How fast can you mobilize a crew?" answer="Small crews (under 10) can be deployed within 24 hours. Larger groups usually require 48-72 hours for full logistic and compliance setup." />
              <FaqItem question="How does the billing and payroll work?" answer="We handle all payroll, insurance, and tax (VAT) compliance. Clients are billed on a monthly cycle based on verified site attendance sheets." />
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm text-slate-500 mb-6">Still have questions?</p>
              <a className="inline-flex items-center gap-2 rounded-xl border-2 border-forest-green px-8 py-3 font-bold text-forest-green hover:bg-forest-green hover:text-white hover:scale-105 transition-all duration-300" href="#request">
                Request a Quote
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Request Form ──────────────────────────────────────── */}
        <section className="bg-white px-6 py-24 lg:px-12" id="request">
          <div ref={ctaWrapperRef} className="ag-perspective mx-auto max-w-4xl">
            <div ref={ctaCardRef} className="ag-float rounded-[2.5rem] bg-forest-green p-8 text-white lg:p-16 shadow-2xl shadow-forest-green/20 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-48 w-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 h-48 w-48 bg-sun-yellow/5 rounded-full blur-3xl pointer-events-none" />
              <div className="mb-12 text-center relative">
                <h2 className="text-3xl font-black lg:text-5xl">Request Manpower</h2>
                <p className="mt-4 text-primary/80">Get a professional quote within 24 hours</p>
              </div>
              <form className="space-y-8 relative">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="project-type" className="text-xs font-bold uppercase tracking-widest text-primary">Project Type</label>
                    <select id="project-type" className="w-full rounded-xl border-none bg-white/10 p-4 text-white focus:ring-2 focus:ring-primary transition-all duration-300 outline-none">
                      <option className="text-slate-900">Commercial Construction</option>
                      <option className="text-slate-900">Industrial / Oil &amp; Gas</option>
                      <option className="text-slate-900">Infrastructure</option>
                      <option className="text-slate-900">Residential</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="manpower-category" className="text-xs font-bold uppercase tracking-widest text-primary">Manpower Category</label>
                    <select id="manpower-category" className="w-full rounded-xl border-none bg-white/10 p-4 text-white focus:ring-2 focus:ring-primary transition-all duration-300 outline-none">
                      <option className="text-slate-900">Civil Workers</option>
                      <option className="text-slate-900">Electrical Team</option>
                      <option className="text-slate-900">Mechanical/Welding</option>
                      <option className="text-slate-900">Mixed Crew</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="est-duration" className="text-xs font-bold uppercase tracking-widest text-primary">Est. Duration</label>
                    <select id="est-duration" className="w-full rounded-xl border-none bg-white/10 p-4 text-white focus:ring-2 focus:ring-primary transition-all duration-300 outline-none">
                      <option className="text-slate-900">Less than 3 months</option>
                      <option className="text-slate-900">3-12 months</option>
                      <option className="text-slate-900">Yearly Contract</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="workers-needed" className="text-xs font-bold uppercase tracking-widest text-primary">Total Workers Needed</label>
                    <input id="workers-needed" className="w-full rounded-xl border-none bg-white/10 p-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary transition-all duration-300 outline-none" placeholder="e.g. 50" type="number" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="project-location" className="text-xs font-bold uppercase tracking-widest text-primary">Project Location</label>
                    <input id="project-location" className="w-full rounded-xl border-none bg-white/10 p-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-primary transition-all duration-300 outline-none" placeholder="e.g. NEOM, Jeddah, Riyadh" type="text" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button className="flex-1 rounded-xl bg-primary px-8 py-5 text-lg font-black text-forest-green hover:brightness-110 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/30" type="submit">
                    Submit Request
                    <span className="material-symbols-outlined">send</span>
                  </button>
                  <a 
                    className="rounded-xl bg-white/10 px-8 py-5 text-center font-bold hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 border border-white/10" 
                    href="https://wa.me/966500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined text-sun-yellow">chat</span>
                    WhatsApp Now
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="ag-footer relative bg-forest-green text-white px-6 py-20 lg:px-12 overflow-hidden border-t-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl pt-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-24 relative z-10">
            <div className="md:col-span-5 flex flex-col items-start">
              <img src="/SMC_logo.png" alt="SMC Logo" className="h-16 w-auto object-contain mb-10 filter brightness-0 invert opacity-90" />
              <h2 className="text-4xl lg:text-5xl font-['Sansation'] font-bold leading-tight uppercase tracking-tight text-white/90">
                Build With<br/><span className="text-primary">Precision.</span>
              </h2>
            </div>
            
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 pt-4">
              <div className="flex flex-col">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Reach Us</h4>
                <a className="block text-xl font-medium text-white/80 hover:text-white transition-colors duration-300" href="mailto:info@shamsmodern.com">info@shamsmodern.com</a>
                <a className="block text-xl font-medium text-white/80 hover:text-white transition-colors duration-300 mt-2" href="tel:+966503677947">+966 503677947</a>
              </div>
              
              <div className="flex flex-col">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Headquarters</h4>
                <p className="text-base text-white/60 leading-relaxed max-w-xs">
                  Building 3242, Salamah Ibn Zuhair,<br />
                  7908 Al Bawadi, Jeddah 23443,<br />
                  KSA
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end border-t border-white/10 pt-8 pb-4 relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 md:mb-0">
                <span className="font-['Sansation'] text-sm text-white/70">Shams Modern</span> Contracting
            </span>
            <p className="text-[11px] font-medium tracking-wide text-white/40">© 2026 Shams Modern Contracting LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
