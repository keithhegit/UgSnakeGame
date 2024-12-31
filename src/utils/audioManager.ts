/**
 * 音效管理器
 */
class AudioManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private bgm: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  constructor() {
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;
    
    try {
      await this.loadSounds();
      await this.initBGM();
      this.isInitialized = true;
    } catch (err) {
      console.warn('Failed to initialize audio:', err);
    }
  }

  private async loadSounds() {
    const soundFiles = {
      eat: '/sounds/eat.wav',
      die: '/sounds/die.wav',
      move: '/sounds/move.wav',
      pause: '/sounds/pause.wav'
    };

    for (const [key, path] of Object.entries(soundFiles)) {
      try {
        const audio = new Audio(path);
        audio.preload = 'auto';
        audio.volume = 0.3;
        await audio.load();
        this.sounds.set(key, audio);
      } catch (err) {
        console.warn(`Failed to load sound: ${key}`, err);
      }
    }
  }

  private async initBGM() {
    try {
      this.bgm = new Audio('/audio/game-bgm.mp3');
      this.bgm.loop = true;
      this.bgm.volume = 0.2;
      this.bgm.preload = 'auto';
      await this.bgm.load();
    } catch (err) {
      console.warn('Failed to load BGM:', err);
      this.bgm = null;
    }
  }

  async play(soundName: string) {
    if (this.isMuted) return;
    
    try {
      if (!this.isInitialized) {
        await this.init();
      }
      
      const sound = this.sounds.get(soundName);
      if (sound) {
        const soundClone = sound.cloneNode() as HTMLAudioElement;
        soundClone.volume = sound.volume;
        try {
          await soundClone.play();
        } catch (err) {
          console.warn(`Failed to play sound: ${soundName}`, err);
        }
      }
    } catch (err) {
      console.warn(`Failed to play sound: ${soundName}`, err);
    }
  }

  async startBGM() {
    if (this.isMuted || !this.bgm) return;
    
    try {
      if (!this.isInitialized) {
        await this.init();
      }

      this.bgm.currentTime = 0;
      this.bgm.playbackRate = 1;
      
      try {
        await this.bgm.play();
      } catch (err) {
        // 如果直接播放失败，尝试在用户交互后播放
        const playOnInteraction = () => {
          if (this.bgm && !this.isMuted) {
            this.bgm.play().catch(console.warn);
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
          }
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('keydown', playOnInteraction);
      }
    } catch (err) {
      console.warn('Failed to play BGM:', err);
    }
  }

  stopBGM() {
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.currentTime = 0;
    }
  }

  setBGMSpeed(speed: number) {
    if (this.bgm) {
      this.bgm.playbackRate = speed;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgm) {
      if (this.isMuted) {
        this.bgm.pause();
      } else {
        this.bgm.play().catch(console.warn);
      }
    }
    return this.isMuted;
  }

  setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.bgm) {
      if (this.isMuted) {
        this.bgm.pause();
      } else {
        this.bgm.play().catch(console.warn);
      }
    }
  }

  isSoundMuted() {
    return this.isMuted;
  }
}

export const audioManager = new AudioManager(); 