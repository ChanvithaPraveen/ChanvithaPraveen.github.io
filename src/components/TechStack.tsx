import { motion } from 'framer-motion';
import techSkills from '../data/techStack';
import SectionHeader from './ui/SectionHeader';
import TerminalWindow from './ui/TerminalWindow';

interface Skill { label: string; logo: string; color?: string; }

const TechStack = () => {
  const skills = techSkills as Skill[];
  return (
    <section id="skills" className="py-12 md:py-16">
      <SectionHeader
        index="04"
        command="cat ./arsenal.json | jq '.tools'"
        title="arsenal --list"
        subtitle={`${skills.length} weapons loaded · ready to deploy`}
      />

      <TerminalWindow title="~/.arsenal — read-only">
        <div className="p-4 md:p-6">
          <div className="text-[var(--text-muted)] font-mono text-[12px] mb-4">
            <span className="text-[var(--neon-amber)]">$ </span>
            scan --type=lang,framework,tool,db,devops &nbsp;&nbsp;
            <span className="text-[var(--neon-green)]">[ OK ]</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {skills.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 16) * 0.025 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden flex flex-col items-center gap-1.5 p-3 border border-[var(--border-color)] hover:border-[var(--neon-green)] transition-all hover-lift"
                style={{ background: 'rgba(0, 0, 0, 0.4)' }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                  style={{
                    background:
                      'linear-gradient(110deg, transparent 35%, rgba(0,255,65,0.18) 50%, transparent 65%)',
                  }}
                />
                <motion.div
                  className="w-10 h-10 md:w-12 md:h-12 grid place-items-center tech-icon-float"
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(0,255,65,0.25))',
                    animationDelay: `${(i % 8) * 0.25}s`,
                  }}
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.logo}
                    alt={s.label}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const fallback = img.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'grid';
                    }}
                  />
                  <span
                    className="hidden w-full h-full place-items-center font-mono text-[11px] font-bold border border-[var(--neon-green)] text-[var(--neon-green)]"
                    style={{
                      background: 'rgba(0,255,65,0.08)',
                      textShadow: '0 0 4px rgba(0,255,65,0.6)',
                    }}
                  >
                    {s.label.replace(/\.js$/, '').slice(0, 3).toUpperCase()}
                  </span>
                </motion.div>
                <span className="relative text-[10.5px] font-mono text-[var(--text-secondary)] group-hover:text-[var(--neon-green)] tracking-wide text-center break-all">
                  {s.label.replace(/\.js$/, '')}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-[var(--text-muted)] font-mono text-[12px] border-t border-[var(--border-color)] pt-4">
            <span className="text-[var(--neon-amber)]">$ </span>
            echo &quot;All systems operational.&quot; &nbsp;&nbsp;
            <span className="cursor-blink" style={{ height: '0.8em', width: 6 }} />
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
};

export default TechStack;
