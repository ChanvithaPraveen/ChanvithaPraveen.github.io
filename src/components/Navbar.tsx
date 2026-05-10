import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SfxToggle from './ui/SfxToggle';
import { useSfx } from '../hooks/useSfx';

const NAV_ITEMS = [
  { id: 'about', cmd: 'cd ./about' },
  { id: 'experience', cmd: 'cd ./exp' },
  { id: 'projects', cmd: 'ls ./projects' },
  { id: 'skills', cmd: 'cat skills.json' },
  { id: 'education', cmd: 'cd ./edu' },
  { id: 'certifications', cmd: 'cd ./certs' },
  { id: 'publications', cmd: 'cat ./papers.bib' },
  { id: 'gallery', cmd: 'open ./gallery' },
  { id: 'contact', cmd: 'mail --to=me' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');
  const [active, setActive] = useState('about');
  const { play } = useSfx();

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    tick();
    const i = window.setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      for (const it of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < 140) {
          setActive(it.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    play('click');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  const toggleMobile = () => {
    play(open ? 'close' : 'open');
    setOpen(!open);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          background: 'rgba(8, 12, 8, 0.85)',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: '0 0 16px rgba(0, 255, 65, 0.1)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-2 flex items-center gap-3">
          <button
            onClick={() => scrollTo('hero')}
            className="font-mono text-[13px] md:text-sm text-[var(--neon-green)] flicker"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <span className="text-[var(--text-muted)]">[</span>
            <span className="neon-text">root@chanvitha</span>
            <span className="text-[var(--text-muted)]">:</span>
            <span className="text-[var(--neon-cyan)]">~</span>
            <span className="text-[var(--text-muted)]">]</span>
            <span className="text-[var(--neon-green)] ml-1">$</span>
          </button>

          <div className="hidden lg:flex items-center gap-1 ml-4 flex-1">
            {NAV_ITEMS.map((it) => {
              const isActive = active === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => scrollTo(it.id)}
                  className="px-2.5 py-1 text-[12.5px] font-mono transition"
                  style={{
                    background: 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--border-color)' : 'transparent',
                    color: isActive ? 'var(--neon-green)' : 'var(--text-secondary)',
                    textShadow: isActive ? '0 0 4px var(--neon-green)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span className="text-[var(--text-muted)]">./</span>
                  {it.id}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3 ml-auto">
            <SfxToggle compact />
            <span className="text-[12px] text-[var(--text-secondary)] font-mono">
              <span className="text-[var(--neon-amber)]">●</span>{' '}
              <span className="text-[var(--text-muted)]">UTC</span> {time}
            </span>
          </div>

          <div className="lg:hidden ml-auto flex items-center gap-2">
            <SfxToggle compact />
            <button
              className="text-[var(--neon-green)] p-1"
              onClick={toggleMobile}
              aria-label="menu"
              style={{ background: 'transparent', border: 'none' }}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden fixed inset-x-0 top-[44px] z-40 backdrop-blur-md p-4"
          style={{
            background: 'rgba(8, 12, 8, 0.95)',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div className="space-y-1 font-mono">
            {NAV_ITEMS.map((it) => (
              <button
                key={it.id}
                onClick={() => scrollTo(it.id)}
                className="block w-full text-left px-3 py-2 text-[13px] text-[var(--text-primary)] hover:text-[var(--neon-green)] hover:bg-[rgba(0,255,65,0.05)]"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <span className="text-[var(--neon-cyan)]">$ </span>
                {it.cmd}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
