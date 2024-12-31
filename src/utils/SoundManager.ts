export class SoundManager {
  private moveSound: HTMLAudioElement;
  private eatSound: HTMLAudioElement;
  private dieSound: HTMLAudioElement;
  private pauseSound: HTMLAudioElement;

  constructor() {
    this.moveSound = new Audio('/sounds/move.mp3');
    this.eatSound = new Audio('/sounds/eat.mp3');
    this.dieSound = new Audio('/sounds/die.mp3');
    this.pauseSound = new Audio('/sounds/pause.mp3');

    // 预加载音效
    this.moveSound.load();
    this.eatSound.load();
    this.dieSound.load();
    this.pauseSound.load();
  }

  playMove() {
    this.moveSound.currentTime = 0;
    this.moveSound.play().catch(() => {});
  }

  playEat() {
    this.eatSound.currentTime = 0;
    this.eatSound.play().catch(() => {});
  }

  playDie() {
    this.dieSound.currentTime = 0;
    this.dieSound.play().catch(() => {});
  }

  playPause() {
    this.pauseSound.currentTime = 0;
    this.pauseSound.play().catch(() => {});
  }
} 