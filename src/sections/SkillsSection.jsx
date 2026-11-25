import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, Wrench } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { SectionHeading } from '../components/SectionHeading';
import {
  EASE_LUXURY,
  scaleReveal,
  staggerContainer,
  viewportConfig,
} from '../components/motionPresets';

const categoryIcons = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  databases: Database,
  tools: Wrench,
};

export function SkillsSection() {
  return (
    <section id="skills" className="section section-divider">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Technical Skills"
          title="Core Technologies & Tooling"
          subtitle="Technical proficiencies backed directly by academic coursework, deployed applications, and resume experience."
        />

        <motion.div
          className="skills-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {skillCategories.map((category, idx) => {
            const Icon = categoryIcons[category.id] || Code2;
            return (
              <motion.article
                key={category.id}
                variants={scaleReveal}
                whileHover={{ y: -4 }}
                className="skill-card editorial-card card-glow-border"
              >
                <div className="skill-card-head">
                  <motion.span
                    className="skill-icon-wrap"
                    aria-hidden="true"
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Icon size={20} />
                  </motion.span>
                  <div className="skill-head-text">
                    <div className="skill-title-row">
                      <h3 className="skill-card-title">{category.title}</h3>
                      <span className="skill-count font-mono">{category.items.length}</span>
                    </div>
                    <p className="skill-card-desc">{category.description}</p>
                  </div>
                </div>

                <div className="skill-indicator-track" aria-hidden="true">
                  <motion.div
                    className="skill-indicator-fill"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={viewportConfig}
                    transition={{
                      duration: 0.85,
                      delay: 0.15 + idx * 0.08,
                      ease: EASE_LUXURY,
                    }}
                  />
                </div>

                <div className="skill-tags" role="list" aria-label={category.title}>
                  {category.items.map((item, pillIdx) => (
                    <motion.span
                      key={item}
                      role="listitem"
                      className="skill-pill"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportConfig}
                      transition={{
                        duration: 0.35,
                        delay: 0.1 + pillIdx * 0.035,
                        ease: EASE_LUXURY,
                      }}
                      whileHover={{ y: -2, scale: 1.03 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
