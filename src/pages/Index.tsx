import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "@/components/AudioPlayer";
import Win95Window from "@/components/Win95Window";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types/blog";

const Index = () => {
  const navigate = useNavigate();

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
              {isLoading ? (
                <p>Loading posts...</p>
              ) : (
                posts?.map((post) => (
                  <p
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="cursor-pointer hover:bg-win95-blue hover:text-white p-1"
                  >
                    {post.title}
                  </p>
                ))
              )}
            </div>
          </div>
        </Win95Window>
      </div>
    </div>
  );
};

export default Index;