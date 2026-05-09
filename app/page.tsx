'use client';

import { portfolioData } from './data';

import { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, ArrowDown, Play } from 'lucide-react';
import { useSmoothScroll, gsap, ScrollTrigger } from '../scroll/useSmoothScroll';



export default function Page() {
    const d = portfolioData;
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    useSmoothScroll({ lerp: 0.08, duration: 1.4 });

    useEffect(() => {
        // Delay so Lenis (from useSmoothScroll) is fully initialised
        // before ScrollTrigger binds — prevents race condition on scrub/pin
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                // Hero parallax + fade
                if (heroRef.current && heroTextRef.current) {
                    gsap.to(heroTextRef.current, {
                        y: 200,
                        opacity: 0,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: true,
                        }
                    });
                }

                // About section reveal
                if (aboutRef.current) {
                    const aboutElements = aboutRef.current.querySelectorAll('.reveal-up');
                    if (aboutElements.length > 0) {
                        gsap.fromTo(aboutElements,
                            { y: 120, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
                            {
                                y: 0, opacity: 1,
                                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                stagger: 0.15,
                                duration: 1.4,
                                ease: 'expo.out',
                                scrollTrigger: {
                                    trigger: aboutRef.current,
                                    start: 'top 75%',
                                    toggleActions: 'play none none reverse',
                                }
                            }
                        );
                    }
                }

                // Skills: staggered entry
                if (skillsRef.current) {
                    const skillItems = skillsRef.current.querySelectorAll('.skill-item');
                    if (skillItems.length > 0) {
                        skillItems.forEach((item, i) => {
                            gsap.fromTo(item,
                                { x: -60, opacity: 0 },
                                {
                                    x: 0, opacity: 1,
                                    duration: 0.8,
                                    delay: i * 0.06,
                                    ease: 'power3.out',
                                    scrollTrigger: {
                                        trigger: skillsRef.current,
                                        start: 'top 70%',
                                        toggleActions: 'play none none reverse',
                                    }
                                }
                            );
                        });
                    }
                }

                // Projects: pinned horizontal scroll
                if (projectsRef.current) {
                    const projectCards = projectsRef.current.querySelector('.projects-track');
                    if (projectCards) {
                        const totalWidth = (projectCards as HTMLElement).scrollWidth - window.innerWidth;
                        gsap.to(projectCards, {
                            x: -totalWidth,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: projectsRef.current,
                                start: 'top top',
                                end: () => `+=${totalWidth}`,
                                scrub: 1,
                                pin: true,
                                anticipatePin: 1,
                            }
                        });
                    }
                }

                // Experience: staggered timeline entries
                if (experienceRef.current) {
                    const entries = experienceRef.current.querySelectorAll('.exp-entry');
                    if (entries.length > 0) {
                        entries.forEach((entry) => {
                            gsap.fromTo(entry,
                                { y: 80, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
                                {
                                    y: 0, opacity: 1,
                                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                    duration: 1.4,
                                    ease: 'expo.out',
                                    scrollTrigger: {
                                        trigger: entry,
                                        start: 'top 85%',
                                        toggleActions: 'play none none reverse',
                                    }
                                }
                            );
                        });
                    }
                }

                // Contact: scale up on entry
                if (contactRef.current) {
                    const contactInner = contactRef.current.querySelector('.contact-inner');
                    if (contactInner) {
                        gsap.fromTo(contactInner,
                            { scale: 0.9, opacity: 0 },
                            {
                                scale: 1, opacity: 1,
                                duration: 1.2,
                                ease: 'expo.out',
                                scrollTrigger: {
                                    trigger: contactRef.current,
                                    start: 'top 70%',
                                    toggleActions: 'play none none reverse',
                                }
                            }
                        );
                    }
                }

                // Refresh ScrollTrigger after all animations are set up
                ScrollTrigger.refresh();

            }, containerRef);

            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={containerRef} className="bg-[#050505] text-[#fefefe]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

                .syne { font-family: 'Syne', sans-serif; }

                .film-grain {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 100;
                    opacity: 0.08;
                    mix-blend-mode: overlay;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.7'/%3E%3C/svg%3E");
                    background-size: 150px;
                }

                .cinematic-gradient {
                    background: linear-gradient(180deg, 
                        rgba(0,0,0,0) 0%, 
                        rgba(0,0,0,0.8) 100%
                    );
                }

                .text-glow {
                    text-shadow: 0 0 40px rgba(255,255,255,0.15);
                }
            `}} />

            {/* Film Grain Overlay */}
            <div className="film-grain" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-5 mix-blend-difference">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="text-sm font-bold tracking-[0.3em] uppercase">{d.name?.split(' ')[0] || 'Portfolio'}</span>
                    <div className="hidden md:flex gap-10 text-xs tracking-[0.2em] uppercase font-medium">
                        {['Aboutme', 'Skills', 'Work', 'Contact'].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-50 transition-opacity duration-500">{item}</a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <section ref={heroRef} className="relative h-[100vh] flex items-center justify-center overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(circle 80vw at 50% 50%, rgba(15,15,20,1) 0%, rgba(5,5,5,1) 100%)'
                }} />

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden mix-blend-screen">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-[1px] h-[1px] rounded-full bg-white/30"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float-particle ${8 + Math.random() * 12}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                                filter: 'blur(0.5px)',
                            }}
                        />
                    ))}
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes float-particle {
                        0% { transform: translateY(0) translateX(0); opacity: 0; }
                        20% { opacity: 1; }
                        80% { opacity: 1; }
                        100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
                    }
                `}} />

                <div ref={heroTextRef} className="relative z-10 text-center px-6 max-w-6xl w-full">
                    <div className="overflow-hidden mb-8">
                        <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-white/50 font-medium syne">{d.role}</p>
                    </div>
                    <h1 className="text-glow" style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        fontWeight: 400,
                        lineHeight: 0.9,
                        letterSpacing: '-0.03em',
                    }}>
                        {d.name}
                    </h1>
                    <p className="mt-8 text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        {d.bio}
                    </p>
                    <div className="mt-12 flex items-center justify-center gap-6">
                        <a href="#aboutme" className="group flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-500">
                            <span>Explore</span>
                            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-40 cinematic-gradient" />
            </section>

            {/* ===== ABOUT / STORY ===== */}
            <section id="aboutme" ref={aboutRef} className="relative py-40 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal-up mb-16">
                        <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-6">About Me</p>
                        <div className="w-12 h-[1px] bg-white/20" />
                    </div>
                    <div className="reveal-up">
                        <p className="text-2xl md:text-4xl font-light leading-relaxed text-white/80" style={{ fontFamily: "'Playfair Display', serif" }}>
                            I am an aspiring Machine Learning Engineer with hands-on experience
                            in building end-to-end ML systems. I focus on enhancing accuracy and
                            optimizing performance while handling large-scale datasets. I am adept
                            at utilizing modern tools and frameworks to deploy ML-powered
                            solutions effectively
                        </p>
                    </div>
                    
                </div>
            </section>

            {/* ===== SKILLS / CRAFT ===== */}
            <section id="craft" ref={skillsRef} className="relative py-40 px-6">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-6">Skills</p>
                    <div className="w-12 h-[1px] bg-white/20 mb-16" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {d.skills.map((skill, i) => (
                            <div key={skill} className="skill-item group flex items-center gap-6 py-5 border-b border-white/5 hover:border-white/20 transition-colors duration-500">
                                <span className="text-xs text-white/20 font-mono w-8">{String(i + 1).padStart(2, '0')}</span>
                                <span className="text-xl md:text-2xl font-light text-white/70 group-hover:text-white transition-colors duration-500">{skill}</span>
                                <div className="flex-1" />
                                <div className="w-24 h-[2px] bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-white/40 rounded-full" style={{ width: `${75 + Math.random() * 25}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROJECTS / WORK - Horizontal Scroll ===== */}
            <section id="work" ref={projectsRef} className="relative h-screen overflow-hidden">
                <div className="projects-track flex items-center h-full gap-8 pl-[10vw] pr-[30vw]">
                    {/* Section title card */}
                    <div className="flex-shrink-0 w-[40vw] md:w-[30vw] flex flex-col justify-center">
                        <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-6">Selected Work</p>
                        <h2 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Projects
                        </h2>
                        <p className="text-white/40 text-lg">Scroll to explore →</p>
                    </div>

                    {/* Project cards */}
                    {d.projects.map((project, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 w-[80vw] md:w-[45vw] h-[70vh] rounded-2xl overflow-hidden relative group ${project.url || project.github ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                                const url = project.url || project.github;
                                if (url) window.open(url, '_blank', 'noopener,noreferrer');
                            }}
                            style={{
                                background: [
                                    'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                                    'linear-gradient(135deg, #0f0f23 0%, #1a0a2e 100%)',
                                    'linear-gradient(135deg, #1a0a0a 0%, #2e1616 100%)',
                                    'linear-gradient(135deg, #0a1a1a 0%, #0a2e2e 100%)',
                                ][i % 4]
                            }}
                        >
                            {/* Project number */}
                            <div className="absolute top-8 left-8 text-[8rem] font-black text-white/[0.03] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {String(i + 1).padStart(2, '0')}
                            </div>

                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies?.map(tech => (
                                        <span key={tech} className="px-3 py-1 text-[10px] tracking-[0.15em] uppercase bg-white/5 border border-white/10 rounded-full text-white/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-3 group-hover:translate-x-2 transition-transform duration-500">{project.name}</h3>
                                <p className="text-white/40 text-lg max-w-md">{project.description}</p>
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== EXPERIENCE ===== */}
            <section ref={experienceRef} className="relative py-40 px-6">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-6">Experience</p>
                    <div className="w-12 h-[1px] bg-white/20 mb-16" />

                    <div className="space-y-16">
                        {d.experience.map((exp, i) => (
                            <div key={i} className="exp-entry group">
                                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold mb-1">{exp.position}</h3>
                                        <p className="text-white/40 text-lg">{exp.company}</p>
                                    </div>
                                    <span className="text-xs tracking-[0.2em] uppercase text-white/20 border border-white/10 px-4 py-2 rounded-full">
                                        {exp.startDate} — {exp.endDate}
                                    </span>
                                </div>
                                <p className="text-white/50 text-lg leading-relaxed mb-6">{exp.description}</p>
                                {exp.highlights && exp.highlights.length > 0 && (
                                    <div className="flex flex-wrap gap-3">
                                        {exp.highlights.map((h, j) => (
                                            <span key={j} className="text-sm text-white/30 bg-white/[0.03] px-4 py-2 rounded-lg">
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-8 h-[1px] bg-white/5" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== EDUCATION ===== */}
            <section className="relative py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-6">Education</p>
                    <div className="w-12 h-[1px] bg-white/20 mb-16" />
                    <div className="grid md:grid-cols-2 gap-8">
                        {d.education.map((edu, i) => (
                            <div key={i} className="border border-white/5 rounded-xl p-8 hover:border-white/15 transition-colors duration-500">
                                <h3 className="text-xl font-bold mb-1">{edu.degree} in {edu.field}</h3>
                                <p className="text-white/40 mb-2">{edu.school}</p>
                                <p className="text-xs text-white/20 tracking-widest">{edu.startDate} — {edu.endDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CONTACT ===== */}
            <section id="contact" ref={contactRef} className="relative py-40 px-6">
                <div className="contact-inner max-w-3xl mx-auto text-center">
                    <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-8">Contact Me</p>
                    
                    <p className="text-white/40 text-lg mb-12 max-w-md mx-auto">
                        I’m actively looking for Machine Learning / Data Scientist opportunities. Feel free to reach out for collaborations, projects, or full-time roles.
                    </p>
                    <div className="flex justify-center gap-6">
                        <a href={`mailto:${d.email}`} className="group flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-500">
                            <Mail className="w-5 h-5" />
                            <span className="text-sm tracking-[0.1em] uppercase font-medium">Email</span>
                        </a>
                        {d.links.github && (
                            <a href={d.links.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-500">
                                <Github className="w-5 h-5" />
                                <span className="text-sm tracking-[0.1em] uppercase font-medium">GitHub</span>
                            </a>
                        )}
                        {d.links.linkedin && (
                            <a href={d.links.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-500">
                                <Linkedin className="w-5 h-5" />
                                <span className="text-sm tracking-[0.1em] uppercase font-medium">LinkedIn</span>
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
           
        </div>
    );

}
