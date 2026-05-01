import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { COMMANDS, Line, normalize, resolve, runCommand, ShellState, BANNER } from './shell';
import { HOME_PATH } from '../../data/filesystem';

const PROMPT_USER = 'guest@chanvitha';
const homeShort = (p: string) => (p === HOME_PATH ? '~' : p.startsWith(HOME_PATH + '/') ? '~' + p.slice(HOME_PATH.length) : p);

const renderText = (text: string) => {
  // Tiny ANSI-ish parser for our [dir]/[bold] tags
  const parts: { text: string; cls?: string }[] = [];
  const re = /\u001b\[(dir|bold)\](.*?)\u001b\[\/\1\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ text: m[2], cls: m[1] === 'dir' ? 'lt-dir' : 'lt-bold' });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
};

interface Entry {
  id: number;
  cwd: string;
  input?: string;
  lines: Line[];
}

interface Props {
  initialBanner?: boolean;
  height?: number | string;
  closable?: boolean;
  onClose?: () => void;
  title?: string;
}

const LiveTerminal: React.FC<Props> = ({
  initialBanner = true,
  height = 480,
  closable = false,
  onClose,
  title = 'guest@chanvitha:~ — nash shell',
}) => {
  const [cwd, setCwd] = useState<string>(HOME_PATH);
  const [history, setHistory] = useState<string[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [closed, setClosed] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const counter = useRef(0);

  const nextId = useCallback(() => ++counter.current, []);

  // Initial welcome
  useEffect(() => {
    if (!initialBanner) return;
    const intro: Line[] = [
      { kind: 'ascii', text: BANNER },
      { kind: 'sys', text: 'Last login: ' + new Date().toUTCString() + ' from web-portfolio' },
      { kind: 'sys', text: "Type 'help' to see available commands. Try: ls, cat README.md, tree, neofetch" },
    ];
    setEntries([{ id: nextId(), cwd: HOME_PATH, lines: intro }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const focusInput = () => inputRef.current?.focus();

  const submit = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const state: ShellState = { cwd, history };
      const res = runCommand(raw, state);

      if (res.exit) {
        setEntries((e) => [
          ...e,
          { id: nextId(), cwd, input: raw, lines: res.lines },
        ]);
        setTimeout(() => setClosed(true), 400);
        return;
      }
      if (res.clear) {
        setEntries([]);
      } else {
        setEntries((e) => [
          ...e,
          { id: nextId(), cwd, input: raw, lines: res.lines },
        ]);
      }
      if (res.newCwd) setCwd(res.newCwd);
      if (cmd) setHistory((h) => [...h, cmd]);
      setHistIdx(null);
      setInput('');
    },
    [cwd, history, nextId]
  );

  const tryAutocomplete = useCallback(() => {
    const trimmed = input.trimStart();
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) {
      // Command completion
      const matches = COMMANDS.filter((c) => c.startsWith(parts[0]));
      if (matches.length === 1) setInput(matches[0] + ' ');
      else if (matches.length > 1) {
        setEntries((e) => [
          ...e,
          { id: nextId(), cwd, input, lines: [{ kind: 'out', text: matches.join('  ') }] },
        ]);
      }
      return;
    }
    // Path completion of last token
    const last = parts[parts.length - 1] || '';
    const lastSlash = last.lastIndexOf('/');
    const dirPart = lastSlash >= 0 ? last.slice(0, lastSlash + 1) : '';
    const stem = lastSlash >= 0 ? last.slice(lastSlash + 1) : last;
    const dirAbs = normalize(cwd, dirPart || '.');
    const node = resolve(dirAbs);
    if (!node || node.type !== 'dir') return;
    const candidates = Object.values(node.children)
      .map((n) => (n.type === 'dir' ? n.name + '/' : n.name))
      .filter((n) => n.startsWith(stem));
    if (candidates.length === 1) {
      const completed = (dirPart || '') + candidates[0];
      const newParts = [...parts.slice(0, -1), completed];
      setInput(newParts.join(' '));
    } else if (candidates.length > 1) {
      setEntries((e) => [
        ...e,
        { id: nextId(), cwd, input, lines: [{ kind: 'out', text: candidates.join('  ') }] },
      ]);
    }
  }, [input, cwd, nextId]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(null);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      tryAutocomplete();
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setEntries([]);
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setEntries((es) => [
        ...es,
        {
          id: nextId(),
          cwd,
          input,
          lines: [{ kind: 'sys', text: '^C' }],
        },
      ]);
      setInput('');
      setHistIdx(null);
    }
  };

  const cwdShort = useMemo(() => homeShort(cwd), [cwd]);

  if (closed) {
    return (
      <div
        className="terminal-window grid place-items-center"
        style={{ height, color: 'var(--text-muted)' }}
      >
        <div className="text-center font-mono p-8">
          <div className="mb-3">[ session terminated ]</div>
          <button
            className="btn-cyber"
            onClick={() => {
              setClosed(false);
              setEntries([]);
              if (initialBanner) {
                setEntries([
                  {
                    id: nextId(),
                    cwd: HOME_PATH,
                    lines: [
                      { kind: 'ascii', text: BANNER },
                      { kind: 'sys', text: 'session restored.' },
                    ],
                  },
                ]);
              }
              setTimeout(focusInput, 50);
            }}
          >
            <span>&gt;_</span> reconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-window flex flex-col" onClick={focusInput} style={{ height }}>
      <div className="terminal-header">
        <button
          className="terminal-dot dot-red"
          aria-label="close"
          style={{ border: 'none', cursor: closable ? 'pointer' : 'default' }}
          onClick={(e) => {
            e.stopPropagation();
            if (closable) onClose?.();
            else setClosed(true);
          }}
        />
        <span className="terminal-dot dot-amber" />
        <span className="terminal-dot dot-green" />
        <span style={{ marginLeft: 12, color: 'var(--text-secondary)' }}>{title}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 11 }}>
          tab=complete · ↑↓=history · ctrl+l=clear
        </span>
      </div>

      <div
        ref={scrollRef}
        className="lt-body flex-1 overflow-y-auto p-3 md:p-4 font-mono text-[13px] leading-[1.55]"
        style={{ background: 'rgba(0, 0, 0, 0.55)' }}
      >
        {entries.map((entry) => (
          <div key={entry.id}>
            {entry.input !== undefined && (
              <div className="lt-prompt">
                <Prompt cwd={homeShort(entry.cwd)} />
                <span className="lt-input-text">{entry.input}</span>
              </div>
            )}
            {entry.lines.map((l, i) => (
              <pre
                key={i}
                className={`lt-line lt-${l.kind} whitespace-pre-wrap break-words m-0`}
              >
                {renderText(l.text).map((p, j) => (
                  <span key={j} className={p.cls}>
                    {p.text}
                  </span>
                ))}
              </pre>
            ))}
          </div>
        ))}
        <div className="lt-prompt">
          <Prompt cwd={cwdShort} />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            className="lt-input"
            aria-label="terminal input"
          />
        </div>
      </div>

      <style jsx>{`
        .lt-body :global(.lt-prompt) {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: wrap;
        }
        .lt-body :global(.lt-input) {
          flex: 1;
          min-width: 100px;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 0 !important;
          box-shadow: none !important;
          caret-color: var(--neon-green);
        }
        .lt-body :global(.lt-input:focus) {
          background: transparent !important;
          box-shadow: none !important;
        }
        .lt-body :global(.lt-input-text) {
          color: var(--text-primary);
        }
        .lt-body :global(.lt-line) {
          font-family: var(--font-mono);
        }
        .lt-body :global(.lt-out) {
          color: var(--text-primary);
        }
        .lt-body :global(.lt-err) {
          color: var(--neon-pink);
        }
        .lt-body :global(.lt-sys) {
          color: var(--text-muted);
          font-style: italic;
        }
        .lt-body :global(.lt-ascii) {
          color: var(--neon-green);
          text-shadow: 0 0 4px var(--neon-green);
          line-height: 1.05;
        }
        .lt-body :global(.lt-dir) {
          color: var(--neon-cyan);
          font-weight: 600;
          text-shadow: 0 0 4px var(--neon-cyan);
        }
        .lt-body :global(.lt-bold) {
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

const Prompt: React.FC<{ cwd: string }> = ({ cwd }) => (
  <span className="font-mono text-[13px] flex flex-wrap items-center gap-0">
    <span style={{ color: 'var(--neon-green)' }}>{PROMPT_USER}</span>
    <span style={{ color: 'var(--text-muted)' }}>:</span>
    <span style={{ color: 'var(--neon-cyan)' }}>{cwd}</span>
    <span style={{ color: 'var(--neon-green)' }}>$</span>
    <span>&nbsp;</span>
  </span>
);

export default LiveTerminal;
