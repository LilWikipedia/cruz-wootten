import React, { useState, useRef, useEffect } from "react";
import Win95Window from "@/components/Win95Window.tsx";
import { supabase } from "@/lib/supabase";

interface AudioTrack {
  name: string;
  url: string;
  path?: string;
  format?: string;
}

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const loadTracks = async () => {
    try {
      setIsLoading(true);
      
      // First, list all files including those in subfolders
      const { data: files, error } = await supabase.storage
        .from('beats-by-cruz')
        .list('', {
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) {
        console.error('Error loading tracks:', error);
        return;
      }

      console.log('Raw files from bucket:', files); // Debug log

      // Filter for audio files
      const audioFiles = files.filter(file => 
        file.name.match(/\.(mp3|wav)$/i)
      );

      const trackList = await Promise.all(
        audioFiles.map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('beats-by-cruz')
            .getPublicUrl(file.name);

          return {
            name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
            url: publicUrl,
            path: file.name,
            format: file.name.split('.').pop()?.toLowerCase()
          };
        })
      );

      console.log('Processed track list:', trackList); // Debug log
      setTracks(trackList);

    } catch (error) {
      console.error('Error loading tracks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTracks();
  }, []);

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
      audioRef.current.play().catch(error => {
        console.error('Error playing track:', error);
        setIsPlaying(false);
      });
    }
  };

  return (
    <Win95Window title="beats-by-cruz" className="w-[400px]">
      <div className="space-y-4">
        <div className="bg-white border border-win95-darkBorder p-2 h-32 overflow-y-auto">
          <div className="font-system text-sm">
            {isLoading ? (
              <p className="p-1">Loading tracks...</p>
            ) : tracks.length > 0 ? (
              tracks.map((track) => (
                <p
                  key={track.path || track.name}
                  onClick={() => playTrack(track)}
                  className={`cursor-pointer hover:bg-win95-blue hover:text-white p-1 ${
                    currentTrack?.name === track.name ? 'bg-win95-blue text-white' : ''
                  }`}
                >
                  {track.name}
                </p>
              ))
            ) : (
              <p className="p-1">No tracks found</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            disabled={!currentTrack}
            className={`px-4 py-1 bg-win95-gray border border-win95-lightBorder border-r-win95-darkBorder border-b-win95-darkBorder active:border-win95-darkBorder active:border-r-win95-lightBorder active:border-b-win95-lightBorder ${
              !currentTrack ? 'opacity-50 cursor-not-allowed' : ''
            }`}
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
          onError={(e) => {
            console.error('Audio error:', e);
            setIsPlaying(false);
          }}
          src={currentTrack?.url}
        />
      </div>
    </Win95Window>
  );
};

export default AudioPlayer;
