import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HackerBoot from '../components/terminal/HackerBoot';
import LiveTerminal from '../components/terminal/LiveTerminal';

// Avoid SSR for the canvas-based matrix rain
const MatrixRain = dynamic(() => import('../components/ui/MatrixRain'), { ssr: false });
const SystemMonitor = dynamic(() => import('../components/terminal/SystemMonitor'), { ssr: false });

const TerminalPage = () => {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <Head>
        <title>chanvitha :: live_kernel.sh</title>
        <meta name="description" content="Public read-only Linux-style shell into Chanvitha's profile." />
        <meta name="theme-color" content="#00ff41" />
        <link rel="icon" type="image/png" href="/my-photo-new.png" />
      </Head>

      <MatrixRain opacity={0.1} />

      <div
        className="relative min-h-screen flex flex-col"
        style={{ background: 'transparent', zIndex: 1 }}
      >
        {/* Title bar */}
        <header
          className="flex items-center gap-3 px-4 md:px-6 py-2 font-mono text-[12px]"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            borderBottom: '1px solid var(--border-color)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Link
            href="/"
            className="flex items-center gap-1 px-2 py-0.5"
            style={{
              color: 'var(--neon-green)',
              border: '1px solid var(--border-color)',
              textDecoration: 'none',
            }}
          >
            <ArrowBackIcon style={{ fontSize: 14 }} />
            <span>./back-to-portfolio</span>
          </Link>

          <div className="flex items-center gap-2 ml-auto">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: 'var(--neon-green)',
                boxShadow: '0 0 6px var(--neon-green)',
                animation: 'blink 1.2s step-end infinite',
              }}
            />
            <span style={{ color: 'var(--neon-green)' }}>SECURE TUNNEL</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>tty/0</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>nash 1.0</span>
          </div>
        </header>

        {/* Main */}
        <div className="flex-1 grid lg:grid-cols-12 gap-3 p-3 md:p-4 grid-bg">
          <main className="lg:col-span-9 flex flex-col gap-3 min-h-0">
            <LiveTerminal
              height="calc(100vh - 96px)"
              title="guest@chanvitha:~ — /bin/nash --interactive"
            />
          </main>
          <div className="lg:col-span-3 min-h-0 overflow-y-auto">
            <SystemMonitor />
          </div>
        </div>

        {/* Boot overlay */}
        {!booted && <HackerBoot onComplete={() => setBooted(true)} />}
      </div>
    </>
  );
};

export default TerminalPage;
