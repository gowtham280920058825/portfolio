import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { navigationLinks, personalInfo } from '../data/portfolioData';
import { EASE_LUXURY } from './motionPresets';

export function Navbar({ activeSection, theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1120) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE_LUXURY }}
    >
      <div className="container navbar-inner">
        <motion.a
          href="#home"
          className="navbar-brand"
          aria-label="Gowtham C Home"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="brand-mark" aria-hidden="true">
            {personalInfo.initials}
          </span>
          <span className="brand-text">
            GOWTHAM <span className="brand-dot">C</span>
          </span>
        </motion.a>

        <nav className="navbar-links" aria-label="Primary navigation">
          {navigationLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="nav-link-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="nav-link-label">{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <motion.button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -65, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 65, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-flex' }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.a
            href={personalInfo.resumePath}
            download={personalInfo.resumeFileName}
            className="btn btn-primary navbar-resume-btn btn-sheen"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={15} />
            <span>Resume</span>
          </motion.a>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: EASE_LUXURY }}
          >
            <nav className="container mobile-drawer-nav" aria-label="Mobile navigation">
              {navigationLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.22 }}
                    className={`mobile-nav-link ${isActive ? 'mobile-nav-link--active' : ''}`}
                  >
                    <span>{link.label}</span>
                  </motion.a>
                );
              })}
              <a
                href={personalInfo.resumePath}
                download={personalInfo.resumeFileName}
                onClick={handleLinkClick}
                className="btn btn-primary mobile-resume-cta"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
