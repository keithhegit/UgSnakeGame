export async function generateSoundFiles() {
  const audioContext = new AudioContext();
  const sampleRate = audioContext.sampleRate;

  function generateBuffer(duration: number, fn: (t: number) => number): AudioBuffer {
    const length = Math.floor(duration * sampleRate);
    const buffer = audioContext.createBuffer(1, length, sampleRate);
    const channel = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      channel[i] = fn(t);
    }

    return buffer;
  }

  // 移动音效：短促的滑动声
  const moveSound = generateBuffer(0.1, t => {
    const freq = 800 - t * 4000;
    return Math.sin(2 * Math.PI * freq * t) * Math.exp(-10 * t) * 0.3;
  });

  // 吃食物音效：咀嚼声
  const eatSound = generateBuffer(0.2, t => {
    const freq = 400 + Math.sin(2 * Math.PI * 10 * t) * 100;
    return Math.sin(2 * Math.PI * freq * t) * Math.exp(-5 * t) * 0.5;
  });

  // 游戏结束音效：撞击声
  const dieSound = generateBuffer(0.3, t => {
    const freq = 200 - t * 300;
    return Math.sin(2 * Math.PI * freq * t) * Math.exp(-3 * t) * 0.5;
  });

  // 暂停音效：点击声
  const pauseSound = generateBuffer(0.1, t => {
    const freq = 600;
    return Math.sin(2 * Math.PI * freq * t) * Math.exp(-10 * t) * 0.4;
  });

  return {
    move: moveSound,
    eat: eatSound,
    die: dieSound,
    pause: pauseSound
  };
} 