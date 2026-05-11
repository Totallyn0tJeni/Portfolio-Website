import { PageTransition } from "@/components/PageTransition";
import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Palette, Plus, Trash2, FolderOpen, Image as ImageIcon, ChevronDown, FileText, Users, Code, Mail, Calendar, Settings2 } from "lucide-react";
import {
  usePhotoAlbums, useAlbumPhotos, useCreateAlbum, useDeleteAlbum, useAddPhoto, useDeletePhoto,
  useMarketingWork, useCreateMarketingItem, useDeleteMarketingItem,
  useBlogPosts, useCreateBlogPost, useDeleteBlogPost,
  useClubs, useCreateClub, useDeleteClub,
  useProjects, useCreateProject, useDeleteProject,
  useMessages,
} from "@/hooks/use-portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const MARKETING_CATEGORIES = ["Social Media", "Brand Design", "Event Marketing", "Print Design", "Other"];
const CLUB_CATEGORIES = ["main", "other"];

// ── Shared ──────────────────────────────────────────────────────────────────
function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="glass-panel p-6 rounded-2xl space-y-4">{children}</div>;
}

function CardTitle({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <h3 className="text-lg font-bold text-white flex items-center gap-2">
      <Icon size={18} className="text-primary" /> {label}
    </h3>
  );
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 appearance-none pr-8 text-sm"
      >
        {placeholder && <option value="" className="bg-gray-900">{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value} className="bg-gray-900">{o.label}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
    </div>
  );
}

function inp(cls = "") {
  return `bg-white/5 border-white/10 text-white placeholder:text-white/30 ${cls}`;
}

// ── Photography ─────────────────────────────────────────────────────────────
function PhotoSection() {
  const { data: albums = [] } = usePhotoAlbums();
  const createAlbum = useCreateAlbum();
  const deleteAlbum = useDeleteAlbum();
  const addPhoto = useAddPhoto();
  const deletePhoto = useDeletePhoto();

  const [albumForm, setAlbumForm] = useState({ title: "", description: "", eventDate: "", coverImageUrl: "" });
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [photoForm, setPhotoForm] = useState({ imageUrl: "", caption: "" });

  const selectedAlbum = albums.find(a => a.id === selectedAlbumId);
  const { data: photos = [] } = useAlbumPhotos(selectedAlbumId);

  return (
    <SectionWrap>
      <Card>
        <CardTitle icon={FolderOpen} label="Create New Album" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Album title *" value={albumForm.title} onChange={e => setAlbumForm(f => ({ ...f, title: e.target.value }))} className={inp()} />
          <Input placeholder="Event date (e.g. May 2025)" value={albumForm.eventDate} onChange={e => setAlbumForm(f => ({ ...f, eventDate: e.target.value }))} className={inp()} />
          <Input placeholder="Description (optional)" value={albumForm.description} onChange={e => setAlbumForm(f => ({ ...f, description: e.target.value }))} className={inp()} />
          <Input placeholder="Cover image URL (optional)" value={albumForm.coverImageUrl} onChange={e => setAlbumForm(f => ({ ...f, coverImageUrl: e.target.value }))} className={inp()} />
        </div>
        <Button onClick={async () => { if (!albumForm.title.trim()) return; await createAlbum.mutateAsync(albumForm); setAlbumForm({ title: "", description: "", eventDate: "", coverImageUrl: "" }); }} disabled={createAlbum.isPending || !albumForm.title.trim()} className="bg-primary text-white hover:bg-primary/80">
          <Plus size={16} className="mr-2" /> Create Album
        </Button>
      </Card>

      {albums.length > 0 && (
        <Card>
          <CardTitle icon={Camera} label="Add Photos to Album" />
          <Select value={selectedAlbumId?.toString() ?? ""} onChange={v => setSelectedAlbumId(v ? Number(v) : null)} options={albums.map(a => ({ value: String(a.id), label: a.title }))} placeholder="Select an album…" />
          {selectedAlbum && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input placeholder="Image URL or path (e.g. /Photos/img.jpg)" value={photoForm.imageUrl} onChange={e => setPhotoForm(f => ({ ...f, imageUrl: e.target.value }))} className={inp()} />
                <Input placeholder="Caption (optional)" value={photoForm.caption} onChange={e => setPhotoForm(f => ({ ...f, caption: e.target.value }))} className={inp()} />
              </div>
              <Button onClick={async () => { if (!selectedAlbumId || !photoForm.imageUrl.trim()) return; await addPhoto.mutateAsync({ albumId: selectedAlbumId, data: photoForm }); setPhotoForm({ imageUrl: "", caption: "" }); }} disabled={addPhoto.isPending || !photoForm.imageUrl.trim()} className="bg-primary text-white hover:bg-primary/80">
                <Plus size={16} className="mr-2" /> Add Photo
              </Button>
              {photos.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 pt-2">
                  {photos.map(p => (
                    <div key={p.id} className="group relative aspect-square rounded-xl overflow-hidden bg-white/5">
                      <img src={p.imageUrl} alt={p.caption || ""} className="w-full h-full object-cover" />
                      <button onClick={() => deletePhoto.mutate({ id: p.id, albumId: selectedAlbumId! })} className="absolute inset-0 bg-red-500/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {albums.length > 0 && (
        <Card>
          <CardTitle icon={FolderOpen} label="Manage Albums" />
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {albums.map(album => (
              <div key={album.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="text-white font-medium text-sm">{album.title}</p>
                  {album.eventDate && <p className="text-white/40 text-xs">{album.eventDate}</p>}
                </div>
                <button onClick={() => deleteAlbum.mutate(album.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </SectionWrap>
  );
}

// ── Marketing ────────────────────────────────────────────────────────────────
function MarketingSection() {
  const { data: items = [] } = useMarketingWork();
  const createItem = useCreateMarketingItem();
  const deleteItem = useDeleteMarketingItem();
  const [form, setForm] = useState({ title: "", description: "", imageUrl: "", category: "Brand Design" });

  return (
    <SectionWrap>
      <Card>
        <CardTitle icon={Plus} label="Add Marketing Item" />
        <p className="text-white/40 text-xs">Place images in <code className="bg-white/10 px-1 rounded">client/public/Portfolio Images/</code> then reference as <code className="bg-white/10 px-1 rounded">/Portfolio Images/filename.png</code></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp()} />
          <Select value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={MARKETING_CATEGORIES.map(c => ({ value: c, label: c }))} />
          <Input placeholder="Image URL or path" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} className={inp()} />
          <Input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={inp()} />
        </div>
        <Button onClick={async () => { if (!form.title.trim()) return; await createItem.mutateAsync({ ...form, carouselImages: [] }); setForm({ title: "", description: "", imageUrl: "", category: "Brand Design" }); }} disabled={createItem.isPending || !form.title.trim()} className="bg-primary text-white hover:bg-primary/80">
          <Plus size={16} className="mr-2" /> Add Item
        </Button>
      </Card>
      <Card>
        <CardTitle icon={Palette} label={`Existing Items (${items.length})`} />
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {item.imageUrl ? <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" /> : <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0"><ImageIcon size={16} className="text-white/30" /></div>}
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">{item.title}</p>
                  {item.category && <p className="text-primary text-xs">{item.category}</p>}
                </div>
              </div>
              <button onClick={() => deleteItem.mutate(item.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors shrink-0"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </Card>
    </SectionWrap>
  );
}

// ── Blog ─────────────────────────────────────────────────────────────────────
function BlogSection() {
  const { data: posts = [] } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const deletePost = useDeleteBlogPost();
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "", publishedAt: "" });

  return (
    <SectionWrap>
      <Card>
        <CardTitle icon={Plus} label="Add Blog Post" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp()} />
          <Input type="date" placeholder="Date (defaults to today)" value={form.publishedAt} onChange={e => setForm(f => ({ ...f, publishedAt: e.target.value }))} className={inp()} />
          <Input placeholder="Image URL (optional)" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} className={inp()} />
        </div>
        <Textarea placeholder="Content *" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className={inp("min-h-[100px]")} />
        <Button onClick={async () => {
          if (!form.title.trim() || !form.content.trim()) return;
          await createPost.mutateAsync({ title: form.title, content: form.content, imageUrl: form.imageUrl || undefined, publishedAt: form.publishedAt ? new Date(form.publishedAt) : undefined });
          setForm({ title: "", content: "", imageUrl: "", publishedAt: "" });
        }} disabled={createPost.isPending || !form.title.trim() || !form.content.trim()} className="bg-primary text-white hover:bg-primary/80">
          <Plus size={16} className="mr-2" /> Add Post
        </Button>
      </Card>
      <Card>
        <CardTitle icon={FileText} label={`Posts (${posts.length})`} />
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {posts.map(post => (
            <div key={post.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 gap-3">
              <div className="min-w-0">
                <p className="text-white font-medium text-sm truncate">{post.title}</p>
                {post.publishedAt && <p className="text-white/40 text-xs">{format(new Date(post.publishedAt), "MMM d, yyyy")}</p>}
              </div>
              <button onClick={() => deletePost.mutate(post.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors shrink-0"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </Card>
    </SectionWrap>
  );
}

// ── Clubs ────────────────────────────────────────────────────────────────────
function ClubsSection() {
  const { data: clubList = [] } = useClubs();
  const createClub = useCreateClub();
  const deleteClub = useDeleteClub();
  const [form, setForm] = useState({ name: "", role: "", description: "", category: "main", link: "", images: "" });

  return (
    <SectionWrap>
      <Card>
        <CardTitle icon={Plus} label="Add Club / Extracurricular" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Organization name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp()} />
          <Input placeholder="Your role *" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className={inp()} />
          <Input placeholder="Link (optional)" value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} className={inp()} />
          <Select value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={CLUB_CATEGORIES.map(c => ({ value: c, label: c }))} />
          <div className="md:col-span-2">
            <Input placeholder="Image URLs (comma-separated, optional)" value={form.images} onChange={e => setForm(f => ({ ...f, images: e.target.value }))} className={inp()} />
          </div>
        </div>
        <Textarea placeholder="Description *" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={inp("min-h-[80px]")} />
        <Button onClick={async () => {
          if (!form.name.trim() || !form.role.trim() || !form.description.trim()) return;
          const images = form.images ? form.images.split(",").map(s => s.trim()).filter(Boolean) : [];
          await createClub.mutateAsync({ name: form.name, role: form.role, description: form.description, category: form.category, link: form.link || null, images });
          setForm({ name: "", role: "", description: "", category: "main", link: "", images: "" });
        }} disabled={createClub.isPending || !form.name.trim()} className="bg-primary text-white hover:bg-primary/80">
          <Plus size={16} className="mr-2" /> Add Club
        </Button>
      </Card>
      <Card>
        <CardTitle icon={Users} label={`Clubs (${clubList.length})`} />
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {clubList.map((club: any) => (
            <div key={club.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 gap-3">
              <div className="min-w-0">
                <p className="text-white font-medium text-sm truncate">{club.name}</p>
                <p className="text-primary text-xs truncate">{club.role}</p>
              </div>
              <button onClick={() => deleteClub.mutate(club.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors shrink-0"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </Card>
    </SectionWrap>
  );
}

// ── Coding ───────────────────────────────────────────────────────────────────
function CodingSection() {
  const { data: projectList = [] } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const [form, setForm] = useState({ title: "", description: "", techStack: "", repoLink: "", demoLink: "" });

  return (
    <SectionWrap>
      <Card>
        <CardTitle icon={Plus} label="Add Project" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Project title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp()} />
          <Input placeholder="Tech stack (comma-separated) *" value={form.techStack} onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))} className={inp()} />
          <Input placeholder="Repo URL (optional)" value={form.repoLink} onChange={e => setForm(f => ({ ...f, repoLink: e.target.value }))} className={inp()} />
          <Input placeholder="Demo URL (optional)" value={form.demoLink} onChange={e => setForm(f => ({ ...f, demoLink: e.target.value }))} className={inp()} />
        </div>
        <Textarea placeholder="Description *" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={inp("min-h-[80px]")} />
        <Button onClick={async () => {
          if (!form.title.trim() || !form.description.trim() || !form.techStack.trim()) return;
          const techStack = form.techStack.split(",").map(s => s.trim()).filter(Boolean);
          await createProject.mutateAsync({ title: form.title, description: form.description, techStack, repoLink: form.repoLink || null, demoLink: form.demoLink || null });
          setForm({ title: "", description: "", techStack: "", repoLink: "", demoLink: "" });
        }} disabled={createProject.isPending || !form.title.trim()} className="bg-primary text-white hover:bg-primary/80">
          <Plus size={16} className="mr-2" /> Add Project
        </Button>
      </Card>
      <Card>
        <CardTitle icon={Code} label={`Projects (${projectList.length})`} />
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {projectList.map((proj: any) => (
            <div key={proj.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 gap-3">
              <div className="min-w-0">
                <p className="text-white font-medium text-sm truncate">{proj.title}</p>
                <p className="text-white/40 text-xs truncate">{proj.techStack?.join(", ")}</p>
              </div>
              <button onClick={() => deleteProject.mutate(proj.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors shrink-0"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </Card>
    </SectionWrap>
  );
}

// ── Messages ─────────────────────────────────────────────────────────────────
function MessagesSection() {
  const { data: msgs = [], isLoading } = useMessages();

  return (
    <SectionWrap>
      <Card>
        <CardTitle icon={Mail} label={`Contact Submissions (${msgs.length})`} />
        {isLoading && <p className="text-white/40 text-sm">Loading…</p>}
        {msgs.length === 0 && !isLoading && <p className="text-white/40 text-sm">No messages yet.</p>}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {msgs.map((msg: any) => (
            <div key={msg.id} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-white font-semibold text-sm">{msg.name}</p>
                  <p className="text-primary text-xs">{msg.email}</p>
                </div>
                {msg.createdAt && (
                  <div className="flex items-center gap-1 text-white/30 text-xs shrink-0">
                    <Calendar size={12} />
                    {format(new Date(msg.createdAt), "MMM d, yyyy")}
                  </div>
                )}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      </Card>
    </SectionWrap>
  );
}

// ── Passcode Gate ─────────────────────────────────────────────────────────────
const PASSCODE = "jenisha2026";

function PasscodeGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSCODE) {
      onUnlock();
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-10 rounded-3xl w-full max-w-sm text-center space-y-6"
      >
        <div className="flex justify-center">
          <div className="p-5 rounded-full bg-primary/10 border border-primary/20">
            <Settings2 size={32} className="text-primary" />
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-display font-bold text-white">Admin Access</h1>
          <p className="text-white/40 text-sm">Enter the passcode to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Passcode"
            value={value}
            onChange={e => setValue(e.target.value)}
            className={`bg-white/5 border text-white placeholder:text-white/30 text-center tracking-widest text-lg ${error ? "border-red-500/70" : "border-white/10"}`}
            autoFocus
          />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs"
            >
              Incorrect passcode. Try again.
            </motion.p>
          )}
          <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/80">
            Unlock
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
type Tab = "photography" | "marketing" | "blog" | "clubs" | "coding" | "messages";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "photography", label: "Photography", icon: Camera },
  { id: "marketing", label: "Marketing", icon: Palette },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "clubs", label: "Clubs", icon: Users },
  { id: "coding", label: "Coding", icon: Code },
  { id: "messages", label: "Messages", icon: Mail },
];

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<Tab>("photography");

  if (!unlocked) {
    return (
      <PageTransition>
        <PasscodeGate onUnlock={() => setUnlocked(true)} />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-20 px-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-white">Admin Panel</h1>
          <p className="text-white/50 text-sm">Manage all sections of your portfolio.</p>
        </div>

        <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit mx-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}
            >
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {tab === "photography" && <PhotoSection />}
          {tab === "marketing" && <MarketingSection />}
          {tab === "blog" && <BlogSection />}
          {tab === "clubs" && <ClubsSection />}
          {tab === "coding" && <CodingSection />}
          {tab === "messages" && <MessagesSection />}
        </motion.div>
      </div>
    </PageTransition>
  );
}
