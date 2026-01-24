import { PageTransition } from "@/components/PageTransition";
import { useClubs } from "@/hooks/use-portfolio";
import { ExternalLink, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Clubs() {
  const { data: clubs, isLoading } = useClubs();

  if (isLoading) {
    return (
      <PageTransition>
        <div className="text-center text-white/60 animate-pulse">Loading clubs...</div>
      </PageTransition>
    );
  }

  const mainClubs = clubs?.filter(c => c.category === 'main') || [];
  const otherClubs = clubs?.filter(c => c.category === 'other') || [];

  return (
    <PageTransition>
      <div className="space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            My Clubs & Leadership
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Organizations where I've led, learned, and contributed to the community.
          </p>
        </div>

        {/* Main Clubs */}
        <div className="grid grid-cols-1 gap-8">
          {mainClubs.map((club, idx) => (
            <Link key={club.id} href={`/clubs/${club.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-start cursor-pointer hover:bg-white/10 transition-colors group"
              >
                {/* Image Placeholder Gallery */}
                <div className="w-full md:w-1/3 aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center relative">
                  <img 
                    src={`https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80&auto=format&fit=crop`} 
                    alt={club.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium border border-white/30 px-4 py-2 rounded-full glass-panel flex items-center gap-2">
                      View Details <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">{club.name}</h2>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200 text-sm font-medium w-fit">
                      <Award size={14} />
                      {club.role}
                    </span>
                  </div>
                  
                  <p className="text-white/80 leading-relaxed">
                    {club.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-purple-300 font-medium group-hover:translate-x-1 transition-transform">
                    Learn more <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Other Clubs Divider */}
        {otherClubs.length > 0 && (
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="glass-panel px-6 py-2 rounded-full text-white/60 text-sm uppercase tracking-wider font-semibold">
                Additional Involvement
              </span>
            </div>
          </div>
        )}

        {/* Other Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherClubs.map((club, idx) => (
            <Link key={club.id} href={`/clubs/${club.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (idx * 0.05) }}
                className="glass-card p-6 rounded-2xl flex flex-col h-full cursor-pointer hover:bg-white/10 transition-colors group"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{club.name}</h3>
                <p className="text-purple-300 text-sm font-medium mb-3">{club.role}</p>
                <p className="text-white/70 text-sm flex-grow mb-4">
                  {club.description}
                </p>
                <div className="text-white/40 text-xs font-medium flex items-center gap-1">
                  View details <ArrowRight size={12} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
