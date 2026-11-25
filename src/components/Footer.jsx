import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { navigationLinks, personalInfo } from '../data/portfolioData';
import { fadeUp, viewportConfig } from './motionPresets';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-block">
            <a href="#home" className="navbar-brand">
              <span className="brand-mark" aria-hidden="true">
                {personalInfo.initials}
              </span>
              <span className="brand-text">
                GOWTHAM <span className="brand-dot">C</span>
              </span>
            </a>
            <p className="footer-tagline">
              {personalInfo.role} · {personalInfo.degree} at {personalInfo.institution}.
            </p>
          </div>

          <div className="footer-nav-group">
            <p className="footer-group-title">Sections</p>
            <div className="footer-links-grid">
              {navigationLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="footer-link footer-link-animated">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-social-group">
            <p className="footer-group-title">Connect</p>
            <div className="footer-socials">
              <motion.a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="GitHub Profile"
                title="GitHub"
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="footer-social-btn"
                aria-label="Send Email"
                title={personalInfo.email}
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <Mail size={18} />
              </motion.a>
              <motion.a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noreferrer"
                className="footer-resume-link"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Resume PDF</span>
                <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {currentYear} {personalInfo.name}. Built with React, Vite & Framer Motion.
          </p>
          <p className="footer-location">{personalInfo.shortLocation}</p>
        </div>
      </div>
    </motion.footer>
  );
}
