import { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { CHANA_SYSTEM_PROMPT, CHANA_GREETING } from './system-prompt';

const ENDPOINT = process.env.NEXT_PUBLIC_CHANA_ENDPOINT || '';

type Role = 'user' | 'assistant' | 'system';
interface Msg {
  role: Role;
  text: string;
  pending?: boolean;
}

const STREAM_DELAY_MS = 12;

const SUGGESTIONS = [
  'who is chanvitha?',
  'list his projects',
  'what is his strongest stack?',
  'tell me about LSEG',
  'how can I contact him?',
];

const ChanaChat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', text: CHANA_GREETING },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const typeOut = async (text: string, idx: number) => {
    for (let i = 1; i <= text.length; i++) {
      setMessages((m) => {
        const copy = [...m];
        copy[idx] = { ...copy[idx], text: text.slice(0, i), pending: i < text.length };
        return copy;
      });
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, STREAM_DELAY_MS));
    }
  };

  const sendQuestion = async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setBusy(true);
    setInput('');

    const next: Msg[] = [
      ...messages,
      { role: 'user', text: q },
      { role: 'assistant', text: '', pending: true },
    ];
    setMessages(next);
    const replyIdx = next.length - 1;

    try {
      if (!ENDPOINT) {
        await typeOut(
          'chana offline · NEXT_PUBLIC_CHANA_ENDPOINT not configured. see CHANA_SETUP.md to deploy the worker and wire up the endpoint.',
          replyIdx
        );
        return;
      }

      const history = messages
        .filter((m) => m.role !== 'system')
        .filter((_, i) => i !== 0) // skip the local greeting
        .map((m) => ({ role: m.role, text: m.text }));

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: CHANA_SYSTEM_PROMPT,
          history,
          message: q,
        }),
      });

      if (!res.ok) {
        const errText = await safeText(res);
        throw new Error(
          `request failed (${res.status}) ${errText.slice(0, 160) || ''}`.trim()
        );
      }

      const data = (await res.json()) as { reply?: string; error?: string };
      if (data.error) throw new Error(data.error);
      const reply = (data.reply || '').trim() || 'no response received.';
      await typeOut(reply, replyIdx);
    } catch (e: any) {
      const msg =
        e?.message ||
        'transmission error — could not reach chana. please try again.';
      setMessages((m) => {
        const copy = [...m];
        copy[replyIdx] = {
          role: 'assistant',
          text: `[ ! ] ${msg}`,
          pending: false,
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuestion(input);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="terminal-window flex flex-col"
      style={{
        width: 'min(420px, calc(100vw - 24px))',
        height: 'min(560px, calc(100vh - 120px))',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-header">
        <button
          className="terminal-dot dot-red"
          aria-label="close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{ border: 'none', cursor: 'pointer' }}
        />
        <span className="terminal-dot dot-amber" />
        <span className="terminal-dot dot-green" />
        <span style={{ marginLeft: 12, color: 'var(--text-secondary)' }}>
          chana@portfolio:~/ai-assist
        </span>
        <span
          className="ml-auto inline-flex items-center gap-1 text-[10px]"
          style={{ color: 'var(--neon-green)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--neon-green)',
              boxShadow: '0 0 6px var(--neon-green)',
              animation: 'blink 1.2s step-end infinite',
            }}
          />
          ONLINE
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 font-mono text-[12.5px] leading-[1.55]"
        style={{ background: 'rgba(0,0,0,0.55)' }}
      >
        {messages.map((m, i) => (
          <Message key={i} m={m} />
        ))}
        {busy && <div className="text-[var(--text-muted)] mt-1">scanning knowledge base...</div>}

        {messages.length === 1 && !busy && (
          <div className="mt-4">
            <div
              className="text-[10.5px] mb-1.5"
              style={{ color: 'var(--neon-cyan)' }}
            >
              {`// quick prompts`}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendQuestion(s)}
                  className="px-2 py-1 text-[11px] font-mono"
                  style={{
                    background: 'rgba(0, 240, 255, 0.06)',
                    color: 'var(--neon-cyan)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendQuestion(input);
        }}
        className="border-t flex items-center gap-2 p-2"
        style={{ borderColor: 'var(--border-color)', background: 'rgba(0,0,0,0.6)' }}
      >
        <span className="font-mono text-[12.5px]" style={{ color: 'var(--neon-green)' }}>
          ask&gt;
        </span>
        <input
          ref={inputRef}
          value={input}
          disabled={busy}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={busy ? 'chana is thinking...' : 'type your question...'}
          spellCheck={false}
          autoComplete="off"
          className="flex-1"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12.5,
            padding: 0,
            boxShadow: 'none',
            opacity: busy ? 0.5 : 1,
          }}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="grid place-items-center"
          style={{
            width: 28,
            height: 28,
            background: input.trim() && !busy ? 'rgba(0, 255, 65, 0.15)' : 'transparent',
            border: '1px solid var(--neon-green)',
            color: 'var(--neon-green)',
            cursor: input.trim() && !busy ? 'pointer' : 'not-allowed',
            opacity: input.trim() && !busy ? 1 : 0.5,
          }}
          aria-label="send"
        >
          <SendIcon style={{ fontSize: 14 }} />
        </button>
      </form>
    </div>
  );
};

const Message: React.FC<{ m: Msg }> = ({ m }) => {
  if (m.role === 'user') {
    return (
      <div className="mb-2">
        <span style={{ color: 'var(--neon-cyan)' }}>guest&gt; </span>
        <span style={{ color: 'var(--text-primary)' }}>{m.text}</span>
      </div>
    );
  }
  return (
    <div className="mb-2">
      <span style={{ color: 'var(--neon-green)' }}>chana&gt; </span>
      <span
        style={{
          color: m.text.startsWith('[ ! ]') ? 'var(--neon-pink)' : 'var(--text-secondary)',
          whiteSpace: 'pre-wrap',
        }}
      >
        {m.text}
      </span>
      {m.pending && <span className="cursor-blink" style={{ height: '0.7em', width: 5 }} />}
    </div>
  );
};

async function safeText(r: Response): Promise<string> {
  try {
    return await r.text();
  } catch {
    return '';
  }
}

export default ChanaChat;
