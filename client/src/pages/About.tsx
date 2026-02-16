import { PageTransition } from "@/components/PageTransition";

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
              I’m a passionate and driven student in the Sci-Tech Regional Program at Chinguacousy Secondary School, with a strong foundation in STEM, leadership, and digital creativity. I enjoy exploring new technologies, solving challenges, and using my skills to create meaningful impact in my school and community.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Experience</h2>
              <p className="text-white/80 leading-relaxed">
                I have experience leading sponsorship outreach, developing marketing campaigns, directing visual media, and managing projects while mentoring peers and fostering collaboration. I also help organize and promote student-led hackathons, contributing to challenge design, event logistics, and outreach.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Skills</h2>
              <ul className="grid grid-cols-2 gap-2 text-white/80">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Graphic Design
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Marketing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  STEM
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Leadership
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Photography
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Videography
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
