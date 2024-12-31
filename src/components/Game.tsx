const handleJoystickMove = (x: number, y: number) => {
  // 处理摇杆移动
  setDirection({ x, y });
};

const handleJoystickEnd = () => {
  // 处理摇杆释放
  setDirection({ x: 0, y: 0 });
};

return (
  <div 
    className="w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden"
    style={{ touchAction: 'none' }}
  >
    {/* 其他游戏元素 */}
    <div className="absolute bottom-8 left-8 z-50">
      <Joystick onMove={handleJoystickMove} onEnd={handleJoystickEnd} />
    </div>
  </div>
); 