import { useState } from 'react';
import ChanaChat from './ChanaChat';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const ChanaLauncher: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[9998] grid place-items-center"
          style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ChanaChat onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[9997] flex items-center gap-2.5 font-mono shadow-lg"
        style={{
          padding: '12px 18px',
          background: 'rgba(0, 0, 0, 0.92)',
          border: '1.5px solid var(--neon-green)',
          color: 'var(--neon-green)',
          boxShadow: '0 0 18px rgba(0, 255, 65, 0.5), inset 0 0 14px rgba(0, 255, 65, 0.12)',
          cursor: 'pointer',
          borderRadius: 4,
          animation: 'pulse-glow 2.4s ease-in-out infinite',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.65), inset 0 0 18px rgba(0, 255, 65, 0.18)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 0 18px rgba(0, 255, 65, 0.5), inset 0 0 14px rgba(0, 255, 65, 0.12)';
        }}
        aria-label="Open Chana AI Assistant"
      >
        <SmartToyIcon style={{ fontSize: 20 }} />
        <span className="text-[13px] font-bold tracking-wider">&gt;_ CHANA AI</span>
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: 'var(--neon-green)',
            boxShadow: '0 0 8px var(--neon-green)',
            animation: 'blink 1.2s step-end infinite',
          }}
        />
      </button>
    </>
  );
};

export default ChanaLauncher;
