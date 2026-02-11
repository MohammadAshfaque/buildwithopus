import { motion } from 'framer-motion'
import './index.css'

function App() {
    return (
        <div className="app">
            <nav className="navbar">
                <a href="#" className="logo">buildwithopus</a>
                <a href="#" className="btn-nav">Book Intro Call</a>
            </nav>

            <section className="hero">
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <span className="hero-line">Modern Design.</span>
                    <span className="hero-line hero-gradient">Creative Development</span>
                </motion.h1>

                <motion.p
                    className="hero-sub"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    A quality-obsessed design and development partner that moves fast and actually gets things shipped.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <a href="#" className="btn-primary">Start a Project</a>
                    <a href="#" className="btn-secondary">View Work →</a>
                </motion.div>
            </section>
        </div>
    )
}

export default App
