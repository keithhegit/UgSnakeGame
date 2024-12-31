import { Position } from '../types/game';
import { BOARD_SIZE } from '../constants';

export function generateFood(snakeBody: Position[], obstacles: Position[]): Position {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
  } while (
    snakeBody.some(segment => segment.x === food.x && segment.y === food.y) ||
    obstacles.some(obstacle => obstacle.x === food.x && obstacle.y === food.y)
  );
  return food;
}

export function generateObstacle(
  snakeBody: Position[],
  food: Position,
  obstacles: Position[]
): Position | null {
  let obstacle: Position;
  let attempts = 0;
  const maxAttempts = 50;

  do {
    obstacle = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
    attempts++;

    if (attempts >= maxAttempts) return null;
  } while (
    snakeBody.some(segment => segment.x === obstacle.x && segment.y === obstacle.y) ||
    obstacles.some(existing => existing.x === obstacle.x && existing.y === obstacle.y) ||
    (food.x === obstacle.x && food.y === obstacle.y)
  );

  return obstacle;
}

export function checkCollision(snake: Position[]): boolean {
  const head = snake[0];

  // 检查是否撞到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
} 