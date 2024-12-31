class SoundGenerator {
  private audioContext: AudioContext;
  private sampleRate: number;

  constructor() {
    this.audioContext = new AudioContext();
    this.sampleRate = this.audioContext.sampleRate;
  }

  private async generateBuffer(duration: number, fn: (t: number) => number): Promise<ArrayBuffer> {
    const length = Math.floor(duration * this.sampleRate);
    const buffer = this.audioContext.createBuffer(1, length, this.sampleRate);
    const channel = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / this.sampleRate;
      channel[i] = fn(t);
    }

    // 转换为WAV格式
    const wavData = this.bufferToWav(buffer);
    return wavData;
  }

  private bufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const numChannels = 1;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const samples = buffer.getChannelData(0);
    const dataLength = samples.length * bytesPerSample;
    const bufferLength = 44 + dataLength;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);

    // WAV文件头
    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);

    // 写入音频数据
    const volume = 0.5;
    let offset = 44;
    for (let i = 0; i < samples.length; i++) {
      const sample = Math.max(-1, Math.min(1, samples[i])) * volume;
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }

    return arrayBuffer;
  }

  async generateMoveSound(): Promise<ArrayBuffer> {
    return this.generateBuffer(0.1, t => {
      const freq = 800 - t * 4000;
      return Math.sin(2 * Math.PI * freq * t) * Math.exp(-10 * t);
    });
  }

  async generateEatSound(): Promise<ArrayBuffer> {
    return this.generateBuffer(0.2, t => {
      const freq = 400 + Math.sin(2 * Math.PI * 10 * t) * 100;
      return Math.sin(2 * Math.PI * freq * t) * Math.exp(-5 * t);
    });
  }

  async generateDieSound(): Promise<ArrayBuffer> {
    return this.generateBuffer(0.3, t => {
      const freq = 200 - t * 300;
      return Math.sin(2 * Math.PI * freq * t) * Math.exp(-3 * t);
    });
  }

  async generatePauseSound(): Promise<ArrayBuffer> {
    return this.generateBuffer(0.1, t => {
      const freq = 600;
      return Math.sin(2 * Math.PI * freq * t) * Math.exp(-10 * t);
    });
  }

  async generateAllSounds(): Promise<Record<string, ArrayBuffer>> {
    return {
      move: await this.generateMoveSound(),
      eat: await this.generateEatSound(),
      die: await this.generateDieSound(),
      pause: await this.generatePauseSound()
    };
  }
}

export const soundGenerator = new SoundGenerator(); 