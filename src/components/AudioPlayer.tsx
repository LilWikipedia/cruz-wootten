import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
import Win95Window from "./Win95Window";

interface AudioTrack {
  name: string;
  url: string;
}

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      // First, list all files in the bucket
      const { data: files, error: listError } = await supabase.storage
        .from('beats-by-cruz')
        .list();

      if (listError) {
        console.error('Error listing files:', listError);
        setError('Failed to load tracks listing');
        return;
      }

      console.log('Files found:', files); // Debug log

      if (!files || files.length === 0) {
        setError('No audio files found in bucket');
        return;
      }

      // Get public URLs for each file
      const trackList = await Promise.all(
        files
          .filter(file => file.name.match(/\.(mp3|wav|ogg)$/i)) // Only audio files
          .map(async (file) => {
            const { data: { publicUrl } } = supabase.storage
              .from('beats-by-cruz')
              .getPublicUrl(file.name);

            console.log(`Generated URL for ${file.name}:`, publicUrl); // Debug log

            return {
              name: file.name,
              url: publicUrl
            };
          })
      );

      console.log('Processed tracks:', trackList); // Debug log
      setTracks(trackList);

      // Set the first track as current if we don't have one
      if (!currentTrack && trackList.length > 0) {
        setCurrentTrack(trackList[0]);
      }

    } catch (err) {
      console.error('Error in loadTracks:', err);
      setError('Failed to load audio tracks');
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackSelect = (track: AudioTrack) => {
    setCurrentTrack(track);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.load(); // Reload audio element with new source
    }
  };

  return (
    <Win95Window title="Audio Player">
      <div className="p-4">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <div className="mb-4">
          <select 
            onChange={(e) => {
              const track = tracks.find(t => t.url === e.target.value);
              if (track) handleTrackSelect(track);
            }}
            value={currentTrack?.url || ''}
            className="w-full p-2 border"
          >
            <option value="">Select a track</option>
            {tracks.map((track) => (
              <option key={track.url} value={track.url}>
                {track.name}
              </option>
            ))}
          </select>
        </div>

        {currentTrack && (
          <>
            <audio
              ref={audioRef}
              src={currentTrack.url}
              onEnded={() => setIsPlaying(false)}
            />
            <div className="flex justify-center gap-2">
              <button
                onClick={handlePlay}
                className="px-4 py-2 border"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </>
        )}
      </div>
    </Win95Window>
  );
};

export default AudioPlayer;
