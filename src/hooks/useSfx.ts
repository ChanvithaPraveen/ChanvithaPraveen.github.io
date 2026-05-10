import { useCallback, useEffect, useState } from 'react';
import { sfx, SfxName } from '../lib/sfx';

export const useSfx = () => {
  const [muted, setMutedState] = useState<boolean>(true);

  useEffect(() => {
    sfx.init();
    setMutedState(sfx.isMuted());
    const unsub = sfx.subscribe(setMutedState);
    return () => {
      unsub();
    };
  }, []);

  const play = useCallback((name: SfxName) => {
    sfx.init();
    sfx.play(name);
  }, []);

  const setMuted = useCallback((m: boolean) => {
    sfx.init();
    sfx.setMuted(m);
  }, []);

  const toggle = useCallback(() => {
    sfx.init();
    const next = !sfx.isMuted();
    sfx.setMuted(next);
    if (!next) sfx.play('boot');
  }, []);

  return { play, muted, setMuted, toggle };
};
