import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShieldCheck,
  Terminal,
  Award,
  Cloud,
  CheckCircle,
  Sparkles,
  Eye,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { certificationsList } from '../data/portfolioData';
import { SectionHeading } from '../components/SectionHeading';
import { CertificateModal } from '../components/CertificateModal';
import { EASE_LUXURY, scaleReveal, viewportConfig } from '../components/motionPresets';

const certCategories = ['All', 'Cloud & Web', 'Java, C++ & QA', 'AI & Innovation'];

const certIcons = {
  'oracle-java-foundations': Award,
  'nasscom-testing-gold': CheckCircle,
  'infosys-cloud-computing': Cloud,
  'infosys-virtualization-cloud': Cloud,
  'infosys-bootstrap-4': Sparkles,
  'greylearn-cpp': Terminal,
  'nptel-ai-hrm': Award,
  'aicte-ip-utsav': Sparkles,
  'cyber-job-sim': ShieldCheck,
};

export function CertificationsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredCerts =
    selectedCategory === 'All'
      ? certificationsList
      : certificationsList.filter((cert) => cert.category === selectedCategory);

  const activeCertificate =
    activeIndex !== null && filteredCerts[activeIndex] ? filteredCerts[activeIndex] : null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredCerts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === filteredCerts.length - 1 ? 0 : prev + 1));
  };

  const handleCardPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="certifications" className="section section-divider">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Credentials"
          title="Certifications & Achievements"
          subtitle="Verified industry, government, and academic certifications across Java, Cloud Computing, Testing Tools, C++, AI, and Cybersecurity. Click any card to open the full certificate view."
        />

        <div className="project-filters" role="tablist" aria-label="Filter certifications">
          {certCategories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(null);
                }}
                className={`filter-chip ${active ? 'filter-chip--active' : ''}`}
              >
                {active && (
                  <motion.span
                    layoutId="cert-filter-pill"
                    className="filter-chip-bg"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="filter-chip-label">{category}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="certifications-grid">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => {
              const Icon = certIcons[cert.id] || Award;
              return (
                <motion.article
                  key={cert.id}
                  layout
                  variants={scaleReveal}
                  initial="hidden"
                  whileInView="visible"
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                  viewport={viewportConfig}
                  transition={{ delay: index * 0.04, ease: EASE_LUXURY }}
                  whileHover={{ y: -5 }}
                  onPointerMove={handleCardPointerMove}
                  className="cert-card editorial-card card-spotlight card-glow-border"
                >
                  <div className="cert-card-top">
                    <motion.span
                      className="cert-icon-wrap"
                      aria-hidden="true"
                      whileHover={{ rotate: -6, scale: 1.08 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Icon size={21} />
                    </motion.span>
                    <span className={`pill ${cert.accent === 'violet' ? 'pill--violet' : 'pill--accent'}`}>
                      {cert.badge}
                    </span>
                  </div>

                  <div className="cert-card-body">
                    <span className="cert-category">{cert.issuer}</span>
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-desc">{cert.description}</p>
                  </div>

                  <div className="cert-card-meta">
                    <span className="cert-date">
                      <Calendar size={13} />
                      <span>{cert.issueDate}</span>
                    </span>
                    {cert.credentialId && (
                      <span className="cert-id font-mono" title={cert.credentialId}>
                        {cert.credentialId}
                      </span>
                    )}
                  </div>

                  <div className="cert-card-actions">
                    <motion.button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="btn btn-secondary cert-view-btn btn-sheen"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Eye size={15} />
                      <span>Open Certificate</span>
                    </motion.button>

                    {cert.verifyUrl && (
                      <motion.a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-ghost cert-verify-btn"
                        aria-label={`Verify ${cert.title}`}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <ExternalLink size={15} />
                        <span>Verify</span>
                      </motion.a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <CertificateModal
        certificate={activeCertificate}
        onClose={() => setActiveIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={activeIndex ?? 0}
        totalCount={filteredCerts.length}
      />
    </section>
  );
}
