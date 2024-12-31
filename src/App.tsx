import { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { Difficulty } from './types/game';

function App() {
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty | null>(null);

  const handleGameStart = (difficulty: Difficulty) => {
    setCurrentDifficulty(difficulty);
  };

  const handleGameEnd = () => {
    setCurrentDifficulty(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[1200px]">
        {currentDifficulty ? (
          <GameBoard 
            difficulty={currentDifficulty} 
            onGameEnd={handleGameEnd}
          />
        ) : (
          <StartScreen
            onStart={handleGameStart}
          />
        )}
      </div>
    </div>
  );
}

export default App;