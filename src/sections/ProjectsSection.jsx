import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Globe, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { projectsList } from '../data/portfolioData';
import { SectionHeading } from '../components/SectionHeading';
import { EASE_LUXURY, scaleReveal, viewportConfig } from '../components/motionPresets';

const categories = ['All', 'Academic Research', 'Full-Stack Web', 'Frontend Web', 'Desktop / Python'];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsList
      : projectsList.filter((project) => project.category === selectedCategory);

  const handleCardPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="projects" className="section section-divider">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title="Projects & Academic Research"
          subtitle="Featuring my academic machine learning case study, deployed web event platform, React applications, and Python desktop tooling."
        />

        <div className="project-filters" role="tablist" aria-label="Filter projects by category">
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`filter-chip ${active ? 'filter-chip--active' : ''}`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="filter-chip-bg"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="filter-chip-label">{category}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                variants={scaleReveal}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                viewport={viewportConfig}
                transition={{ delay: index * 0.05, ease: EASE_LUXURY }}
                whileHover={{ y: -7 }}
                onPointerMove={handleCardPointerMove}
                className={`project-card editorial-card card-spotlight card-glow-border ${
                  project.featured ? 'project-card--featured' : ''
                }`}
              >
                <div className="project-card-top">
                  <div className="project-badges">
                    <span
                      className={`pill ${
                        project.category === 'Academic Research' ? 'pill--violet' : 'pill--accent'
                      }`}
                    >
                      {project.category === 'Academic Research' ? (
                        <Sparkles size={13} />
                      ) : (
                        <Layers size={13} />
                      )}
                      <span>{project.badge}</span>
                    </span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>

                <ul className="project-features">
                  {project.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={15} className="project-feature-icon" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="project-card-bottom">
                  <div className="project-tech-list">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary project-btn"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <Github size={15} />
                        <span>{project.secondaryGithubUrl ? 'Frontend Repo' : 'View on GitHub'}</span>
                      </motion.a>
                    )}
                    {project.secondaryGithubUrl && (
                      <motion.a
                        href={project.secondaryGithubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-ghost project-btn"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <Github size={15} />
                        <span>{project.secondaryGithubLabel || 'Backend Repo'}</span>
                      </motion.a>
                    )}
                    {project.liveLabel && !project.liveUrl && (
                      <span className="project-deployed-note">
                        <Globe size={14} />
                        <span>{project.liveLabel}</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
