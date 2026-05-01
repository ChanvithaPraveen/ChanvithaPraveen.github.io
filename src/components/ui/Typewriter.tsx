import { useEffect, useMemo, useState } from 'react';

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
  cursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 35,
  delay = 0,
  loop = false,
  cursor = true,
  onComplete,
  className = '',
}) => {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'waiting' | 'typing' | 'pausing' | 'deleting'>('waiting');
  const [index, setIndex] = useState(0);

  const lines = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === 'waiting') {
      timer = setTimeout(() => setPhase('typing'), delay);
    } else if (phase === 'typing') {
      const target = lines[index];
      if (displayed.length < target.length) {
        timer = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length + 1));
        }, speed);
      } else {
        if (loop && lines.length > 1) {
          setPhase('pausing');
        } else {
          onComplete?.();
        }
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('deleting'), 1800);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
      } else {
        setIndex((index + 1) % lines.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [phase, displayed, index, lines, loop, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {cursor && <span className="cursor-blink" />}
    </span>
  );
};

export default Typewriter;
