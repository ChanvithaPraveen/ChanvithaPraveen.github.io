import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LaunchIcon from '@mui/icons-material/Launch';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArticleIcon from '@mui/icons-material/Article';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import publications from '../data/publications';
import SectionHeader from './ui/SectionHeader';
import TerminalWindow from './ui/TerminalWindow';
import { useSfx } from '../hooks/useSfx';

const Publications = () => {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const { play } = useSfx();

  const copyCitation = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      play('success');
      setTimeout(() => setCopiedIdx(null), 1800);
    } catch {
      play('deny');
    }
  };

  return (
    <section id="publications" className="py-12 md:py-16">
      <SectionHeader
        index="07"
        command="grep -ri 'doi' ~/research/papers"
        title="publications.bib"
        subtitle={`${publications.length} peer-reviewed paper · IEEE Xplore indexed`}
      />

      <div className="space-y-5">
        {publications.map((p, i) => {
          const isOpen = expanded === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TerminalWindow title={`paper_0x${(i + 1).toString(16).padStart(2, '0')}.bib`}>
                <div className="p-5 md:p-6 font-mono">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-11 h-11 grid place-items-center border border-[var(--neon-green)] text-[var(--neon-green)] shrink-0"
                      style={{
                        background: 'rgba(0, 255, 65, 0.08)',
                        boxShadow: '0 0 10px rgba(0, 255, 65, 0.25)',
                      }}
                    >
                      <ArticleIcon style={{ fontSize: 20 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10.5px] text-[var(--neon-green)] mb-0.5">
                        <VerifiedIcon style={{ fontSize: 12 }} />
                        PEER-REVIEWED · {p.publisher.toUpperCase()}
                      </div>
                      <div className="text-[var(--text-primary)] text-[14.5px] md:text-[15.5px] font-bold leading-snug">
                        {p.title}
                      </div>
                      <div className="text-[var(--text-secondary)] text-[12px] mt-1">
                        {p.authors.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-[12px] text-[var(--text-secondary)] border-t border-b border-[var(--border-color)] py-3 my-3">
                    <div>
                      <span className="text-[var(--text-muted)]">venue</span>
                      <span className="text-[var(--text-muted)] mx-1">::</span>
                      <span className="text-[var(--neon-cyan)]">{p.venue}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">location</span>
                      <span className="text-[var(--text-muted)] mx-1">::</span>
                      <span className="text-[var(--text-primary)]">{p.location}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">year</span>
                      <span className="text-[var(--text-muted)] mx-1">::</span>
                      <span className="text-[var(--neon-amber)]">{p.year}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">pages</span>
                      <span className="text-[var(--text-muted)] mx-1">::</span>
                      <span className="text-[var(--text-primary)]">{p.pages}</span>
                    </div>
                    <div className="sm:col-span-2 break-all">
                      <span className="text-[var(--text-muted)]">doi</span>
                      <span className="text-[var(--text-muted)] mx-1">::</span>
                      <span className="text-[var(--neon-pink)]">{p.doi}</span>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="text-[12px] text-[var(--text-muted)] mb-1.5">{`# abstract`}</div>
                        <p className="text-[13px] text-[var(--text-primary)] leading-6 border-l-2 border-[var(--neon-green)] pl-3 mb-4">
                          {p.abstract}
                        </p>

                        <div className="text-[12px] text-[var(--text-muted)] mb-2">{`# keywords`}</div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.keywords.map((k) => (
                            <span key={k} className="tag">
                              {k}
                            </span>
                          ))}
                        </div>

                        <div className="text-[12px] text-[var(--text-muted)] mb-1.5 flex items-center justify-between">
                          <span>{`# citation (IEEE)`}</span>
                          <button
                            onClick={() => copyCitation(p.citation, i)}
                            className="text-[11px] flex items-center gap-1 text-[var(--neon-cyan)] hover:text-[var(--neon-green)]"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                          >
                            <ContentCopyIcon style={{ fontSize: 11 }} />
                            {copiedIdx === i ? 'copied' : 'copy'}
                          </button>
                        </div>
                        <pre
                          className="text-[11.5px] text-[var(--text-secondary)] leading-5 p-3 border border-[var(--border-color)] whitespace-pre-wrap break-words"
                          style={{ background: 'rgba(0,0,0,0.5)' }}
                        >
                          {p.citation}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
                    <button
                      onClick={() => {
                        play(isOpen ? 'close' : 'open');
                        setExpanded(isOpen ? null : i);
                      }}
                      className="text-[12px] font-mono text-[var(--neon-green)] hover:text-[var(--neon-cyan)]"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <span className="text-[var(--neon-amber)]">$ </span>
                      {isOpen ? 'collapse --abstract' : 'cat ./abstract.txt'}
                    </button>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => play('beep')}
                      className="btn-cyber"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                    >
                      <LaunchIcon style={{ fontSize: 14 }} /> open on IEEE Xplore
                    </a>
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Publications;
