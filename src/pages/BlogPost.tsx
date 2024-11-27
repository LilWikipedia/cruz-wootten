import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Win95Window from "@/components/Win95Window";
import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types/blog";

const BlogPostPage = () => {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blogPost", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as BlogPost;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen bg-win95-desktop p-4">
      <Win95Window title={post.title} className="max-w-3xl mx-auto">
        <div className="font-system">
          <div className="bg-white border border-win95-darkBorder p-4">
            <h1 className="text-2xl mb-4">{post.title}</h1>
            <p className="whitespace-pre-wrap">{post.content}</p>
            <p className="text-sm text-gray-600 mt-4">
              Posted on: {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Win95Window>
    </div>
  );
};

export default BlogPostPage;