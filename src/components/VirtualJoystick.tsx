import React, { useRef, useState } from 'react';
import { Direction } from '../types/game';

interface Props {
  onDirectionChange: (direction: Direction | null) => void;
}

const JOYSTICK_SIZE = 180;

export const VirtualJoystick: React.FC<Props> = ({ onDirectionChange }) => {
  const joystickRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    isDragging: false,
    origin: { x: 0, y: 0 },
    position: { x: 0, y: 0 }
  });

  const handleStart = (clientX: number, clientY: number) => {
    const rect = joystickRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setState(prev => ({
      ...prev,
      isDragging: true,
      origin: { x, y }
    }));
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!state.isDragging) return;

    const rect = joystickRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const deltaX = x - state.origin.x;
    const deltaY = y - state.origin.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = JOYSTICK_SIZE / 3;
    const angle = Math.atan2(deltaY, deltaX);

    const clampedDistance = Math.min(distance, maxDistance);
    const clampedX = Math.cos(angle) * clampedDistance;
    const clampedY = Math.sin(angle) * clampedDistance;

    setState(prev => ({
      ...prev,
      position: { x: clampedX, y: clampedY }
    }));

    // 确定方向
    const threshold = JOYSTICK_SIZE / 6;
    if (Math.abs(clampedX) > Math.abs(clampedY)) {
      onDirectionChange(clampedX > threshold ? Direction.Right : clampedX < -threshold ? Direction.Left : null);
    } else {
      onDirectionChange(clampedY > threshold ? Direction.Down : clampedY < -threshold ? Direction.Up : null);
    }
  };

  const handleEnd = () => {
    setState(prev => ({
      ...prev,
      isDragging: false,
      position: { x: 0, y: 0 }
    }));
    onDirectionChange(null);
  };

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  return (
    <div
      ref={joystickRef}
      className="relative touch-none select-none"
      style={{
        width: JOYSTICK_SIZE,
        height: JOYSTICK_SIZE,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* 外圈 */}
      <div
        className="absolute rounded-full border-2 border-blue-500/50 pointer-events-none"
        style={{
          width: JOYSTICK_SIZE,
          height: JOYSTICK_SIZE,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      {/* 摇杆 */}
      <div
        className="absolute rounded-full bg-blue-500/50 pointer-events-none"
        style={{
          width: JOYSTICK_SIZE / 2,
          height: JOYSTICK_SIZE / 2,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${state.position.x}px, ${state.position.y}px)`,
          transition: state.isDragging ? 'none' : 'all 0.2s ease-out'
        }}
      />
    </div>
  );
}; 