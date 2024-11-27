import React, { useState, useRef, useEffect } from "react";
import Win95Window from "./Win95Window";
import { supabase } from "@/lib/supabase";

interface AudioTrack {
  name: string;
  url: string;
}

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      const { data: files, error } = await supabase.storage
        .from('beats-by-cruz/.')
        .list();

      if (error) {
        console.error('Error loading tracks:', error);
        return;
      }

      const trackList = await Promise.all(
        files.map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('beats-by-cruz/.')
            .getPublicUrl(file.name);

          return {
            name: file.name,
            url: publicUrl
          };
        })
      );

      setTracks(trackList);
    } catch (error) {
      console.error('Error loading tracks:', error);
    }
  };

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

  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
  };

  return (
    <Win95Window title="beats-by-cruz" className="w-[400px]">
      <div className="space-y-4">
        <div className="bg-white border border-win95-darkBorder p-2 h-32 overflow-y-auto">
          <div className="font-system text-sm">
            {tracks.map((track) => (
              <p
                key={track.name}
                onClick={() => playTrack(track)}
                className="cursor-pointer hover:bg-win95-blue hover:text-white p-1"
              >
                {track.name}
              </p>
            ))}
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
        <audio 
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          src={currentTrack?.url}
        />
      </div>
    </Win95Window>
  );
};

export default AudioPlayer;
