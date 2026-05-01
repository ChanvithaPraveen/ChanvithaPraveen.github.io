import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  showScan?: boolean;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'guest@chanvitha:~$',
  children,
  className = '',
  showScan = false,
}) => {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-amber" />
        <span className="terminal-dot dot-green" />
        <span style={{ marginLeft: 12, color: 'var(--text-secondary)' }}>{title}</span>
      </div>
      {showScan && <div className="scanning-line" />}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
};

export default TerminalWindow;
