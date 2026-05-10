import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useSfx } from '../../hooks/useSfx';

interface Props {
  className?: string;
  size?: number;
  compact?: boolean;
}

const SfxToggle = ({ className = '', size = 14, compact = false }: Props) => {
  const { muted, toggle } = useSfx();
  const label = muted ? 'sfx --off' : 'sfx --on';

  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'enable sound effects' : 'mute sound effects'}
      title={muted ? 'enable hacker sfx' : 'mute hacker sfx'}
      className={`btn-cyber ${className}`}
      style={{
        padding: compact ? '4px 8px' : '4px 10px',
        fontSize: 11,
        opacity: muted ? 0.75 : 1,
      }}
    >
      {muted ? (
        <VolumeOffIcon style={{ fontSize: size }} />
      ) : (
        <VolumeUpIcon style={{ fontSize: size }} />
      )}
      {!compact && <span style={{ marginLeft: 6 }}>{label}</span>}
    </button>
  );
};

export default SfxToggle;
