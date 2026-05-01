import { useEffect, useRef, useState } from 'react';

interface Step {
  text: string;
  delay: number;
  status?: 'OK' | 'WARN' | 'INFO';
  color?: string;
  type?: 'hex' | 'progress' | 'log';
}

const HEX_CHARS = '0123456789ABCDEF';
const randHex = (len: number) =>
  Array.from({ length: len }, () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]).join('');

const STEPS: Step[] = [
  { text: 'INITIALIZING NEON-GRID NEURAL LINK...', delay: 200, status: 'INFO' },
  { text: 'Loading kernel module: chanvitha_core.ko', delay: 250, status: 'OK' },
  { text: 'Spawning daemon: nashd[7331] on port :22', delay: 220, status: 'OK' },
  { text: 'Opening raw socket → 192.168.0.1:443', delay: 260, status: 'OK' },
  { text: 'Probing network topology... 24 nodes online', delay: 280, status: 'OK' },
  { text: 'Bypassing ICE-7 firewall layer...', delay: 320, status: 'WARN' },
  { text: 'Negotiating TLS 1.3 handshake...', delay: 260, status: 'OK' },
  { text: 'Exchanging X25519 ephemeral keys...', delay: 300, status: 'OK', type: 'hex' },
  { text: 'Decrypting AES-256-GCM payload...', delay: 320, status: 'OK', type: 'progress' },
  { text: 'Verifying SHA-512 signature...', delay: 280, status: 'OK' },
  { text: 'Authenticating visitor.cert via PKI chain', delay: 280, status: 'OK' },
  { text: 'Mounting /dev/portfolio at /home/chanvitha', delay: 240, status: 'OK' },
  { text: 'Loading public-read sandbox profile...', delay: 220, status: 'OK' },
  { text: 'Establishing pty: /dev/pts/0 [80x24]', delay: 200, status: 'OK' },
  { text: 'Starting nash 1.0 (chanvitha-shell)...', delay: 240, status: 'OK' },
  { text: 'CONNECTION ESTABLISHED — KERNEL HANDSHAKE COMPLETE', delay: 320, status: 'OK' },
];

const ACCESS_GRANTED = `\
   █████   █████████  █████████ ████████ █████████   █████████
  ███░░██ ███░░░░░██ ███░░░░░░ ░░░░███░░ ███░░░░░██ ███░░░░░██
 ░██  ░██░██    ░██░██          ███░  ░██     ░██░██     ░██
 ░██████░░█████████░██████████ ███░    ░██████████░██████████
 ░░░░░██░░░░░░░░░██░░░░░░░░██ ███░     ░██░░░░░░░░░██░░░░░░░░
 ░░░░░██     ░░░██     ░░░██ ███░      ░██        ░██
 █████░██ ████████░  █████████ ███████  ░██        ░██
 ░░░░░░░ ░░░░░░░░    ░░░░░░░░ ░░░░░░░  ░░░        ░░░

                G R A N T E D   ::   W E L C O M E
`;

interface Props {
  onComplete: () => void;
}

const HackerBoot: React.FC<Props> = ({ onComplete }) => {
  const [done, setDone] = useState<Step[]>([]);
  const [progress, setProgress] = useState(0);
  const [hexBuf, setHexBuf] = useState<string[]>([]);
  const [phase, setPhase] = useState<'booting' | 'granted' | 'fading'>('booting');
  const [glitchKey, setGlitchKey] = useState(0);
  const stepIdx = useRef(0);

  // Step ticker
  useEffect(() => {
    if (phase !== 'booting') return;
    if (stepIdx.current >= STEPS.length) {
      const t = setTimeout(() => setPhase('granted'), 500);
      return () => clearTimeout(t);
    }
    const cur = STEPS[stepIdx.current];
    const t = setTimeout(() => {
      setDone((d) => [...d, cur]);
      stepIdx.current += 1;
    }, cur.delay);
    return () => clearTimeout(t);
  }, [done, phase]);

  // Hex stream
  useEffect(() => {
    if (phase !== 'booting') return;
    const i = window.setInterval(() => {
      setHexBuf((b) => {
        const next = [...b, randHex(56)];
        return next.slice(-7);
      });
    }, 80);
    return () => clearInterval(i);
  }, [phase]);

  // Progress
  useEffect(() => {
    if (phase !== 'booting') return;
    const i = window.setInterval(() => {
      setProgress((p) => {
        const inc = Math.random() * 6 + 1;
        return Math.min(100, p + inc);
      });
    }, 90);
    return () => clearInterval(i);
  }, [phase]);

  // Random glitch
  useEffect(() => {
    if (phase !== 'booting') return;
    const i = window.setInterval(() => setGlitchKey((k) => k + 1), 700);
    return () => clearInterval(i);
  }, [phase]);

  // Granted -> fade out -> done
  useEffect(() => {
    if (phase !== 'granted') return;
    const t = setTimeout(() => setPhase('fading'), 1700);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'fading') return;
    const t = setTimeout(onComplete, 600);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const skip = () => {
    setPhase('granted');
    setTimeout(() => setPhase('fading'), 600);
  };

  return (
    <div
      className="fixed inset-0 z-[200] font-mono"
      style={{
        background: 'radial-gradient(circle at 30% 20%, #06140a 0%, #02060a 100%)',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.55s ease',
      }}
      onClick={skip}
    >
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="scanning-line" />

      {/* Floating hex stream */}
      <div
        className="absolute right-4 top-4 text-right text-[10px] leading-4 hidden md:block pointer-events-none"
        style={{ color: 'var(--neon-cyan)', opacity: 0.55 }}
      >
        {hexBuf.map((h, i) => (
          <div key={i} style={{ opacity: (i + 1) / hexBuf.length }}>
            {h}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-3xl">
          {phase === 'booting' && (
            <>
              <div
                className="flex items-center justify-between mb-4 text-[11px]"
                style={{ color: 'var(--neon-green)' }}
              >
                <span>
                  [ {new Date().toISOString()} ]{' '}
                  <span style={{ color: 'var(--neon-amber)' }}>● HANDSHAKE IN PROGRESS</span>
                </span>
                <span style={{ color: 'var(--text-muted)' }}>click anywhere to skip ▸</span>
              </div>

              <div
                className="border p-4 md:p-5 mb-4"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  borderColor: 'var(--border-color)',
                  boxShadow: '0 0 24px rgba(0, 255, 65, 0.18) inset',
                }}
              >
                <div className="text-[10px] mb-2" style={{ color: 'var(--neon-cyan)' }}>
                  {`// boot.log`}
                </div>
                <div className="space-y-0.5 text-[12.5px] max-h-[55vh] overflow-hidden">
                  {done.map((s, i) => (
                    <div key={i} className="flex gap-2 items-start" style={{ animation: 'flicker 4s' }}>
                      <span
                        style={{
                          color:
                            s.status === 'WARN'
                              ? 'var(--neon-amber)'
                              : s.status === 'INFO'
                              ? 'var(--neon-cyan)'
                              : 'var(--neon-green)',
                          minWidth: 60,
                        }}
                      >
                        [ {s.status || 'OK'} ]
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>{s.text}</span>
                    </div>
                  ))}
                  {stepIdx.current < STEPS.length && (
                    <div className="flex gap-2 items-start">
                      <span style={{ color: 'var(--neon-amber)', minWidth: 60 }}>[ ... ]</span>
                      <span style={{ color: 'var(--text-primary)' }} key={glitchKey}>
                        {STEPS[stepIdx.current]?.text}
                        <span className="cursor-blink" />
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <div
                    className="flex items-center justify-between text-[10.5px] mb-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span>DECRYPTING PAYLOAD</span>
                    <span style={{ color: 'var(--neon-green)' }}>{Math.floor(progress)}%</span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden"
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)' }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${progress}%`,
                        background:
                          'linear-gradient(90deg, var(--neon-green), var(--neon-cyan))',
                        boxShadow: '0 0 8px var(--neon-green)',
                        transition: 'width 0.15s linear',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className="flex flex-wrap gap-3 text-[10.5px] justify-between"
                style={{ color: 'var(--text-muted)' }}
              >
                <span>
                  <span style={{ color: 'var(--neon-green)' }}>SRC</span> 192.168.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}
                </span>
                <span>
                  <span style={{ color: 'var(--neon-green)' }}>DST</span> chanvitha@grid:22
                </span>
                <span>
                  <span style={{ color: 'var(--neon-green)' }}>CIPHER</span> AES-256-GCM
                </span>
                <span>
                  <span style={{ color: 'var(--neon-green)' }}>HASH</span> {randHex(8)}
                </span>
              </div>
            </>
          )}

          {(phase === 'granted' || phase === 'fading') && (
            <div className="text-center" style={{ animation: 'flicker 1s' }}>
              <pre
                className="ascii-art mx-auto mb-3"
                style={{
                  color: 'var(--neon-green)',
                  textShadow: '0 0 8px var(--neon-green), 0 0 16px var(--neon-green)',
                  fontSize: 'clamp(0.45rem, 1.2vw, 0.95rem)',
                  whiteSpace: 'pre',
                }}
              >
                {ACCESS_GRANTED}
              </pre>
              <div
                className="text-[12px] tracking-[0.4em]"
                style={{ color: 'var(--neon-cyan)', textShadow: '0 0 6px var(--neon-cyan)' }}
              >
                LOADING PORTFOLIO TERMINAL...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackerBoot;
