import { useEffect, useState } from 'react';

const FAKE_LOGS = [
  'icmp seq=1 ttl=64 time=0.4ms',
  'GET /home/chanvitha 200 OK',
  'AUTH user=guest scope=read',
  'tcp ESTABLISHED 22 → 49152',
  'kern: cpu0 throttle ok',
  'sshd: accepted publickey',
  'crypto: aes-gcm initialized',
  'fs: mount /home/chanvitha',
  'net: rx 1.2 KB tx 0.4 KB',
  'iptables: ACCEPT 192.168.1.5',
  'sandbox: rw locked → ro',
  'auditd: visitor session start',
  'dns: A chanvitha.dev cached',
  'tls: x25519 kex ok',
  'mod: nashd loaded v1.0',
];

const PORTS = [
  { port: 22, svc: 'ssh',      state: 'OPEN' },
  { port: 80, svc: 'http',     state: 'OPEN' },
  { port: 443, svc: 'https',   state: 'OPEN' },
  { port: 1337, svc: 'nash',   state: 'OPEN' },
  { port: 8080, svc: 'webdev', state: 'FILTER' },
  { port: 5432, svc: 'pg',     state: 'CLOSED' },
];

const Bar: React.FC<{ label: string; value: number; color: string; suffix?: string }> = ({
  label,
  value,
  color,
  suffix = '%',
}) => (
  <div className="mb-2">
    <div className="flex justify-between text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>
      <span>{label}</span>
      <span style={{ color }}>
        {value.toFixed(0)}
        {suffix}
      </span>
    </div>
    <div
      className="h-1"
      style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)' }}
    >
      <div
        className="h-full"
        style={{
          width: `${value}%`,
          background: color,
          boxShadow: `0 0 6px ${color}`,
          transition: 'width 0.4s ease',
        }}
      />
    </div>
  </div>
);

const SystemMonitor = () => {
  const [cpu, setCpu] = useState(28);
  const [mem, setMem] = useState(54);
  const [net, setNet] = useState(12);
  const [logs, setLogs] = useState<string[]>([]);
  const [now, setNow] = useState('');

  useEffect(() => {
    const i = window.setInterval(() => {
      setCpu((v) => Math.max(8, Math.min(96, v + (Math.random() - 0.5) * 22)));
      setMem((v) => Math.max(20, Math.min(95, v + (Math.random() - 0.5) * 6)));
      setNet((v) => Math.max(0, Math.min(100, v + (Math.random() - 0.5) * 30)));
    }, 700);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = window.setInterval(() => {
      setLogs((l) => {
        const msg = FAKE_LOGS[Math.floor(Math.random() * FAKE_LOGS.length)];
        const ts = new Date().toLocaleTimeString('en-GB', { hour12: false });
        return [...l, `[${ts}] ${msg}`].slice(-14);
      });
    }, 800);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const tick = () =>
      setNow(
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

  return (
    <aside
      className="font-mono flex flex-col gap-3 text-[11.5px]"
      style={{ color: 'var(--text-secondary)' }}
    >
      {/* Status */}
      <Panel title="./status">
        <div className="flex justify-between mb-1.5">
          <span style={{ color: 'var(--text-muted)' }}>session</span>
          <span style={{ color: 'var(--neon-green)' }}>● secure</span>
        </div>
        <div className="flex justify-between mb-1.5">
          <span style={{ color: 'var(--text-muted)' }}>uptime</span>
          <span style={{ color: 'var(--neon-cyan)' }}>{now}</span>
        </div>
        <div className="flex justify-between mb-1.5">
          <span style={{ color: 'var(--text-muted)' }}>privilege</span>
          <span style={{ color: 'var(--neon-amber)' }}>read-only</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: 'var(--text-muted)' }}>cipher</span>
          <span style={{ color: 'var(--neon-green)' }}>aes-256</span>
        </div>
      </Panel>

      {/* Resources */}
      <Panel title="./resources --top">
        <Bar label="CPU.kernel" value={cpu} color="var(--neon-green)" />
        <Bar label="MEM.alloc" value={mem} color="var(--neon-cyan)" />
        <Bar label="NET.in/s" value={net} color="var(--neon-amber)" suffix=" Kb" />
      </Panel>

      {/* Ports */}
      <Panel title="./nmap localhost">
        <table className="w-full text-[10.5px]">
          <thead>
            <tr style={{ color: 'var(--text-muted)' }}>
              <th className="text-left font-normal pb-1">PORT</th>
              <th className="text-left font-normal pb-1">SVC</th>
              <th className="text-right font-normal pb-1">STATE</th>
            </tr>
          </thead>
          <tbody>
            {PORTS.map((p) => (
              <tr key={p.port}>
                <td style={{ color: 'var(--neon-green)' }}>{p.port}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{p.svc}</td>
                <td
                  className="text-right"
                  style={{
                    color:
                      p.state === 'OPEN'
                        ? 'var(--neon-green)'
                        : p.state === 'FILTER'
                        ? 'var(--neon-amber)'
                        : 'var(--neon-pink)',
                  }}
                >
                  {p.state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      {/* Logs */}
      <Panel title="./tail -f /var/log/sys" flex>
        <div
          className="overflow-hidden text-[10.5px] leading-[1.5]"
          style={{ color: 'var(--text-muted)', maxHeight: 220 }}
        >
          {logs.map((l, i) => (
            <div
              key={i}
              style={{
                opacity: (i + 1) / logs.length,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <span style={{ color: 'var(--neon-cyan)' }}>{l.slice(0, 10)}</span>
              {l.slice(10)}
            </div>
          ))}
          <div className="cursor-blink" style={{ height: '0.7em', width: 6 }} />
        </div>
      </Panel>
    </aside>
  );
};

const Panel: React.FC<{ title: string; children: React.ReactNode; flex?: boolean }> = ({
  title,
  children,
  flex,
}) => (
  <div
    className={`p-3 ${flex ? 'flex-1' : ''}`}
    style={{
      background: 'rgba(0, 0, 0, 0.55)',
      border: '1px solid var(--border-color)',
      boxShadow: '0 0 12px rgba(0, 255, 65, 0.06) inset',
    }}
  >
    <div
      className="text-[10px] mb-2 pb-1.5 tracking-wider"
      style={{ color: 'var(--neon-cyan)', borderBottom: '1px solid var(--border-color)' }}
    >
      {title}
    </div>
    {children}
  </div>
);

export default SystemMonitor;
