import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export function CursorSpotlight() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 28, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    const updateCapability = () => setEnabled(mediaQuery.matches);
    updateCapability();

    if (!mediaQuery.matches) return undefined;

    const handlePointerMove = (e) => {
      mouseX.set(e.clientX - 240);
      mouseY.set(e.clientY - 240);
    };

    const handlePointerLeave = () => {
      mouseX.set(-600);
      mouseY.set(-600);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    mediaQuery.addEventListener('change', updateCapability);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      mediaQuery.removeEventListener('change', updateCapability);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-spotlight"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    />
  );
}
