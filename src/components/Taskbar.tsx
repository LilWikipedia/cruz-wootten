import { useEffect, useState } from 'react';

interface TaskbarProps {
  windows: {
    id: string;
    title: string;
    isMinimized: boolean;
    isActive: boolean;
  }[];
  onWindowClick: (id: string) => void;
}

const Taskbar = ({ windows, onWindowClick }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-win95-gray border-t-2 border-win95-lightBorder flex items-center justify-between p-1 z-50">
      <div className="flex gap-1">
        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`px-2 py-1 border-2 ${
              window.isActive
                ? 'border-win95-darkBorder bg-win95-grayLight'
                : 'border-win95-lightBorder bg-win95-gray'
            }`}
          >
            {window.title}
          </button>
        ))}
      </div>
      <div className="px-2 py-1 border-2 border-win95-darkBorder bg-win95-gray">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Taskbar;
