import { motion, useReducedMotion } from 'framer-motion';

const AMBIENT_NODES = [
  { id: 1, top: '12%', left: '14%', size: 3, delay: 0 },
  { id: 2, top: '24%', left: '78%', size: 2, delay: 1.2 },
  { id: 3, top: '38%', left: '22%', size: 2, delay: 2.1 },
  { id: 4, top: '52%', left: '86%', size: 3, delay: 0.7 },
  { id: 5, top: '68%', left: '12%', size: 2, delay: 1.8 },
  { id: 6, top: '78%', left: '64%', size: 3, delay: 2.5 },
  { id: 7, top: '18%', left: '52%', size: 2, delay: 0.4 },
  { id: 8, top: '86%', left: '34%', size: 2, delay: 1.4 },
  { id: 9, top: '44%', left: '48%', size: 2, delay: 2.9 },
  { id: 10, top: '62%', left: '72%', size: 2, delay: 0.9 },
];

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="ambient-backdrop" aria-hidden="true">
      <div className="ambient-grid" />

      <motion.div
        className="ambient-orb ambient-orb--blue"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 32, -18, 0],
                y: [0, -24, 18, 0],
                scale: [1, 1.07, 0.96, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="ambient-orb ambient-orb--violet"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -28, 22, 0],
                y: [0, 26, -16, 0],
                scale: [1, 0.95, 1.08, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="ambient-orb ambient-orb--center" />

      <div className="ambient-particles">
        {AMBIENT_NODES.map((node) => (
          <motion.span
            key={node.id}
            className="ambient-particle"
            style={{
              top: node.top,
              left: node.left,
              width: `${node.size}px`,
              height: `${node.size}px`,
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: [0.18, 0.65, 0.18],
                    y: [0, -10, 0],
                  }
            }
            transition={{
              duration: 5.5 + (node.id % 3),
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
