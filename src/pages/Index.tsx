import AudioPlayer from "@/components/AudioPlayer";
import Taskbar from "@/components/Taskbar";
import Win95Window from "@/components/Win95Window";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Add window management state
  const [windows, setWindows] = useState([
    {
      id: 'readme',
      title: 'readme.md',
      isMinimized: false,
      isMaximized: false,
      zIndex: 0,
    },
    {
      id: 'socials',
      title: 'socials.txt',
      isMinimized: false,
      isMaximized: false,
      zIndex: 0,
    },
    {
      id: 'audio',
      title: 'audio_player.exe',
      isMinimized: false,
      isMaximized: false,
      zIndex: 0,
    },
  ]);

  const handleWindowFocus = (id: string) => {
    const maxZ = Math.max(...windows.map(w => w.zIndex));
    setWindows(windows.map(window => ({
      ...window,
      zIndex: window.id === id ? maxZ + 1 : window.zIndex,
    })));
  };

  const handleMinimize = (id: string) => {
    setWindows(windows.map(window => ({
      ...window,
      isMinimized: window.id === id ? !window.isMinimized : window.isMinimized,
    })));
  };

  const handleMaximize = (id: string) => {
    setWindows(windows.map(window => ({
      ...window,
      isMaximized: window.id === id ? !window.isMaximized : window.isMaximized,
    })));
  };

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  return (
    <div className="min-h-screen bg-win95-desktop p-4">
      {/* Readme Window */}
      <Win95Window 
        title="readme.md" 
        className="md:col-span-2"
        isMinimized={windows.find(w => w.id === 'readme')?.isMinimized}
        isMaximized={windows.find(w => w.id === 'readme')?.isMaximized}
        onMinimize={() => handleMinimize('readme')}
        onMaximize={() => handleMaximize('readme')}
        zIndex={windows.find(w => w.id === 'readme')?.zIndex}
        onFocus={() => handleWindowFocus('readme')}
      >
        <div className="prose font-system">
          <h1 className="text-2xl mb-4">cruz-wootten.exe</h1>
          <p className="mb-4">
            Hi! My name is Cruz Wootten, welcome to my page! I have been a technician of many sorts for the last 10 years. In my personal time I'm an audio enthusiast and you can browse some of my work below. I also create UGC content in Fortnite under the name Lil Wikipedia, please check it out!
            Feel free to explore this site, or add me on any social media platforms if you'd like to connect! Thanks!
          </p>
        </div>
      </Win95Window>

      {/* Audio Player Window */}
      <Win95Window 
        title="audio_player.exe"
        isMinimized={windows.find(w => w.id === 'audio')?.isMinimized}
        isMaximized={windows.find(w => w.id === 'audio')?.isMaximized}
        onMinimize={() => handleMinimize('audio')}
        onMaximize={() => handleMaximize('audio')}
        zIndex={windows.find(w => w.id === 'audio')?.zIndex}
        onFocus={() => handleWindowFocus('audio')}
      >
        <AudioPlayer />
      </Win95Window>

      {/* Socials Window */}
      <Win95Window 
        title="socials.txt" 
        className="h-fit"
        isMinimized={windows.find(w => w.id === 'socials')?.isMinimized}
        isMaximized={windows.find(w => w.id === 'socials')?.isMaximized}
        onMinimize={() => handleMinimize('socials')}
        onMaximize={() => handleMaximize('socials')}
        zIndex={windows.find(w => w.id === 'socials')?.zIndex}
        onFocus={() => handleWindowFocus('socials')}
      >
        <div className="font-system space-y-2">
          <div className="bg-white border border-win95-darkBorder p-2 min-h-[200px]">
      <a
        href="https://www.tiktok.com/@lilwikipediafn" 
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer hover:bg-win95-blue hover:text-white p-1"
      >
        Tiktok
      </a>
      <a
        href="https://www.fortnite.com/@lil-wikipedia" 
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer hover:bg-win95-blue hover:text-white p-1"
      >
        Fortnite.com
      </a>
      <a
        href="https://www.fortnite.com/@wikipedia" 
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer hover:bg-win95-blue hover:text-white p-1"
      >
        Fortnite.com (Alt)
      </a>
      <a
        href="https://github.com/LilWikipedia" 
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer hover:bg-win95-blue hover:text-white p-1"
      >
        GitHub
      </a>
      <a
        href="https://x.com/lilwikipediaFN" 
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer hover:bg-win95-blue hover:text-white p-1"
      >
        X
      </a>
      <a
        href="https://www.youtube.com/channel/UCbaIfyq8k-1QHyaK33J0UkQ" 
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer hover:bg-win95-blue hover:text-white p-1"
      >
        Youtube
      </a>
      <a
        href="cruzwootten@icloud.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer hover:bg-win95-blue hover:text-white p-1"
      >
        Email (General Inquiries)
      </a>
      <a
        href="lilwikipediafn@gmail.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer hover:bg-win95-blue hover:text-white p-1"
      >
        Email (Fortnite)
      </a>
            {/* Rest of your social links */}
          </div>
        </div>
      </Win95Window>

      {/* Taskbar */}
      <Taskbar
        Windows={windows}
        onWindowClick={(id) => {
          handleWindowFocus(id);
          handleMinimize(id);
        }}
      />
    </div>
  );
};

export default Index;
