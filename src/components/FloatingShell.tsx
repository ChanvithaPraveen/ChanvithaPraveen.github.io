import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import TerminalIcon from '@mui/icons-material/Terminal';

const FloatingShell = () => {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        router.push('/terminal');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  // Hide button on the terminal page itself
  if (router.pathname === '/terminal') return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      onClick={() => router.push('/terminal')}
      aria-label="open live terminal"
      className="fixed z-[80] bottom-5 right-5 flex items-center gap-2.5 font-mono"
      style={{
        padding: '12px 18px',
        background: 'rgba(0, 0, 0, 0.92)',
        border: '1.5px solid var(--neon-green)',
        color: 'var(--neon-green)',
        boxShadow:
          '0 0 18px rgba(0, 255, 65, 0.5), inset 0 0 14px rgba(0, 255, 65, 0.12)',
        cursor: 'pointer',
        borderRadius: 4,
        animation: 'pulse-glow 2.4s ease-in-out infinite',
      }}
    >
      <TerminalIcon style={{ fontSize: 20 }} />
      <span className="text-[13px] font-bold tracking-wider">&gt;_ LIVE TERMINAL</span>
      <span
        className="w-2 h-2 rounded-full"
        style={{
          background: 'var(--neon-green)',
          boxShadow: '0 0 8px var(--neon-green)',
          animation: 'blink 1.2s step-end infinite',
        }}
      />
    </motion.button>
  );
};

export default FloatingShell;
