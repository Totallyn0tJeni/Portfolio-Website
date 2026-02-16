import { PageTransition } from "@/components/PageTransition";
import { Github, Twitter, Linkedin, Mail, FileText, ArrowRight, Calendar, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useLatestBlogPost } from "@/hooks/use-portfolio";
import { format } from "date-fns";
import { Link } from "wouter";
import heroImage from "@assets/IMG_8076_1771273839233.jpeg";

export default function Home() {
  const { data: latestPost } = useLatestBlogPost();

  return (
    <PageTransition className="flex flex-col items-center min-h-screen px-6 pt-32 pb-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-7xl relative">
        {/* Intro Text */}
        <div className="lg:w-1/2 text-left space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 animate-pulse"></span>
              Available for freelance work
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-bold leading-tight">
              Hi, I'm <br/>
              <span className="text-white">Jenisha</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-purple-400 font-medium">
              Frontend Developer
            </h2>

            <p className="text-lg text-white/60 max-w-lg leading-relaxed">
              I create beautiful, functional, and user-centered digital experiences. With 
              passion for technology and design, I bring ideas to life through 
              clean code and thoughtful design.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-500" />
                Based in Ontario
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-purple-500" />
                Available Now
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact">
                <button className="px-8 py-3 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-white/90 transition-all">
                  Hire Me <ArrowRight size={18} />
                </button>
              </Link>
              <a href="/attached_assets/Jenisha_Patel_-_Resume_2026_V1_1769299476670.pdf" target="_blank">
                <button className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
                  Download CV <FileText size={18} />
                </button>
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <span className="text-sm text-white/40 font-medium uppercase tracking-wider">Follow me:</span>
              <div className="flex items-center gap-4">
                <a href="https://github.com/Totallyn0tJeni" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/jenisha-patel18" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://instagram.com/jenisha_ptl08" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Github size={20} /> {/* Using Github as placeholder for Discord/other if needed */}
                </a>
                <a href="https://instagram.com/jenisha_ptl08" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Github size={20} /> {/* Instagram icon would be better but keeping simple for now */}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 relative"
        >
          <div className="relative z-10 w-full max-w-[500px] mx-auto aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={heroImage}
              alt="Jenisha Patel"
              className="w-full h-full object-cover"
            />
            {/* Visual elements from reference image could be added here if needed */}
          </div>
          
          {/* Background Glow */}
          <div className="absolute -inset-4 bg-purple-500/20 blur-3xl -z-10 rounded-full"></div>
        </motion.div>
      </div>

      {/* Latest Blog Post Section */}
      {latestPost && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Latest <span className="text-gradient">Update</span></h2>
            <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <Link href="/blog">
            <div className="glass-panel group p-6 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 cursor-pointer">
              <div className="flex flex-col md:flex-row gap-8">
                {latestPost.imageUrl && (
                  <div className="md:w-1/3 h-48 rounded-2xl overflow-hidden">
                    <img 
                      src={latestPost.imageUrl} 
                      alt={latestPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-purple-400">
                    <Calendar size={14} />
                    {latestPost.publishedAt && format(new Date(latestPost.publishedAt), 'MMMM d, yyyy')}
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {latestPost.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed line-clamp-2">
                    {latestPost.content}
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:gap-3 transition-all">
                    Read Post History <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </PageTransition>
  );
}

function SocialButton({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      className="glass-button flex items-center gap-2 px-6 py-3 rounded-xl font-medium"
    >
      <Icon size={20} />
      <span>{label}</span>
    </a>
  );
}
