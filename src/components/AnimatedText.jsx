import { motion, useReducedMotion } from 'framer-motion';
import { letterContainer, letterItem } from './motionPresets';

export function AnimatedName({ text, className = '' }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  return (
    <motion.span
      className={`animated-name ${className}`}
      aria-label={text}
      variants={letterContainer}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="animated-name-word" aria-hidden="true">
          {Array.from(word).map((char, charIdx) => (
            <motion.span
              key={`${wordIdx}-${charIdx}`}
              variants={letterItem}
              className="animated-name-char"
            >
              {char}
            </motion.span>
          ))}
          {wordIdx < words.length - 1 ? <span className="animated-name-space">&nbsp;</span> : null}
        </span>
      ))}
    </motion.span>
  );
}
