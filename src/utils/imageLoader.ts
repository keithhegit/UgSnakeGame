import { Position } from '../types/game';

export interface SnakeImages {
  head_up: HTMLImageElement;
  head_down: HTMLImageElement;
  head_left: HTMLImageElement;
  head_right: HTMLImageElement;
  body_horizontal: HTMLImageElement;
  body_vertical: HTMLImageElement;
  body_bottomleft: HTMLImageElement;
  body_bottomright: HTMLImageElement;
  body_topleft: HTMLImageElement;
  body_topright: HTMLImageElement;
  tail_up: HTMLImageElement;
  tail_down: HTMLImageElement;
  tail_left: HTMLImageElement;
  tail_right: HTMLImageElement;
  food: HTMLImageElement;
  stone: HTMLImageElement;
}

class ImageLoader {
  private images: SnakeImages | null = null;

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async loadAllImages(): Promise<SnakeImages> {
    if (this.images) return this.images;

    const basePath = '/images/snake/';
    
    // 加载所有图片
    const headUp = this.loadImage(`${basePath}head_up.png`);
    const headDown = this.loadImage(`${basePath}head_down.png`);
    const headLeft = this.loadImage(`${basePath}head_left.png`);
    const headRight = this.loadImage(`${basePath}head_right.png`);

    const bodyTopleft = this.loadImage(`${basePath}body_topleft.png`);
    const bodyTopright = this.loadImage(`${basePath}body_topright.png`);
    const bodyBottomleft = this.loadImage(`${basePath}body_bottomleft.png`);
    const bodyBottomright = this.loadImage(`${basePath}body_bottomright.png`);
    const bodyHorizontal = this.loadImage(`${basePath}body_horizontal.png`);
    const bodyVertical = this.loadImage(`${basePath}body_vertical.png`);

    const tailUp = this.loadImage(`${basePath}tail_up.png`);
    const tailDown = this.loadImage(`${basePath}tail_down.png`);
    const tailLeft = this.loadImage(`${basePath}tail_left.png`);
    const tailRight = this.loadImage(`${basePath}tail_right.png`);

    const food = this.loadImage(`${basePath}food.png`);
    const stone = this.loadImage(`${basePath}stone.png`);

    // 等待所有图片加载完成
    const [
      headUpImg, headDownImg, headLeftImg, headRightImg,
      bodyTopleftImg, bodyToprightImg, bodyBottomleftImg, bodyBottomrightImg,
      bodyHorizontalImg, bodyVerticalImg,
      tailUpImg, tailDownImg, tailLeftImg, tailRightImg,
      foodImg, stoneImg
    ] = await Promise.all([
      headUp, headDown, headLeft, headRight,
      bodyTopleft, bodyTopright, bodyBottomleft, bodyBottomright,
      bodyHorizontal, bodyVertical,
      tailUp, tailDown, tailLeft, tailRight,
      food, stone
    ]);

    this.images = {
      head_up: headUpImg,
      head_down: headDownImg,
      head_left: headLeftImg,
      head_right: headRightImg,
      body_horizontal: bodyHorizontalImg,
      body_vertical: bodyVerticalImg,
      body_bottomleft: bodyBottomleftImg,
      body_bottomright: bodyBottomrightImg,
      body_topleft: bodyTopleftImg,
      body_topright: bodyToprightImg,
      tail_up: tailUpImg,
      tail_down: tailDownImg,
      tail_left: tailLeftImg,
      tail_right: tailRightImg,
      food: foodImg,
      stone: stoneImg
    };

    return this.images;
  }

  getImages(): SnakeImages | null {
    return this.images;
  }

  // 获取蛇尾图片
  getTailImage(tail: Position, beforeTail: Position): HTMLImageElement {
    if (!this.images) throw new Error('Images not loaded');

    // 根据尾巴和前一个节点的相对位置确定朝向
    if (tail.x === beforeTail.x) {
      // 垂直移动
      return tail.y > beforeTail.y ? this.images.tail_up : this.images.tail_down;
    } else {
      // 水平移动
      return tail.x > beforeTail.x ? this.images.tail_left : this.images.tail_right;
    }
  }
}

export const imageLoader = new ImageLoader(); 