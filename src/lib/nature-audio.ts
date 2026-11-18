// Pure client-side nature sound synthesizer using Web Audio API
// Generates gentle water flow and occasional peaceful forest chimes without any external audio files.

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let waterNode: AudioNode | null = null;
let chimeInterval: number | null = null;

function createPinkNoise(context: AudioContext): AudioBufferSourceNode {
  const bufferSize = context.sampleRate * 2;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
    b6 = white * 0.115926;
  }
  const noise = context.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  return noise;
}

export function toggleNatureAudio(): boolean {
  if (typeof window === "undefined") return false;

  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return false;

  if (isPlaying) {
    stopNatureAudio();
    return false;
  }

  try {
    if (!audioCtx || audioCtx.state === "closed") {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // Water stream simulator (filtered pink noise with slow oscillating cutoff)
    const noise = createPinkNoise(audioCtx);
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    // LFO for water wave gently undulating
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.2, audioCtx.currentTime);
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(160, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);
    noise.start();

    waterNode = noise;
    isPlaying = true;

    // Peaceful soft chime / wind chime sound every 6-9 seconds
    const playChime = () => {
      if (!audioCtx || !isPlaying) return;
      const notes = [587.33, 659.25, 783.99, 880.0, 1046.5]; // D5, E5, G5, A5, C6 pentatonic
      const note = notes[Math.floor(Math.random() * notes.length)] || 659.25;

      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(note, audioCtx.currentTime);

      noteGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

      osc.connect(noteGain);
      noteGain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 2.6);
    };

    chimeInterval = window.setInterval(playChime, 7000);
    playChime();

    return true;
  } catch (e) {
    console.error("Audio error:", e);
    return false;
  }
}

export function stopNatureAudio() {
  if (chimeInterval) {
    clearInterval(chimeInterval);
    chimeInterval = null;
  }
  if (waterNode) {
    try {
      (waterNode as AudioBufferSourceNode).stop();
      waterNode.disconnect();
    } catch {}
    waterNode = null;
  }
  if (audioCtx && audioCtx.state !== "closed") {
    try {
      audioCtx.suspend();
    } catch {}
  }
  isPlaying = false;
}

export function isNatureAudioPlaying(): boolean {
  return isPlaying;
}
