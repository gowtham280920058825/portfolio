import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Linkedin, MapPin, Sparkles } from 'lucide-react';
import profileImage from '../assets/profile.webp';
import { personalInfo } from '../data/portfolioData';
import { EASE_LUXURY, heroItem, heroStagger } from '../components/motionPresets';
import { AnimatedName } from '../components/AnimatedText';
import { MagneticButton } from '../components/MagneticButton';

export function HeroSection() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const visualParallaxY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, -14]);

  return (
    <section id="home" ref={heroRef} className="section hero-section">
      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          style={prefersReducedMotion ? undefined : { y: textParallaxY }}
        >
          <motion.div variants={heroItem} className="hero-status-pill">
            <span className="status-dot" aria-hidden="true" />
            <span>{personalInfo.experienceLevel} · Open to Software & Frontend Roles</span>
          </motion.div>

          <motion.p variants={heroItem} className="hero-kicker">
            <Sparkles size={15} className="hero-kicker-icon" />
            <span>{personalInfo.role}</span>
          </motion.p>

          <h1 className="hero-title">
            <AnimatedName text={personalInfo.displayName} className="hero-title-name" />
          </h1>

          <motion.p variants={heroItem} className="hero-subtitle">
            {personalInfo.targetRoles} · {personalInfo.degree} Student at{' '}
            <span className="hero-highlight">{personalInfo.institution}</span>
          </motion.p>

          <motion.p variants={heroItem} className="hero-description">
            {personalInfo.objective}
          </motion.p>

          <motion.div variants={heroItem} className="hero-cta-group">
            <MagneticButton>
              <a href="#projects" className="btn btn-primary btn-sheen">
                <span>View Projects</span>
                <ArrowRight size={17} />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={personalInfo.resumePath}
                download={personalInfo.resumeFileName}
                className="btn btn-secondary btn-sheen"
              >
                <Download size={17} />
                <span>Download Resume</span>
              </a>
            </MagneticButton>

            <MagneticButton strength={0.16}>
              <a href="#contact" className="btn btn-ghost">
                <Mail size={17} />
                <span>Contact Me</span>
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div variants={heroItem} className="hero-meta-row">
            <div className="hero-socials">
              <motion.a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="social-chip"
                aria-label="GitHub profile"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Github size={16} />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="social-chip"
                aria-label="LinkedIn profile"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </motion.a>
            </div>
            <span className="hero-location">
              <MapPin size={15} />
              <span>{personalInfo.shortLocation}</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          style={prefersReducedMotion ? undefined : { y: visualParallaxY }}
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.78, delay: 0.16, ease: EASE_LUXURY }}
        >
          <div className="portrait-frame editorial-card card-glow-border">
            <div className="portrait-glow" aria-hidden="true" />

            <div className="portrait-orbit-wrap">
              <motion.div
                className="portrait-halo-ring"
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="portrait-ring"
                initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                animate={{ clipPath: 'circle(75% at 50% 50%)' }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE_LUXURY }}
              >
                <motion.img
                  src={profileImage}
                  alt="Gowtham C portrait"
                  className="portrait-image"
                  loading="eager"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
                  transition={{ duration: 0.45, ease: EASE_LUXURY }}
                />
              </motion.div>
            </div>

            <div className="portrait-caption">
              <div>
                <p className="portrait-caption-label">Academic Focus</p>
                <p className="portrait-caption-value">{personalInfo.degree}</p>
              </div>
              <div className="portrait-badge">CGPA 7.65</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
