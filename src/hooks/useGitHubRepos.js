import { useEffect, useState } from 'react';
import { fallbackRepositories, githubProfile } from '../data/portfolioData';

export function useGitHubRepos() {
  const [repos, setRepos] = useState(fallbackRepositories);
  const [profile, setProfile] = useState(githubProfile);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGitHubData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubProfile.username}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${githubProfile.username}/repos?sort=updated&per_page=8`,
            { signal: controller.signal }
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('GitHub API request unavailable');
        }

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        if (userData && typeof userData.public_repos === 'number') {
          setProfile({
            username: userData.login,
            displayName: userData.name || githubProfile.displayName,
            url: userData.html_url || githubProfile.url,
            publicRepos: userData.public_repos,
            createdAt: userData.created_at || githubProfile.createdAt,
            updatedAt: userData.updated_at || githubProfile.updatedAt,
          });
        }

        if (Array.isArray(reposData) && reposData.length > 0) {
          const curated = reposData
            .filter((repo) => !repo.fork)
            .slice(0, 6)
            .map((repo) => ({
              name: repo.name,
              description:
                repo.description ||
                'Public repository on GitHub exploring software development and academic coursework.',
              language: repo.language || 'Code',
              updatedAt: repo.updated_at ? repo.updated_at.slice(0, 10) : '',
              url: repo.html_url,
              homepage: repo.homepage || null,
            }));

          if (curated.length > 0) {
            setRepos(curated);
          }
        }

        setStatus('live');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setStatus('fallback');
        }
      }
    }

    fetchGitHubData();
    return () => controller.abort();
  }, []);

  return { repos, profile, status };
}
