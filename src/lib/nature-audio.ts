// Pure client-side nature & heritage sound synthesizer using Web Audio API
// Generates gentle water flow, deep temple bells, forest birdsong, and peaceful forest chimes.
// No external dependencies, 0 KB assets, seamless loop, 100% legal CC0 audio synthesis.

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let currentTheme = "water-chime";
let activeBaseNode: AudioNode | null = null;
let activeGainNode: GainNode | null = null;
let periodicTimer: number | null = null;

type AudioListener = (playing: boolean, theme: string) => void;
const listeners = new Set<AudioListener>();

export function subscribeNatureAudio(listener: AudioListener): () => void {
  listeners.add(listener);
  listener(isPlaying, currentTheme);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach((fn) => {
    try {
      fn(isPlaying, currentTheme);
    } catch {}
  });
}

function createPinkNoise(context: AudioContext): AudioBufferSourceNode {
  const bufferSize = context.sampleRate * 2;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0,
    b1 = 0,
    b2 = 0,
    b3 = 0,
    b4 = 0,
    b5 = 0,
    b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
    b6 = white * 0.115926;
  }
  const noise = context.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  return noise;
}

function playTempleBell(ctx: AudioContext, masterGain: GainNode) {
  // Harmonic series of a traditional bronze bell
  const baseFreq = 164.81; // E3 deep bell
  const harmonics = [
    { freq: baseFreq, gain: 0.06, decay: 4.5 },
    { freq: baseFreq * 2.02, gain: 0.04, decay: 3.5 },
    { freq: baseFreq * 2.98, gain: 0.02, decay: 2.8 },
    { freq: baseFreq * 4.15, gain: 0.015, decay: 1.8 },
  ];

  harmonics.forEach((h) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(h.freq, ctx.currentTime);

    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(h.gain, ctx.currentTime + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + h.decay);

    osc.connect(g);
    g.connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + h.decay + 0.1);
  });
}

function playBirdChirp(ctx: AudioContext, masterGain: GainNode) {
  // Gentle bird chirp modulation
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";

  const startFreq = 2200 + Math.random() * 800;
  osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(startFreq + 600, ctx.currentTime + 0.06);
  osc.frequency.exponentialRampToValueAtTime(startFreq - 200, ctx.currentTime + 0.14);

  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);

  osc.connect(g);
  g.connect(masterGain);
  osc.start();
  osc.stop(ctx.currentTime + 0.18);
}

function playChime(ctx: AudioContext, masterGain: GainNode) {
  const notes = [587.33, 659.25, 783.99, 880.0, 1046.5]; // Pentatonic
  const note = notes[Math.floor(Math.random() * notes.length)] || 659.25;

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(note, ctx.currentTime);

  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

  osc.connect(g);
  g.connect(masterGain);
  osc.start();
  osc.stop(ctx.currentTime + 2.6);
}

function startSynthesizer(theme: string) {
  if (typeof window === "undefined") return false;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return false;

  try {
    if (!audioCtx || audioCtx.state === "closed") {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // Stop existing nodes
    if (periodicTimer) {
      clearInterval(periodicTimer);
      periodicTimer = null;
    }
    if (activeBaseNode) {
      try {
        (activeBaseNode as AudioBufferSourceNode).stop();
        activeBaseNode.disconnect();
      } catch {}
      activeBaseNode = null;
    }

    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    // Smooth fade in
    masterGain.gain.exponentialRampToValueAtTime(0.09, audioCtx.currentTime + 1.2);
    masterGain.connect(audioCtx.destination);
    activeGainNode = masterGain;

    // Pink noise stream filter
    const noise = createPinkNoise(audioCtx);
    const filter = audioCtx.createBiquadFilter();

    if (theme === "temple-bell") {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, audioCtx.currentTime);
      periodicTimer = window.setInterval(() => {
        if (audioCtx && isPlaying && activeGainNode) {
          playTempleBell(audioCtx, activeGainNode);
        }
      }, 6500);
      playTempleBell(audioCtx, activeGainNode);
    } else if (theme === "bird-forest") {
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(650, audioCtx.currentTime);
      filter.Q.setValueAtTime(1.5, audioCtx.currentTime);
      periodicTimer = window.setInterval(() => {
        if (audioCtx && isPlaying && activeGainNode) {
          playBirdChirp(audioCtx, activeGainNode);
          if (Math.random() > 0.5) {
            setTimeout(() => {
              if (audioCtx && isPlaying && activeGainNode) {
                playBirdChirp(audioCtx, activeGainNode);
              }
            }, 250);
          }
        }
      }, 4500);
      playBirdChirp(audioCtx, activeGainNode);
    } else {
      // Default: water-chime & mountain-breeze
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, audioCtx.currentTime);

      const lfo = audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.2, audioCtx.currentTime);
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(160, audioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      periodicTimer = window.setInterval(() => {
        if (audioCtx && isPlaying && activeGainNode) {
          playChime(audioCtx, activeGainNode);
        }
      }, 7000);
      playChime(audioCtx, activeGainNode);
    }

    noise.connect(filter);
    filter.connect(masterGain);
    noise.start();
    activeBaseNode = noise;

    isPlaying = true;
    currentTheme = theme;
    notifyListeners();
    return true;
  } catch (err) {
    console.error("Audio synthesizer error:", err);
    return false;
  }
}

export function playNatureAudio(theme = "water-chime"): boolean {
  return startSynthesizer(theme);
}

export function toggleNatureAudio(theme?: string): boolean {
  if (isPlaying) {
    stopNatureAudio();
    return false;
  }
  return startSynthesizer(theme || currentTheme);
}

export function setAmbienceTheme(theme: string) {
  currentTheme = theme;
  if (isPlaying) {
    startSynthesizer(theme);
  }
}

export function stopNatureAudio() {
  if (periodicTimer) {
    clearInterval(periodicTimer);
    periodicTimer = null;
  }
  if (activeGainNode && audioCtx && audioCtx.state !== "closed") {
    try {
      activeGainNode.gain.setValueAtTime(activeGainNode.gain.value, audioCtx.currentTime);
      activeGainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (activeBaseNode) {
          try {
            (activeBaseNode as AudioBufferSourceNode).stop();
            activeBaseNode.disconnect();
          } catch {}
          activeBaseNode = null;
        }
      }, 900);
    } catch {}
  } else if (activeBaseNode) {
    try {
      (activeBaseNode as AudioBufferSourceNode).stop();
      activeBaseNode.disconnect();
    } catch {}
    activeBaseNode = null;
  }

  isPlaying = false;
  notifyListeners();
}

export function isNatureAudioPlaying(): boolean {
  return isPlaying;
}

export function getCurrentAmbienceTheme(): string {
  return currentTheme;
}
