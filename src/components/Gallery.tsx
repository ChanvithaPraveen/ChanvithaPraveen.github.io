import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import galleryItems from '../data/gallery';
import SectionHeader from './ui/SectionHeader';
import TerminalWindow from './ui/TerminalWindow';
import CloseIcon from '@mui/icons-material/Close';

interface GalleryItem {
  image: string;
  title: string;
  description: string;
}

const Gallery = () => {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const items = galleryItems as GalleryItem[];

  return (
    <section id="gallery" className="py-12 md:py-16">
      <SectionHeader
        index="07"
        command="render --gallery --resolution=full"
        title="memory.bank"
        subtitle={`${items.length} encrypted memories · click to decrypt`}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
            onClick={() => setActive(it)}
            className="relative group aspect-[4/3] overflow-hidden border border-[var(--border-color)] hover:border-[var(--neon-green)] transition-all"
            style={{ background: 'rgba(0, 0, 0, 0.4)', cursor: 'pointer' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.image}
              alt={it.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              style={{ filter: 'brightness(0.7) saturate(0.7) hue-rotate(-10deg)' }}
            />
            <div
              className="absolute inset-0 transition-opacity"
              style={{
                background:
                  'linear-gradient(to top, rgba(10,14,10,0.95) 0%, rgba(10,14,10,0.2) 60%, transparent 100%)',
              }}
            />
            <div className="absolute top-1.5 left-1.5 text-[9px] font-mono text-[var(--neon-green)] bg-black/70 border border-[var(--border-color)] px-1.5 py-0.5">
              MEM_{String(i + 1).padStart(3, '0')}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 text-left">
              <div className="text-[var(--neon-green)] text-[12px] font-mono font-semibold leading-tight line-clamp-2">
                {it.title}
              </div>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
              <span className="text-[var(--neon-cyan)] text-[10px] font-mono bg-black/80 border border-[var(--neon-cyan)] px-2 py-1">
                &gt;_ DECRYPT
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="terminal-window w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="terminal-header">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-amber" />
                <span className="terminal-dot dot-green" />
                <span style={{ marginLeft: 12 }}>./memory --decrypted</span>
                <button
                  onClick={() => setActive(null)}
                  className="ml-auto text-[var(--text-secondary)]"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  aria-label="close"
                >
                  <CloseIcon style={{ fontSize: 18 }} />
                </button>
              </div>
              <div className="bg-black grid place-items-center max-h-[60vh] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.image} alt={active.title} className="max-w-full max-h-[60vh] object-contain" />
              </div>
              <div className="p-4 border-t border-[var(--border-color)]">
                <div className="text-[var(--neon-green)] font-bold">{active.title}</div>
                <p className="text-[var(--text-secondary)] text-[13px] mt-1">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
