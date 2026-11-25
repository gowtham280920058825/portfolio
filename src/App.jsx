import { useMemo } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { navigationLinks } from './data/portfolioData';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useActiveSection';
import { AmbientBackground } from './components/AmbientBackground';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { EducationSection } from './sections/EducationSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { GitHubSection } from './sections/GitHubSection';
import { ResumeSection } from './sections/ResumeSection';
import { ContactSection } from './sections/ContactSection';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(() => navigationLinks.map((link) => link.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="app-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <AmbientBackground />
        <CursorSpotlight />
        <ScrollProgress />

        <Navbar
          activeSection={activeSection}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <CertificationsSection />
          <GitHubSection />
          <ResumeSection />
          <ContactSection />
        </main>

        <Footer />
      </motion.div>
    </MotionConfig>
  );
}

export default App;
