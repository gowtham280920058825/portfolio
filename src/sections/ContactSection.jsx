import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  ExternalLink,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SectionHeading } from '../components/SectionHeading';
import { MagneticButton } from '../components/MagneticButton';
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  viewportConfig,
} from '../components/motionPresets';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formNotice, setFormNotice] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleComposeMail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      formState.subject.trim() || `Portfolio Inquiry from ${formState.name.trim() || 'Recruiter'}`
    );
    const bodyText = [
      `Name: ${formState.name.trim()}`,
      `Email: ${formState.email.trim()}`,
      '',
      formState.message.trim(),
    ].join('\n');
    const body = encodeURIComponent(bodyText);

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setFormNotice('Opening your default email client with your message pre-filled.');
  };

  return (
    <section id="contact" className="section section-divider">
      <div className="container">
        <SectionHeading
          index="08"
          eyebrow="Get In Touch"
          title="Let’s Connect"
          subtitle="Open to software development roles, frontend internships, and engineering collaborations."
        />

        <div className="contact-grid">
          <motion.div
            className="contact-info-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div
              variants={slideFromLeft}
              whileHover={{ x: 4 }}
              className="contact-card editorial-card card-glow-border"
            >
              <div className="contact-card-head">
                <span className="contact-icon-wrap" aria-hidden="true">
                  <Mail size={19} />
                </span>
                <div>
                  <span className="contact-label">Email Address</span>
                  <a href={`mailto:${personalInfo.email}`} className="contact-value">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <motion.button
                type="button"
                onClick={handleCopyEmail}
                className="btn btn-ghost contact-copy-btn"
                aria-label="Copy email address"
                whileTap={{ scale: 0.94 }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </motion.button>
            </motion.div>

            <motion.a
              variants={slideFromLeft}
              whileHover={{ x: 4 }}
              href={personalInfo.phoneHref}
              className="contact-card editorial-card card-glow-border"
            >
              <div className="contact-card-head">
                <span className="contact-icon-wrap" aria-hidden="true">
                  <Phone size={19} />
                </span>
                <div>
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">{personalInfo.phone}</span>
                </div>
              </div>
            </motion.a>

            <motion.div
              variants={slideFromLeft}
              whileHover={{ x: 4 }}
              className="contact-card editorial-card card-glow-border"
            >
              <div className="contact-card-head">
                <span className="contact-icon-wrap" aria-hidden="true">
                  <MapPin size={19} />
                </span>
                <div>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{personalInfo.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="contact-social-row">
              <motion.a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-social-card editorial-card card-glow-border"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Linkedin size={20} />
                <div>
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-social-title">Gowtham C</span>
                </div>
                <ExternalLink size={15} className="contact-ext-icon" />
              </motion.a>

              <motion.a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-social-card editorial-card card-glow-border"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github size={20} />
                <div>
                  <span className="contact-label">GitHub</span>
                  <span className="contact-social-title">{personalInfo.githubHandle}</span>
                </div>
                <ExternalLink size={15} className="contact-ext-icon" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.form
            className="contact-form editorial-card card-glow-border"
            onSubmit={handleComposeMail}
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="form-header">
              <h3>Send a Direct Email</h3>
              <p>Fill out your details below to launch a pre-filled email in your mail app.</p>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Recruiter / Hiring Manager"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                placeholder="Software Developer Opportunity"
                value={formState.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                placeholder="Share role details, interview schedule, or collaboration notes..."
                value={formState.message}
                onChange={handleChange}
              />
            </div>

            <MagneticButton className="magnetic-full" strength={0.14}>
              <button type="submit" className="btn btn-primary form-submit-btn btn-sheen">
                <Send size={16} />
                <span>Compose Email</span>
              </button>
            </MagneticButton>

            {formNotice && (
              <p className="form-notice" role="status">
                {formNotice}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
