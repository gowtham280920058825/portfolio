import { motion } from 'framer-motion';
import { aboutContent } from '../data/portfolioData';
import { SectionHeading } from '../components/SectionHeading';
import {
  scaleReveal,
  slideFromLeft,
  staggerContainer,
  viewportConfig,
} from '../components/motionPresets';

export function AboutSection() {
  return (
    <section id="about" className="section section-divider">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="About Me"
          title="Engineering Mindset & Background"
          subtitle="Combining computer science fundamentals with practical full-stack and Python software development."
        />

        <div className="about-grid">
          <motion.div
            className="about-narrative editorial-card card-glow-border"
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <h3 className="about-headline">{aboutContent.headline}</h3>
            <div className="about-paragraphs">
              {aboutContent.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-highlights"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {aboutContent.highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={scaleReveal}
                whileHover={{ y: -4 }}
                className="about-stat-card editorial-card card-glow-border"
              >
                <span className="about-stat-label">{item.label}</span>
                <strong className="about-stat-value">{item.value}</strong>
                <span className="about-stat-detail">{item.detail}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
