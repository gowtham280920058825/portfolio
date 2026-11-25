import { motion } from 'framer-motion';
import { Github, ExternalLink, FolderGit2, Calendar } from 'lucide-react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { SectionHeading } from '../components/SectionHeading';
import {
  EASE_LUXURY,
  fadeUp,
  scaleReveal,
  staggerContainer,
  viewportConfig,
} from '../components/motionPresets';

export function GitHubSection() {
  const { repos, profile, status } = useGitHubRepos();

  return (
    <section id="github" className="section section-divider">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Open Source & Code"
          title="GitHub Repositories"
          subtitle="Recent public repositories from my GitHub profile, fetched directly from GitHub with verified metadata."
        />

        <motion.div
          className="github-banner editorial-card card-glow-border"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="github-profile-info">
            <motion.span
              className="github-avatar-icon"
              aria-hidden="true"
              whileHover={{ rotate: 8, scale: 1.06 }}
              transition={{ duration: 0.25 }}
            >
              <Github size={26} />
            </motion.span>
            <div>
              <div className="github-name-row">
                <h3>{profile.displayName}</h3>
                <span className="font-mono github-handle">@{profile.username}</span>
                {status === 'live' && (
                  <span className="github-live-badge">
                    <span className="status-dot" aria-hidden="true" />
                    <span>Live</span>
                  </span>
                )}
              </div>
              <p className="github-meta-line">
                {profile.publicRepos} Public Repositories · Active on GitHub since 2024
              </p>
            </div>
          </div>

          <motion.a
            href={profile.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-sheen"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github size={16} />
            <span>Visit GitHub Profile</span>
            <ExternalLink size={14} />
          </motion.a>
        </motion.div>

        <motion.div
          className="github-repos-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              variants={scaleReveal}
              whileHover={{ y: -5 }}
              transition={{ ease: EASE_LUXURY }}
              className="repo-card editorial-card card-glow-border"
            >
              <div className="repo-card-head">
                <FolderGit2 size={18} className="repo-folder-icon" aria-hidden="true" />
                <ExternalLink size={15} className="repo-external-icon" aria-hidden="true" />
              </div>

              <h3 className="repo-name">{repo.name}</h3>
              <p className="repo-desc">{repo.description}</p>

              <div className="repo-footer">
                <span className="repo-lang">
                  <span className="repo-lang-dot" aria-hidden="true" />
                  <span>{repo.language}</span>
                </span>
                {repo.updatedAt && (
                  <span className="repo-updated">
                    <Calendar size={13} />
                    <span>{repo.updatedAt}</span>
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
