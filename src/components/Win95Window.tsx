import { useState } from 'react';
import Draggable from 'react-draggable';

interface Win95WindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMinimized?: boolean;
  isMaximized?: boolean;
  zIndex?: number;
  onFocus?: () => void;
}

const Win95Window = ({
  title,
  children,
  className = '',
  onMinimize,
  onMaximize,
  isMinimized = false,
  isMaximized = false,
  zIndex = 0,
  onFocus,
}: Win95WindowProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (isMinimized) return null;

  return (
    <Draggable
      handle=".window-title-bar"
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
      disabled={isMaximized}
    >
      <div
        className={`bg-win95-gray border-2 border-win95-lightBorder shadow-win95 ${className}`}
        style={{ 
          zIndex,
          width: isMaximized ? '100%' : 'auto',
          height: isMaximized ? 'calc(100vh - 40px)' : 'auto',
          position: 'absolute',
        }}
        onClick={onFocus}
      >
        <div className="window-title-bar bg-win95-blue text-white p-1 flex justify-between items-center cursor-move">
          <span>{title}</span>
          <div className="flex gap-1">
            <button
              className="px-2 bg-win95-gray border-2 border-win95-lightBorder active:border-win95-darkBorder"
              onClick={onMinimize}
            >
              _
            </button>
            <button
              className="px-2 bg-win95-gray border-2 border-win95-lightBorder active:border-win95-darkBorder"
              onClick={onMaximize}
            >
              □
            </button>
          </div>
        </div>
        <div className="p-4 bg-white">{children}</div>
      </div>
    </Draggable>
  );
};

export default Win95Window;
