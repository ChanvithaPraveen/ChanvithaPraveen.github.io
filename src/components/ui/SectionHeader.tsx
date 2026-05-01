import React from 'react';

interface SectionHeaderProps {
  command: string;
  title: string;
  subtitle?: string;
  index?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ command, title, subtitle, index }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        {index && (
          <span className="section-tag">{index}</span>
        )}
        <span className="text-[var(--text-muted)] text-sm font-mono">{`// `}{command}</span>
      </div>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="neon-text text-2xl md:text-3xl font-bold tracking-wider">
          $ {title}
        </span>
        <span className="cursor-blink" />
      </div>
      {subtitle && (
        <p className="text-[var(--text-secondary)] mt-2 text-sm md:text-base font-mono">
          <span className="text-[var(--neon-amber)]">&gt;</span> {subtitle}
        </p>
      )}
      <div className="mt-4 h-px w-full bg-gradient-to-r from-[var(--neon-green)] via-[var(--neon-cyan)] to-transparent opacity-60" />
    </div>
  );
};

export default SectionHeader;
