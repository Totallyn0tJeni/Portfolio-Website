import { PageTransition } from "@/components/PageTransition";
import { Github, Twitter, Linkedin, Mail, FileText, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useLatestBlogPost } from "@/hooks/use-portfolio";
import { format } from "date-fns";
import { Link } from "wouter";

export default function Home() {
  const { data: latestPost } = useLatestBlogPost();

  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-[80vh] gap-12 px-6 py-20">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl">
        {/* Cutout Image Section */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative group lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-96 md:w-80 md:h-[450px] lg:w-[450px] lg:h-[600px] animate-float">
            {/* Glass background for the "cutout" effect container */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl -z-10"></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm bg-white/5 shadow-2xl">
              {/* Placeholder for cutout image - in real use, this would be an <img> with object-cover */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-transparent to-black/40">
                <img
                  src="/Portfolio Images/download.png"
                  alt="Jenisha Patel"
                  className="object-cover rounded-3xl w-full h-full"
                />

              </div>
            </div>
            
            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
          </div>
        </motion.div>

        {/* Intro Text */}
        <div className="lg:w-1/2 text-left space-y-6">
          <div className="glass-panel p-8 md:p-10 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-50"></div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-4 tracking-tight">
              Hi, I'm <br/><span className="text-gradient">Jenisha Patel</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              I’m a passionate and driven student in the Sci-Tech Regional Program at Chinguacousy Secondary School, with a strong foundation in STEM, leadership, and digital creativity. I enjoy exploring new technologies, solving challenges, and using my skills to create meaningful impact in my school and community.
              <br /><br />
              I have experience leading sponsorship outreach, developing marketing campaigns, directing visual media, and managing projects while mentoring peers and fostering collaboration. I also help organize and promote student-led hackathons, contributing to challenge design, event logistics, and outreach. My love for graphic design and visual storytelling shows through in promotional content, photography, and videography.
            </p>

          </div>
        </div>
      </div>

      {/* Latest Blog Post Section */}
      {latestPost && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mt-12"
        >
          <div className="text-center mb-8">
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
