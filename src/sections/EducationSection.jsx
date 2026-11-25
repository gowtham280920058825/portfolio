import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { educationTimeline } from '../data/portfolioData';
import { SectionHeading } from '../components/SectionHeading';
import { EASE_LUXURY, slideFromRight, viewportConfig } from '../components/motionPresets';

export function EducationSection() {
  const timelineRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 65%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" className="section section-divider">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Education"
          title="Academic Timeline"
          subtitle="Formal computer science and foundational schooling milestones from Erode, Tamil Nadu."
        />

        <div ref={timelineRef} className="timeline">
          <div className="timeline-track" aria-hidden="true">
            <motion.div
              className="timeline-track-fill"
              style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: lineScaleY }}
            />
          </div>

          {educationTimeline.map((edu, index) => (
            <motion.article
              key={edu.id}
              className="timeline-item"
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ delay: index * 0.08, ease: EASE_LUXURY }}
            >
              <motion.div
                className="timeline-marker"
                aria-hidden="true"
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewportConfig}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.08, ease: EASE_LUXURY }}
              >
                <GraduationCap size={16} />
              </motion.div>

              <motion.div
                className="timeline-card editorial-card card-glow-border"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25, ease: EASE_LUXURY }}
              >
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-degree">{edu.degree}</h3>
                    <p className="timeline-institution">{edu.institution}</p>
                  </div>
                  <div className="timeline-score">
                    <span>{edu.scoreLabel}:</span>
                    <strong>{edu.scoreValue}</strong>
                  </div>
                </div>

                <div className="timeline-meta">
                  <span>
                    <Calendar size={14} />
                    <span>{edu.period}</span>
                  </span>
                  <span>
                    <MapPin size={14} />
                    <span>{edu.location}</span>
                  </span>
                </div>

                <p className="timeline-details">{edu.details}</p>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
