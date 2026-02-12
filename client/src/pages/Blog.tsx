import { PageTransition } from "@/components/PageTransition";
import { useBlogPosts } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, ArrowRight } from "lucide-react";

export default function Blog() {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white">
            Latest <span className="text-gradient">Updates</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A history of my journey, project milestones, and professional insights.
          </p>
        </header>

        {isLoading ? (
          <div className="grid gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel h-64 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8">
            {posts?.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel group overflow-hidden rounded-3xl"
              >
                <div className="flex flex-col md:flex-row">
                  {post.imageUrl && (
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-8 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-purple-400">
                      <Calendar size={14} />
                      {post.publishedAt && format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                    </div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/70 leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
