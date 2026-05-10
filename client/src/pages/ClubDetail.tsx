import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Club } from "@shared/schema";
import { api } from "@shared/routes";
import { PageTransition } from "@/components/PageTransition";
import { ArrowLeft, ExternalLink, Users, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClubDetail() {
  const { id } = useParams();
  
  const { data: clubs, isLoading } = useQuery<Club[]>({
    queryKey: ["/api/clubs"],
  });

  const club = clubs?.find(c => c.id === parseInt(id || "0"));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-white/50">Loading club details...</div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Club not found</h2>
        <Link href="/clubs">
          <Button variant="outline" className="glass-button">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clubs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <PageTransition className="container mx-auto px-6 py-12">
      <Link href="/clubs">
        <Button variant="ghost" className="mb-8 hover:bg-white/10 text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clubs
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Info */}
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-50"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/20 text-primary">
                <Users size={24} />
              </div>
              <span className="text-primary font-medium uppercase tracking-wider text-sm">{club.category} Club</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
              {club.name}
            </h1>
            
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/10 text-white/90 font-medium mb-6">
              {club.role}
            </div>

            <p className="text-lg text-white/80 leading-relaxed font-light mb-8">
              {club.description}
            </p>

            {club.link && (
              <a 
                href={club.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-lg shadow-white/5"
              >
                Visit Website <ExternalLink size={18} />
              </a>
            )}
          </div>

          <div className="glass-panel p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-white">Key Contributions</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Impacted organizational growth through strategic leadership and community engagement.</span>
              </li>
              <li className="flex gap-4 text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Successfully managed high-profile projects and events with measurable success.</span>
              </li>
              <li className="flex gap-4 text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Collaborated with diverse teams to achieve shared objectives and long-term goals.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Gallery */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white px-2">Photo Gallery</h3>
          {club.images && club.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {club.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="aspect-square rounded-2xl overflow-hidden border border-white/10 glass-panel group relative"
                >
                  <img 
                    src={img} 
                    alt={`${club.name} photo ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-medium text-white/80">View full size</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl border border-white/10 flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera size={32} className="text-primary/60" />
              </div>
              <p className="text-white/50 font-medium">Photos Coming Soon</p>
              <p className="text-white/30 text-sm max-w-xs">Photos from this club's events and activities will be added here shortly.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
