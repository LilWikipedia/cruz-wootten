import React, { useState, useRef } from "react";
import Win95Window from "./Win95Window";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Win95Window title="Audio Player" className="w-[400px]">
      <div className="space-y-4">
        <div className="bg-white border border-win95-darkBorder p-2 h-32 overflow-y-auto">
          <div className="font-system text-sm">
            <p className="cursor-pointer hover:bg-win95-blue hover:text-white p-1">
              track1.mp3
            </p>
            <p className="cursor-pointer hover:bg-win95-blue hover:text-white p-1">
              track2.wav
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="px-4 py-1 bg-win95-gray border border-win95-lightBorder border-r-win95-darkBorder border-b-win95-darkBorder active:border-win95-darkBorder active:border-r-win95-lightBorder active:border-b-win95-lightBorder"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className="flex-1 bg-white border border-win95-darkBorder h-4">
            <div className="bg-win95-blue h-full w-0"></div>
          </div>
        </div>
        <audio ref={audioRef} />
      </div>
    </Win95Window>
  );
};

export default AudioPlayer;