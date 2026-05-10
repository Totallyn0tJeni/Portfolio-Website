import { PageTransition } from "@/components/PageTransition";
import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Palette, Plus, Trash2, FolderOpen, Image as ImageIcon, ChevronDown } from "lucide-react";
import { usePhotoAlbums, useAlbumPhotos, useCreateAlbum, useDeleteAlbum, useAddPhoto, useDeletePhoto, useMarketingWork, useCreateMarketingItem, useDeleteMarketingItem } from "@/hooks/use-portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MARKETING_CATEGORIES = ["Social Media", "Brand Design", "Event Marketing", "Print Design", "Other"];

function PhotoSection() {
  const { data: albums = [] } = usePhotoAlbums();
  const createAlbum = useCreateAlbum();
  const deleteAlbum = useDeleteAlbum();
  const addPhoto = useAddPhoto();

  const [albumForm, setAlbumForm] = useState({ title: "", description: "", eventDate: "", coverImageUrl: "" });
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [photoForm, setPhotoForm] = useState({ imageUrl: "", caption: "" });

  const selectedAlbum = albums.find(a => a.id === selectedAlbumId);
  const { data: photos = [] } = useAlbumPhotos(selectedAlbumId);
  const deletePhoto = useDeletePhoto();

  const handleCreateAlbum = async () => {
    if (!albumForm.title.trim()) return;
    await createAlbum.mutateAsync(albumForm);
    setAlbumForm({ title: "", description: "", eventDate: "", coverImageUrl: "" });
  };

  const handleAddPhoto = async () => {
    if (!selectedAlbumId || !photoForm.imageUrl.trim()) return;
    await addPhoto.mutateAsync({ albumId: selectedAlbumId, data: photoForm });
    setPhotoForm({ imageUrl: "", caption: "" });
  };

  return (
    <div className="space-y-8">
      {/* Create Album */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2"><FolderOpen size={18} className="text-primary" /> Create New Album</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Album title *" value={albumForm.title} onChange={e => setAlbumForm(f => ({ ...f, title: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
          <Input placeholder="Event date (e.g. May 2025)" value={albumForm.eventDate} onChange={e => setAlbumForm(f => ({ ...f, eventDate: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
          <Input placeholder="Description (optional)" value={albumForm.description} onChange={e => setAlbumForm(f => ({ ...f, description: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
          <Input placeholder="Cover image URL (optional)" value={albumForm.coverImageUrl} onChange={e => setAlbumForm(f => ({ ...f, coverImageUrl: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
        </div>
        <Button onClick={handleCreateAlbum} disabled={createAlbum.isPending || !albumForm.title.trim()} className="bg-primary text-white hover:bg-primary/80">
          <Plus size={16} className="mr-2" /> Create Album
        </Button>
      </div>

      {/* Existing Albums */}
      {albums.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2"><Camera size={18} className="text-primary" /> Add Photos to Album</h3>

          <div className="relative">
            <select
              value={selectedAlbumId ?? ""}
              onChange={e => setSelectedAlbumId(e.target.value ? Number(e.target.value) : null)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 appearance-none pr-8 text-sm"
            >
              <option value="" className="bg-gray-900">Select an album…</option>
              {albums.map(a => <option key={a.id} value={a.id} className="bg-gray-900">{a.title}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>

          {selectedAlbum && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input placeholder="Image URL or path (e.g. /Photos/img.jpg)" value={photoForm.imageUrl} onChange={e => setPhotoForm(f => ({ ...f, imageUrl: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                <Input placeholder="Caption (optional)" value={photoForm.caption} onChange={e => setPhotoForm(f => ({ ...f, caption: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
              <Button onClick={handleAddPhoto} disabled={addPhoto.isPending || !photoForm.imageUrl.trim()} className="bg-primary text-white hover:bg-primary/80">
                <Plus size={16} className="mr-2" /> Add Photo
              </Button>

              {photos.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                  {photos.map(p => (
                    <div key={p.id} className="group relative aspect-square rounded-xl overflow-hidden bg-white/5">
                      <img src={p.imageUrl} alt={p.caption || ""} className="w-full h-full object-cover" />
                      <button
                        onClick={() => deletePhoto.mutate({ id: p.id, albumId: selectedAlbumId! })}
                        className="absolute inset-0 bg-red-500/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Album list with delete */}
      {albums.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl space-y-3">
          <h3 className="text-lg font-bold text-white">Manage Albums</h3>
          {albums.map(album => (
            <div key={album.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div>
                <p className="text-white font-medium text-sm">{album.title}</p>
                {album.eventDate && <p className="text-white/40 text-xs">{album.eventDate}</p>}
              </div>
              <button onClick={() => deleteAlbum.mutate(album.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MarketingSection() {
  const { data: items = [] } = useMarketingWork();
  const createItem = useCreateMarketingItem();
  const deleteItem = useDeleteMarketingItem();

  const [form, setForm] = useState({ title: "", description: "", imageUrl: "", category: "Brand Design" });

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    await createItem.mutateAsync({ ...form, carouselImages: [] });
    setForm({ title: "", description: "", imageUrl: "", category: "Brand Design" });
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2"><Plus size={18} className="text-primary" /> Add Marketing Item</h3>
        <p className="text-white/40 text-xs">Place image files in <code className="bg-white/10 px-1 rounded">client/public/Portfolio Images/</code> then reference them as <code className="bg-white/10 px-1 rounded">/Portfolio Images/filename.png</code></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
          <div className="relative">
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 appearance-none pr-8 text-sm">
              {MARKETING_CATEGORIES.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>
          <Input placeholder="Image URL or path" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
          <Input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
        </div>
        <Button onClick={handleCreate} disabled={createItem.isPending || !form.title.trim()} className="bg-primary text-white hover:bg-primary/80">
          <Plus size={16} className="mr-2" /> Add Item
        </Button>
      </div>

      <div className="glass-panel p-6 rounded-2xl space-y-3">
        <h3 className="text-lg font-bold text-white">Existing Items ({items.length})</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0"><ImageIcon size={16} className="text-white/30" /></div>
                )}
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">{item.title}</p>
                  {item.category && <p className="text-primary text-xs">{item.category}</p>}
                </div>
              </div>
              <button onClick={() => deleteItem.mutate(item.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type Tab = "photography" | "marketing";

export default function Admin() {
  const [tab, setTab] = useState<Tab>("photography");

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto py-20 px-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-white">Admin Panel</h1>
          <p className="text-white/50 text-sm">Manage your photography albums and marketing portfolio.</p>
        </div>

        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit mx-auto">
          <button
            onClick={() => setTab("photography")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === "photography" ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}
          >
            <Camera size={16} /> Photography
          </button>
          <button
            onClick={() => setTab("marketing")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === "marketing" ? "bg-primary text-white" : "text-white/50 hover:text-white"}`}
          >
            <Palette size={16} /> Marketing
          </button>
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {tab === "photography" ? <PhotoSection /> : <MarketingSection />}
        </motion.div>
      </div>
    </PageTransition>
  );
}
