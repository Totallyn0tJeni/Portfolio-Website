import { PageTransition } from "@/components/PageTransition";
import { useProjects } from "@/hooks/use-portfolio";
import { Github, ExternalLink, Code2, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Coding() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <PageTransition>
        <div className="text-center text-white/60 animate-pulse">Loading projects...</div>
      </PageTransition>
    );
  }

  // Fallback data if none exists
  const displayProjects = projects?.length ? projects : [
    {
      id: 101,
      title: "Portfolio Website",
      description: "A glassmorphism-styled personal website built with React, Tailwind, and Framer Motion.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      repoLink: "https://github.com",
      demoLink: "https://demo.com"
    },
    {
      id: 102,
      title: "Task Management App",
      description: "Full-stack productivity tool featuring real-time updates and collaborative workspaces.",
      techStack: ["Node.js", "Express", "PostgreSQL", "Socket.io"],
      repoLink: "https://github.com",
      demoLink: null
    }
  ];

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            <span className="text-gradient">Coding Projects</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            A selection of technical projects ranging from web applications to robotics control systems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-6 md:p-8 rounded-2xl group hover:bg-white/15 transition-colors"
            >
              <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/10 rounded-xl text-purple-300">
                      <Code2 size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                      {project.title}
                    </h2>
                  </div>
                  
                  <p className="text-white/80 leading-relaxed max-w-3xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-full text-xs font-medium bg-black/20 text-white/90 border border-white/10 flex items-center gap-1.5"
                      >
                        <Layers size={10} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 w-full lg:w-auto pt-4 lg:pt-0">
                  {project.repoLink && (
                    <a 
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 lg:flex-none glass-button px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium"
                    >
                      <Github size={18} />
                      Code
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 lg:flex-none bg-white text-black hover:bg-white/90 px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors shadow-lg shadow-white/5"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
