import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as = 'span' }) => {
  const Tag = as as any;
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {text}
    </Tag>
  );
};

export default GlitchText;
