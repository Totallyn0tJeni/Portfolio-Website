import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Tv, Music, BookOpen, Film, Clock } from "lucide-react";

const shows = [
  "The Rookie",
  "XO Kitty",
  "The Summer I Turned Pretty",
  "Never Have I Ever",
  "Live On (K-Drama)",
];

function ComingSoonCard({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 text-center min-h-[120px]">
      <Icon size={24} className="text-white/20" />
      <div>
        <p className="text-white/40 text-sm font-medium">{label}</p>
        <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px]">
          <Clock size={10} />
          Coming Soon
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-12 py-20 px-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
            About <span className="text-gradient">Me</span>
          </h1>
          <p className="text-lg text-white/60">
            A closer look at my journey, skills, and aspirations.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">My Journey</h2>
            <p className="text-white/80 leading-relaxed text-lg">
              I'm a passionate and driven student in the Sci-Tech Regional Program at Chinguacousy Secondary School, with a strong foundation in STEM, leadership, and digital creativity. I enjoy exploring new technologies, solving challenges, and using my skills to create meaningful impact in my school and community.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Experience</h2>
              <p className="text-white/80 leading-relaxed">
                I have experience leading sponsorship outreach, developing marketing campaigns, directing visual media, and managing projects while mentoring peers and fostering collaboration. I also help organize and promote student-led hackathons, contributing to challenge design, event logistics, and outreach. My love for graphic design and visual storytelling shows through in promotional content, photography, and videography.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Skills</h2>
              <ul className="grid grid-cols-2 gap-2 text-white/80">
                {["Graphic Design", "Marketing", "STEM", "Leadership", "Photography", "Videography"].map(skill => (
                  <li key={skill} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Beyond the Work */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 md:p-12 rounded-3xl space-y-8"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Beyond the Work</h2>
            <p className="text-white/50 text-sm">A little peek at what I'm into outside of school and projects.</p>
          </div>

          <div className="space-y-6">
            {/* TV Shows */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Tv size={18} />
                <span>Currently Watching</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {shows.map(show => (
                  <span key={show} className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-white/80 text-sm">
                    {show}
                  </span>
                ))}
              </div>
            </div>

            {/* Movies / Music / Books */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <ComingSoonCard icon={Film} label="Favourite Movies" />
              <ComingSoonCard icon={Music} label="Favourite Music" />
              <ComingSoonCard icon={BookOpen} label="Books I've Read" />
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
