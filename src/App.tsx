import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Code2, Rocket, Zap, Menu, ArrowRight, X, Plus } from 'lucide-react'
import './index.css'

/* ===================================
   Components & Icons
   =================================== */
const SimplePlus = () => (
    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="8" strokeLinecap="round">
        <path d="M50 20 L50 80 M20 50 L80 50" />
    </svg>
)

const CircularText = ({ text }: { text: string }) => {
    return (
        <div className="stamp-circle spin-slow">
            <svg viewBox="0 0 100 100" width="120" height="120">
                <defs><path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" /></defs>
                <text fontSize="11" fontWeight="800" letterSpacing="4.5" fill="black">
                    <textPath xlinkHref="#circle">{text}</textPath>
                </text>
            </svg>
            <div className="stamp-inner">
                <SimplePlus />
            </div>
        </div>
    )
}

// Animated Text Component using Framer Motion (most reliable)
const AnimatedTitle = ({ text, className }: { text: string, className?: string }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        }
    };

    const child = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", damping: 12, stiffness: 100 }
        }
    };

    return (
        <motion.h2
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {words.map((word, i) => (
                <motion.span key={i} variants={child} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                    {word}
                </motion.span>
            ))}
        </motion.h2>
    );
};

const AnimatedLabel = ({ text, className, style }: { text: string, className?: string, style?: React.CSSProperties }) => {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            whileInView={{ scale: 1, rotate: -2, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
            {text}
        </motion.div>
    );
};

function App() {
    const containerRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [showIsland, setShowIsland] = useState(true)
    const [islandExpanded, setIslandExpanded] = useState(false)

    // Mobile Check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 900)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Hide island when scrolling past hero section
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            // Hide island after scrolling 200px
            setShowIsland(scrollY < 200)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Auto-close island after 2.5 seconds when expanded
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        if (islandExpanded) {
            timer = setTimeout(() => {
                setIslandExpanded(false)
            }, 2500)
        }
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [islandExpanded])

    // Handle island click on mobile
    const handleIslandClick = () => {
        if (isMobile) {
            setIslandExpanded(prev => !prev)
        }
    }

    // Data
    const services = [
        { title: "SaaS Platforms", tag: "Complex Logic", color: "blue" },
        { title: "Mobile Apps", tag: "iOS & Android", color: "green" },
        { title: "Marketing Sites", tag: "High Conversion", color: "yellow" },
        { title: "Design Systems", tag: "Scalable UI", color: "purple" },
        { title: "Dashboards", tag: "Data Viz", color: "red" },
    ]

    const projects = [
        { title: "FinTech Dashboard", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" },
        { title: "Health App", img: "https://images.unsplash.com/photo-1576091160550-217358c7db81?auto=format&fit=crop&w=600&q=80" },
        { title: "E-Commerce", img: "https://images.unsplash.com/photo-1523206485973-27f975fa2804?auto=format&fit=crop&w=600&q=80" },
        { title: "SaaS CRM", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },
    ]

    const faqs = [
        { q: "How long does an MVP take?", a: "Typically 3-4 weeks. We focus on core features to get you to market fast." },
        { q: "Do you provide design?", a: "Yes! We are a design-first studio. We don't write code until the design is pixel-perfect." },
        { q: "What is your tech stack?", a: "We use React, Next.js, Node.js, and Supabase/PostgreSQL. Modern, scalable, and fast." },
        { q: "Do you offer maintenance?", a: "Yes, we have retainer packages for post-launch support and feature iteration." }
    ]

    // Framer Motion Variants
    const fadeInUp = {
        hidden: { y: 60, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariant = {
        hidden: { x: 100, y: 50, opacity: 0 },
        visible: { x: 0, y: 0, opacity: 1, transition: { type: "spring", damping: 15 } }
    };

    const projectVariant = (i: number) => ({
        hidden: { x: i % 2 === 0 ? -150 : 150, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    });

    return (
        <div className="app-container" ref={containerRef}>
            <div className="main-wrapper">

                {/* HERO */}
                <main className="section-panel section-hero" ref={heroRef}>
                    <div className="texture-overlay"></div>

                    {/* Dynamic Island Status Bar - Hides on scroll */}
                    <div className="island-wrapper">
                        <motion.div
                            className={`island-status ${islandExpanded ? 'expanded' : ''}`}
                            initial={{ y: -50, opacity: 0, scale: 0.8 }}
                            animate={{
                                y: showIsland ? 0 : -80,
                                opacity: showIsland ? 1 : 0,
                                scale: showIsland ? 1 : 0.8
                            }}
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            onClick={handleIslandClick}
                        >
                            <div className="island-main">
                                <span className="island-dot"></span>
                                <span className="island-text">Available for new projects</span>
                            </div>
                            <div className="island-expanded">
                                <span className="island-cta">Let's Talk →</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.nav
                        className="navbar"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <a href="#" className="logo">buildwithopus</a>
                        <div className="nav-links desktop-only" style={{ display: isMobile ? 'none' : 'flex' }}>
                            <a href="#work" className="nav-item">Work</a>
                            <a href="#services" className="nav-item">Services</a>
                            <a href="#pricing" className="nav-item">Pricing</a>
                        </div>
                        <button className="btn-nav desktop-only" style={{ display: isMobile ? 'none' : 'block' }}>Start a Project</button>
                        <button className="mobile-menu-btn" style={{ display: isMobile ? 'block' : 'none', background: 'none', border: 'none' }}><Menu size={24} /></button>
                    </motion.nav>

                    <div className="hero-content">
                        <motion.div
                            className="headline-wrapper"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <h1 className="headline">
                                <motion.div className="headline-row" variants={fadeInUp}>
                                    <span className="text-highlight-grey">We build</span>
                                    <span className="inline-media pill"><img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400&q=80" alt="app" /></span>
                                    <span className="text-rich-black">MVPs,</span>
                                </motion.div>
                                <motion.div className="headline-row" variants={fadeInUp}>
                                    <span className="inline-icon blue"><Code2 color="white" size={24} /></span>
                                    <span className="text-rich-black">websites</span>
                                    <span className="text-highlight-grey">&</span>
                                    <span className="inline-icon"><Rocket size={24} /></span>
                                </motion.div>
                                <motion.div className="headline-row" variants={fadeInUp}>
                                    <span className="text-highlight-grey">digital</span>
                                    <span className="inline-media circle"><img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=200&q=80" alt="team" /></span>
                                    <span className="text-rich-black">products</span>
                                </motion.div>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="subheadline"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Turn your startup idea into a production-ready product in 21 days.<br />Design-driven development for ambitious founders.
                        </motion.p>

                        <motion.div
                            className="input-group"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, type: "spring" }}
                        >
                            <input type="email" placeholder="Your email address" className="email-input" />
                            <button className="btn-send">Let's Talk</button>
                        </motion.div>

                        {/* Stickers */}
                        <div className="stickers-container">
                            <motion.div
                                className="sticker sticker-float info-card"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                            >
                                <div className="info-header">buildwithopus</div>
                                <div className="info-list">
                                    <div className="info-item"><CheckCircle size={18} className="check-icon" /><span>21-day MVP delivery</span></div>
                                    <div className="info-item"><CheckCircle size={18} className="check-icon" /><span>Fixed price scope</span></div>
                                    <div className="info-item"><CheckCircle size={18} className="check-icon" /><span>Design + Code</span></div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="sticker sticker-float pill-management pill-pos"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                            >
                                <span style={{ marginRight: '8px' }}>🚀</span> Shipped
                            </motion.div>

                            {!isMobile && (
                                <>
                                    <motion.div
                                        className="sticker stamp-pos"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 1.2, type: "spring" }}
                                    >
                                        <CircularText text="DESIGN & DEVELOPMENT • " />
                                    </motion.div>
                                    <motion.div
                                        className="sticker sticker-float zap-pos"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 1.4, type: "spring" }}
                                    >
                                        <Zap size={48} fill="#f1c40f" stroke="black" strokeWidth={3} />
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </div>
                </main>

                {/* SERVICES */}
                <section className="section-panel section-yellow" id="services">
                    <div className="texture-overlay"></div>

                    {/* ANIMATED LABEL */}
                    <AnimatedLabel text="What we build" className="section-label" />

                    {/* ANIMATED TITLE - Word by Word */}
                    <AnimatedTitle text="Everything you need to launch." className="section-title" />

                    <motion.div
                        className="grid-cards"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {services.map((s, i) => (
                            <motion.div key={i} className="card-item" variants={cardVariant}>
                                <div className="card-image"><div style={{ width: '100%', height: '100%', background: `linear-gradient(45deg, var(--accent-${s.color}), #eee)`, opacity: 0.5 }}></div></div>
                                <div className="card-tag">{s.tag}</div><h3 className="card-title">{s.title}</h3>
                                <div className="card-footer"><div className="card-pill"><ArrowRight size={14} /></div></div>
                            </motion.div>
                        ))}
                        <motion.div className="card-item" style={{ background: 'black', color: 'white' }} variants={cardVariant}>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}><h3 className="card-title" style={{ fontSize: '1.5rem' }}>View all</h3><ArrowRight size={32} color="white" /></div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* PORTFOLIO */}
                <section className="section-panel section-dark" id="work">
                    <div className="texture-overlay"></div>
                    <AnimatedLabel text="Selected Work" className="section-label dark" />
                    <AnimatedTitle text="Recent shipments." className="section-title" style={{ color: 'white' }} />
                    <div className="portfolio-grid">
                        {projects.map((p, i) => (
                            <motion.div
                                key={i}
                                className="project-card"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={projectVariant(i)}
                            >
                                <img src={p.img} className="project-img" alt={p.title} />
                                <div className="project-info">
                                    <h3 className="project-title">{p.title}</h3>
                                    <p>Design & Development</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* PROCESS */}
                <section className="section-panel section-green" id="process">
                    <div className="texture-overlay"></div>
                    <AnimatedLabel text="Process" className="section-label" style={{ background: 'white' }} />
                    <AnimatedTitle text="How we work together" className="section-title" />
                    <motion.div
                        className="process-circles"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        {["Discovery Workshop", "Design Sprint", "MVP Build", "Launch & Scale"].map((step, i) => (
                            <motion.div
                                key={i}
                                className={`process-circle ${i === 2 ? 'circle-black' : ''}`}
                                variants={{
                                    hidden: { x: -80, opacity: 0, rotateY: 90 },
                                    visible: { x: 0, opacity: 1, rotateY: 0, transition: { type: "spring", damping: 12 } }
                                }}
                            >
                                {step.split(" ").map((w, j) => <span key={j}>{w}<br /></span>)}
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* PRICING */}
                <section className="section-panel section-blue" id="pricing">
                    <div className="texture-overlay"></div>
                    <AnimatedLabel text="Pricing" className="section-label" style={{ background: 'white' }} />
                    <AnimatedTitle text="Simple, flat pricing." className="section-title" />
                    <motion.div
                        className="pricing-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        <motion.div className="pricing-card" variants={cardVariant}>
                            <div className="price-header"><h3 className="price-name">Design Sprint</h3><div className="price-cost">$2,499</div></div>
                            <ul className="price-list">
                                <li className="price-item"><CheckCircle size={16} /> UI/UX Design</li>
                                <li className="price-item"><CheckCircle size={16} /> Interactive Prototype</li>
                                <li className="price-item"><CheckCircle size={16} /> 1 Week Turnaround</li>
                            </ul>
                            <button className="btn-price" style={{ background: 'white' }}>Get Started</button>
                        </motion.div>
                        <motion.div className="pricing-card featured" variants={cardVariant}>
                            <div className="price-header"><h3 className="price-name">MVP Build</h3><div className="price-cost">$5k+</div></div>
                            <ul className="price-list">
                                <li className="price-item"><CheckCircle size={16} /> Full Design + Dev</li>
                                <li className="price-item"><CheckCircle size={16} /> Admin Dashboard</li>
                                <li className="price-item"><CheckCircle size={16} /> Production Ready</li>
                            </ul>
                            <button className="btn-price">Start Building</button>
                        </motion.div>
                        <motion.div className="pricing-card" variants={cardVariant}>
                            <div className="price-header"><h3 className="price-name">Retainer</h3><div className="price-cost">$499<span style={{ fontSize: '1rem', fontWeight: 400 }}>/mo</span></div></div>
                            <ul className="price-list">
                                <li className="price-item"><CheckCircle size={16} /> Maintenance</li>
                                <li className="price-item"><CheckCircle size={16} /> Small Updates</li>
                                <li className="price-item"><CheckCircle size={16} /> Server Monitoring</li>
                            </ul>
                            <button className="btn-price" style={{ background: 'white' }}>Subscribe</button>
                        </motion.div>
                    </motion.div>
                </section>

                {/* FAQ & FOOTER */}
                <section className="section-panel section-white">
                    <div className="texture-overlay"></div>
                    <AnimatedLabel text="FAQ" className="section-label" style={{ background: '#eee' }} />
                    <AnimatedTitle text="Common questions." className="section-title" />
                    <div className="faq-container">
                        {faqs.map((f, i) => (
                            <motion.div
                                className={`faq-item ${openFaq === i ? 'active' : ''}`}
                                key={i}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    {f.q}
                                    {openFaq === i ? <X size={20} /> : <Plus size={20} />}
                                </div>
                                <div className="faq-answer"><p>{f.a}</p></div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <footer className="footer">
                    <motion.div
                        className="footer-cta"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Let's build your idea.
                    </motion.div>
                    <div className="footer-links">
                        <a href="mailto:hello@buildwithopus.com">hello@buildwithopus.com</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                    </div>
                    <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>© {new Date().getFullYear()} buildwithopus studio.</p>
                </footer>

            </div>
        </div>
    )
}

export default App
