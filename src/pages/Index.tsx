import AudioPlayer from "@/components/AudioPlayer";
import Win95Window from "@/components/Win95Window";

const Index = () => {
  return (
    <div className="min-h-screen bg-win95-desktop p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Win95Window title="About Me" className="md:col-span-2">
          <div className="prose font-system">
            <h1 className="text-2xl mb-4">Welcome to My Audio Portfolio</h1>
            <p className="mb-4">
              Hi! I'm a sound creator and this is my Windows 95-themed portfolio.
              Feel free to explore my audio works and blog posts.
            </p>
          </div>
        </Win95Window>

        <AudioPlayer />

        <Win95Window title="Blog.txt" className="h-fit">
          <div className="font-system space-y-2">
            <div className="bg-white border border-win95-darkBorder p-2 min-h-[200px]">
              <p className="cursor-pointer hover:bg-win95-blue hover:text-white p-1">
                Latest Post - Click to read more...
              </p>
            </div>
          </div>
        </Win95Window>
      </div>
    </div>
  );
};

export default Index;