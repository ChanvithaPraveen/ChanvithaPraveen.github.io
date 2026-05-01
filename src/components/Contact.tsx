import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionHeader from './ui/SectionHeader';
import TerminalWindow from './ui/TerminalWindow';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';

// EmailJS configuration — values come from .env.local (NEXT_PUBLIC_*).
// See EMAIL_SETUP.md in the repo root for step-by-step setup.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

type SendStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<SendStatus>('idle');
  const [errorText, setErrorText] = useState('');

  const isConfigured =
    EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    if (!isConfigured) {
      // Fallback to mailto if env vars are missing (e.g. during local dev)
      const subject = encodeURIComponent(`[portfolio] message from ${name || 'visitor'}`);
      const body = encodeURIComponent(`${msg}\n\n--\n${name}\n${email}`);
      window.location.href = `mailto:chanvithapraween@gmail.com?subject=${subject}&body=${body}`;
      setStatus('success');
      return;
    }

    setStatus('sending');
    setErrorText('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: msg,
          to_email: 'chanvithapraween@gmail.com',
          reply_to: email,
          subject: `[portfolio] message from ${name}`,
          time: new Date().toUTCString(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setName('');
      setEmail('');
      setMsg('');
    } catch (err: any) {
      const message =
        err?.text ||
        err?.message ||
        'transmission failed — please try again or email directly.';
      setErrorText(message);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16">
      <SectionHeader
        index="08"
        command="ssh -p 22 chanvitha@portfolio"
        title="establish_link()"
        subtitle="Open a secure channel · response time ~24h"
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TerminalWindow title="./send_message --interactive">
            <form onSubmit={handleSubmit} className="p-5 space-y-3 font-mono">
              <div>
                <label className="block text-[12px] text-[var(--neon-cyan)] mb-1">
                  <span className="text-[var(--text-muted)]">$ </span>--name
                </label>
                <input
                  type="text"
                  required
                  disabled={status === 'sending'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="enter your name..."
                  maxLength={120}
                />
              </div>
              <div>
                <label className="block text-[12px] text-[var(--neon-cyan)] mb-1">
                  <span className="text-[var(--text-muted)]">$ </span>--email
                </label>
                <input
                  type="email"
                  required
                  disabled={status === 'sending'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@domain.com"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="block text-[12px] text-[var(--neon-cyan)] mb-1">
                  <span className="text-[var(--text-muted)]">$ </span>--payload
                </label>
                <textarea
                  required
                  disabled={status === 'sending'}
                  rows={5}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="type your message here..."
                  maxLength={5000}
                />
              </div>
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <button
                  type="submit"
                  className="btn-cyber"
                  disabled={status === 'sending'}
                  style={status === 'sending' ? { opacity: 0.6, cursor: 'wait' } : undefined}
                >
                  <SendIcon style={{ fontSize: 14 }} />
                  {status === 'sending' ? 'transmitting...' : 'transmit'}
                </button>

                {status === 'sending' && (
                  <span className="text-[var(--neon-amber)] text-[12px]">
                    <span className="cursor-blink" style={{ height: '0.7em', width: 5 }} />{' '}
                    encrypting payload...
                  </span>
                )}

                {status === 'success' && (
                  <span className="text-[var(--neon-green)] text-[12px]">
                    [ ✓ packet dispatched · response within ~24h ]
                  </span>
                )}

                {status === 'error' && (
                  <span className="text-[var(--neon-pink)] text-[12px]">
                    [ ✗ {errorText} ]
                  </span>
                )}
              </div>

              {!isConfigured && process.env.NODE_ENV !== 'production' && (
                <div
                  className="mt-3 text-[11px] p-2 font-mono"
                  style={{
                    border: '1px dashed var(--neon-amber)',
                    background: 'rgba(255, 176, 0, 0.06)',
                    color: 'var(--neon-amber)',
                  }}
                >
                  ⚠ EmailJS not configured — using mailto fallback. See{' '}
                  <code style={{ color: 'var(--neon-cyan)' }}>EMAIL_SETUP.md</code> to enable
                  real notifications.
                </div>
              )}
            </form>
          </TerminalWindow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-5"
        >
          <TerminalWindow title="./direct_channels --json">
            <div className="p-5 font-mono text-[13px] space-y-3">
              <ContactRow
                Icon={EmailIcon}
                label="email"
                value="chanvithapraween@gmail.com"
                href="mailto:chanvithapraween@gmail.com"
              />
              <ContactRow
                Icon={GitHubIcon}
                label="github"
                value="github.com/ChanvithaPraveen"
                href="https://github.com/ChanvithaPraveen"
              />
              <ContactRow
                Icon={LinkedInIcon}
                label="linkedin"
                value="linkedin.com/in/chanvithapraveen"
                href="https://www.linkedin.com/in/chanvithapraveen/"
              />
              <div className="border-t border-[var(--border-color)] pt-3 text-[12px] text-[var(--text-secondary)]">
                <div className="text-[var(--text-muted)] mb-1">{`# availability`}</div>
                <div>
                  <span className="text-[var(--neon-amber)]">●</span>{' '}
                  <span className="text-[var(--neon-green)]">accepting collaborations</span>
                </div>
                <div>
                  <span className="text-[var(--neon-amber)]">●</span>{' '}
                  <span className="text-[var(--neon-green)]">open to opportunities</span>
                </div>
                <div>
                  <span className="text-[var(--neon-amber)]">●</span>{' '}
                  <span className="text-[var(--neon-green)]">ready to ship</span>
                </div>
              </div>
            </div>
          </TerminalWindow>

          <TerminalWindow title="./pgp.key">
            <div className="p-5 font-mono text-[11.5px] text-[var(--text-secondary)] leading-5">
              <div className="text-[var(--text-muted)] mb-2">{`// fingerprint snippet`}</div>
              <pre className="text-[var(--neon-green)] whitespace-pre-wrap break-all">
{`-----BEGIN PGP PUBLIC KEY BLOCK-----
xsBNBGhA1xCh4nv1th4Pr4ve3n1nT3rn3t...
< this is a stylized placeholder >
< replace with your real public key >
-----END PGP PUBLIC KEY BLOCK-----`}
              </pre>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
};

const ContactRow: React.FC<{ Icon: any; label: string; value: string; href: string }> = ({
  Icon,
  label,
  value,
  href,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 group p-2 -m-2 hover:bg-[rgba(0,255,65,0.04)]"
    style={{ textDecoration: 'none' }}
  >
    <div className="w-9 h-9 grid place-items-center border border-[var(--border-color)] text-[var(--neon-green)] group-hover:border-[var(--neon-green)]">
      <Icon style={{ fontSize: 16 }} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{label}</div>
      <div className="text-[var(--text-primary)] truncate group-hover:text-[var(--neon-green)]">
        {value}
      </div>
    </div>
  </a>
);

export default Contact;
