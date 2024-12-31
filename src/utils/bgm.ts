/**
 * 背景音乐管理类
 */
class BGMManager {
  private bgm: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;

  constructor() {
    // 创建音频元素
    this.bgm = new Audio('/audio/game-bgm.mp3');
    this.bgm.loop = true;  // 循环播放
  }

  /**
   * 开始播放背景音乐
   */
  start() {
    if (this.bgm && !this.isPlaying) {
      this.bgm.playbackRate = 1.0;  // 正常速度
      this.bgm.play().catch(error => {
        console.warn('BGM播放失败:', error);
      });
      this.isPlaying = true;
    }
  }

  /**
   * 加速播放背景音乐
   */
  speedUp() {
    if (this.bgm && this.isPlaying) {
      this.bgm.playbackRate = 2.0;  // 2倍速
    }
  }

  /**
   * 恢复正常速度
   */
  normalSpeed() {
    if (this.bgm && this.isPlaying) {
      this.bgm.playbackRate = 1.0;
    }
  }

  /**
   * 停止播放背景音乐
   */
  stop() {
    if (this.bgm && this.isPlaying) {
      this.bgm.pause();
      this.bgm.currentTime = 0;
      this.isPlaying = false;
    }
  }

  /**
   * 设置音量
   * @param volume 音量值 (0.0 到 1.0)
   */
  setVolume(volume: number) {
    if (this.bgm) {
      this.bgm.volume = Math.max(0, Math.min(1, volume));
    }
  }
}

// 导出单例实例
export const bgmManager = new BGMManager(); 