import { Snake } from '../types/snake';
import { Food } from '../types/food';
import { Obstacle } from '../types/obstacle';

interface DrawGameProps {
  gridSize: number;
  cellSize: number;
  snake: Snake;
  food: Food | null;
  obstacles: Obstacle[];
  isDark: boolean;
}

const drawSnake = (ctx: CanvasRenderingContext2D, snake: Snake, cellSize: number) => {
  ctx.fillStyle = '#3498DB';
  snake.body.forEach(({ x, y }, index) => {
    const size = index === 0 ? cellSize - 2 : cellSize - 4;
    ctx.fillRect(
      x * cellSize + (cellSize - size) / 2,
      y * cellSize + (cellSize - size) / 2,
      size,
      size
    );
  });
};

const drawFood = (ctx: CanvasRenderingContext2D, food: Food, cellSize: number) => {
  ctx.fillStyle = '#E74C3C';
  ctx.beginPath();
  ctx.arc(
    food.position.x * cellSize + cellSize / 2,
    food.position.y * cellSize + cellSize / 2,
    cellSize / 3,
    0,
    Math.PI * 2
  );
  ctx.fill();
};

const drawObstacle = (ctx: CanvasRenderingContext2D, obstacle: Obstacle, cellSize: number) => {
  ctx.fillStyle = '#95A5A6';
  ctx.fillRect(
    obstacle.position.x * cellSize + 2,
    obstacle.position.y * cellSize + 2,
    cellSize - 4,
    cellSize - 4
  );
};

export const drawGame = (ctx: CanvasRenderingContext2D, props: DrawGameProps) => {
  const { gridSize, cellSize, snake, food, obstacles, isDark } = props;

  // Draw grid background
  drawGrid(ctx, gridSize, cellSize, isDark);
  
  // Draw snake
  drawSnake(ctx, snake, cellSize);
  
  // Draw food
  if (food) {
    drawFood(ctx, food, cellSize);
  }
  
  // Draw obstacles
  obstacles.forEach(obstacle => {
    drawObstacle(ctx, obstacle, cellSize);
  });
};

const drawGrid = (
  ctx: CanvasRenderingContext2D, 
  gridSize: number, 
  cellSize: number,
  isDark: boolean
) => {
  // Fill background
  ctx.fillStyle = isDark ? '#1a1a1a' : '#FFFFFF';
  ctx.fillRect(0, 0, gridSize * cellSize, gridSize * cellSize);

  // Draw checkerboard pattern
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if ((x + y) % 2 === 0) {
        ctx.fillStyle = isDark ? '#222222' : '#F5F5F5';
        ctx.fillRect(
          x * cellSize,
          y * cellSize,
          cellSize,
          cellSize
        );
      }
    }
  }

  // Draw border
  ctx.strokeStyle = isDark ? '#333333' : '#E0E0E0';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, gridSize * cellSize, gridSize * cellSize);

  // Draw grid lines
  ctx.strokeStyle = isDark ? '#2a2a2a' : '#EEEEEE';
  ctx.lineWidth = 1;

  for (let i = 0; i <= gridSize; i++) {
    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, gridSize * cellSize);
    ctx.stroke();

    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(gridSize * cellSize, i * cellSize);
    ctx.stroke();
  }
};