/**
 * Lightweight Web Audio synth for hacker/terminal SFX.
 * Zero asset deps — every sound is generated from oscillators.
 *
 * Default state is muted. The user must opt-in via the SfxToggle
 * (browser autoplay policy + accessibility).
 */

export type SfxName =
  | 'click'
  | 'hover'
  | 'beep'
  | 'deny'
  | 'success'
  | 'boot'
  | 'glitch'
  | 'type'
  | 'open'
  | 'close';

const STORAGE_KEY = 'sfx-muted';

class SfxEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted = true;
  private listeners = new Set<(m: boolean) => void>();
  private hoverThrottle = 0;

  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const Ctor =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!Ctor) return;
      const ctx: AudioContext = new Ctor();
      const master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);
      this.ctx = ctx;
      this.master = master;
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) this.muted = stored === '1';
    } catch {
      /* ignore */
    }
  }

  isMuted() {
    return this.muted;
  }

  setMuted(m: boolean) {
    this.muted = m;
    try {
      localStorage.setItem(STORAGE_KEY, m ? '1' : '0');
    } catch {
      /* ignore */
    }
    this.listeners.forEach((cb) => cb(m));
  }

  subscribe(cb: (m: boolean) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private tone(
    freq: number,
    dur: number,
    type: OscillatorType,
    gain = 0.05,
    delay = 0,
    sweepTo?: number
  ) {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (sweepTo !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(40, sweepTo),
        t0 + dur
      );
    }
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + Math.min(0.005, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  private noise(dur: number, gain = 0.04, delay = 0) {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1800;
    src.connect(hp).connect(g).connect(this.master);
    src.start(t0);
    src.stop(t0 + dur);
  }

  play(name: SfxName) {
    if (this.muted) return;
    if (!this.ctx) this.init();
    if (!this.ctx || this.ctx.state === 'suspended') void this.ctx?.resume();

    switch (name) {
      case 'click':
        this.tone(880, 0.05, 'square', 0.06);
        break;
      case 'hover': {
        const now = Date.now();
        if (now - this.hoverThrottle < 60) return;
        this.hoverThrottle = now;
        this.tone(1400, 0.03, 'sine', 0.025);
        break;
      }
      case 'beep':
        this.tone(720, 0.12, 'square', 0.06);
        break;
      case 'deny':
        this.tone(180, 0.18, 'sawtooth', 0.07);
        this.tone(120, 0.22, 'sawtooth', 0.06, 0.06);
        break;
      case 'success':
        this.tone(660, 0.08, 'square', 0.05);
        this.tone(880, 0.08, 'square', 0.05, 0.08);
        this.tone(1320, 0.16, 'square', 0.05, 0.16);
        break;
      case 'boot':
        for (let i = 0; i < 5; i++) {
          this.tone(280 + i * 220, 0.09, 'square', 0.04, i * 0.07);
        }
        this.noise(0.18, 0.025, 0.35);
        break;
      case 'glitch':
        for (let i = 0; i < 8; i++) {
          this.tone(
            200 + Math.random() * 1600,
            0.04,
            'sawtooth',
            0.04,
            i * 0.035
          );
        }
        break;
      case 'type':
        this.tone(1500 + Math.random() * 300, 0.02, 'square', 0.02);
        break;
      case 'open':
        this.tone(400, 0.18, 'square', 0.05, 0, 1200);
        break;
      case 'close':
        this.tone(1200, 0.18, 'square', 0.05, 0, 300);
        break;
    }
  }
}

export const sfx = new SfxEngine();
