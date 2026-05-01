import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projects from '../data/projects';
import SectionHeader from './ui/SectionHeader';
import TerminalWindow from './ui/TerminalWindow';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

interface Project {
  title: string;
  description: string;
  image: string;
  video?: string;
  link?: string;
  github?: string;
  technologies: string[];
}

const Projects = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-12 md:py-16">
      <SectionHeader
        index="03"
        command="ls -la ./projects | grep --color=auto '.shipped'"
        title="projects.dir"
        subtitle={`${projects.length} files found · sorted by impact`}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {(projects as Project[]).map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
          >
            <TerminalWindow
              title={`./${slugify(p.title)}.proj`}
              className="h-full hover-lift"
            >
              <div className="relative h-44 md:h-48 overflow-hidden border-b border-[var(--border-color)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'brightness(0.8) contrast(1.05) hue-rotate(-5deg)',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(0, 255, 65, 0.05) 0%, rgba(10,14,10,0.9) 100%)',
                  }}
                />
                <div className="absolute top-2 left-2 text-[10px] font-mono text-[var(--neon-green)] bg-black/70 border border-[var(--border-color)] px-2 py-0.5">
                  ID:{(0x100 + i).toString(16).toUpperCase()}
                </div>
                {p.video && p.video !== '/' && (
                  <button
                    onClick={() => setActive(p)}
                    className="absolute bottom-2 right-2 w-9 h-9 grid place-items-center border border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[rgba(0,255,65,0.15)]"
                    style={{ background: 'rgba(0,0,0,0.7)' }}
                    aria-label="play preview"
                  >
                    <PlayCircleOutlineIcon style={{ fontSize: 18 }} />
                  </button>
                )}
              </div>

              <div className="p-4 flex flex-col gap-2 font-mono">
                <div className="text-[var(--neon-green)] text-[15px] font-bold leading-snug">
                  <span className="text-[var(--text-muted)]">&gt;_ </span>
                  {p.title}
                </div>
                <p className="text-[var(--text-secondary)] text-[12.5px] leading-5 line-clamp-3">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {p.technologies.slice(0, 6).map((t) => (
                    <span key={t} className="tag" style={{ fontSize: 10 }}>
                      {t}
                    </span>
                  ))}
                  {p.technologies.length > 6 && (
                    <span className="tag" style={{ fontSize: 10, color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)' }}>
                      +{p.technologies.length - 6}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 pt-3 mt-auto border-t border-[var(--border-color)]">
                  {p.github && p.github !== '#' && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cyber"
                      style={{ padding: '4px 10px', fontSize: 11 }}
                    >
                      <GitHubIcon style={{ fontSize: 14 }} /> source
                    </a>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cyber btn-cyber-cyan"
                      style={{ padding: '4px 10px', fontSize: 11 }}
                    >
                      <LaunchIcon style={{ fontSize: 14 }} /> live
                    </a>
                  )}
                  {p.video && p.video !== '/' && (
                    <button
                      onClick={() => setActive(p)}
                      className="btn-cyber"
                      style={{
                        padding: '4px 10px',
                        fontSize: 11,
                        color: 'var(--neon-amber)',
                        borderColor: 'var(--neon-amber)',
                      }}
                    >
                      <PlayCircleOutlineIcon style={{ fontSize: 14 }} /> preview
                    </button>
                  )}
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              className="terminal-window w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="terminal-header">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-amber" />
                <span className="terminal-dot dot-green" />
                <span style={{ marginLeft: 12 }}>./{slugify(active.title)} --preview</span>
                <button
                  onClick={() => setActive(null)}
                  className="ml-auto text-[var(--text-secondary)]"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  aria-label="close"
                >
                  <CloseIcon style={{ fontSize: 18 }} />
                </button>
              </div>
              <div className="aspect-video bg-black">
                <iframe
                  src={active.video}
                  title={active.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 border-t border-[var(--border-color)]">
                <div className="text-[var(--neon-green)] font-bold">{active.title}</div>
                <p className="text-[var(--text-secondary)] text-[13px] mt-1">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 28);

export default Projects;
