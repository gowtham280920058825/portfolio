import { motion } from 'framer-motion';
import { Download, Eye, FileText, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SectionHeading } from '../components/SectionHeading';
import { MagneticButton } from '../components/MagneticButton';
import { EASE_LUXURY, scaleReveal, viewportConfig } from '../components/motionPresets';

const resumeHighlights = [
  'MSc Software Systems at Kongu Engineering College (CGPA 7.65/10.00)',
  'Languages: Python, Java, C++, C, SQL & JavaScript (ES6+)',
  'Full-Stack & Frontend: React.js, HTML5, CSS3, Bootstrap, Node.js, Express.js',
  'Databases & Tools: MySQL, MongoDB, Git, DSA, Docker, Pandas',
  'Projects: CodeWar 2.0, Blood Donation Website, Billing Software',
  'Certifications: Cyber Job Simulation (2025) & C++ Programming (2026)',
];

export function ResumeSection() {
  return (
    <section id="resume" className="section section-divider">
      <div className="container">
        <SectionHeading
          index="07"
          eyebrow="Curriculum Vitae"
          title="Resume"
          subtitle="Download or preview my complete up-to-date PDF resume."
        />

        <motion.div
          className="resume-card editorial-card card-glow-border"
          variants={scaleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="resume-left">
            <div className="resume-badge">
              <FileText size={18} />
              <span>PDF Document · {personalInfo.resumeFileName}</span>
            </div>
            <h3 className="resume-title">
              {personalInfo.displayName} — {personalInfo.role}
            </h3>
            <p className="resume-summary">
              Ready for Software Developer, Frontend Developer, and Fresher engineering opportunities.
            </p>

            <ul className="resume-highlights">
              {resumeHighlights.map((point, idx) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportConfig}
                  transition={{ duration: 0.38, delay: 0.12 + idx * 0.05, ease: EASE_LUXURY }}
                >
                  <Check size={15} className="resume-check-icon" aria-hidden="true" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="resume-actions">
            <MagneticButton className="magnetic-full">
              <a
                href={personalInfo.resumePath}
                download={personalInfo.resumeFileName}
                className="btn btn-primary resume-btn btn-sheen"
              >
                <Download size={17} />
                <span>Download Resume PDF</span>
              </a>
            </MagneticButton>

            <MagneticButton className="magnetic-full" strength={0.16}>
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary resume-btn"
              >
                <Eye size={17} />
                <span>View in Browser</span>
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
