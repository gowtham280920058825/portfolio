import { motion } from 'framer-motion';
import { EASE_LUXURY, viewportConfig } from './motionPresets';

export function SectionHeading({ index, eyebrow, title, subtitle }) {
  return (
    <motion.div
      className="section-header"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <div className="section-eyebrow">
        <motion.span
          className="section-eyebrow-line"
          aria-hidden="true"
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            visible: {
              scaleX: 1,
              transition: { duration: 0.55, ease: EASE_LUXURY },
            },
          }}
        />
        <motion.span
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.45, delay: 0.1, ease: EASE_LUXURY },
            },
          }}
        >
          {index ? `${index} · ` : ''}
          {eyebrow}
        </motion.span>
      </div>

      <motion.h2
        className="section-title"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.58, delay: 0.12, ease: EASE_LUXURY },
          },
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="section-subtitle"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, delay: 0.2, ease: EASE_LUXURY },
            },
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
