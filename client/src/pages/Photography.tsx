import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, ImageOff, FolderOpen } from "lucide-react";
import { useState } from "react";
import { usePhotoAlbums, useAlbumPhotos } from "@/hooks/use-portfolio";
import type { PhotoAlbum, AlbumPhoto } from "@shared/schema";

function AlbumModal({ album, onClose }: { album: PhotoAlbum; onClose: () => void }) {
  const { data: photos = [], isLoading } = useAlbumPhotos(album.id);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full" onClick={e => e.stopPropagation()}>
        <div>
          <h2 className="text-2xl font-bold text-white">{album.title}</h2>
          {album.eventDate && <p className="text-white/50 text-sm mt-1">{album.eventDate}</p>}
          {album.description && <p className="text-white/60 text-sm mt-1">{album.description}</p>}
        </div>
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 max-w-7xl mx-auto w-full" onClick={e => e.stopPropagation()}>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />)}
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/40 gap-4">
            <ImageOff size={48} />
            <p>No photos in this album yet. Add some from the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative"
                onClick={() => setLightboxIdx(idx)}
              >
                <img src={photo.imageUrl} alt={photo.caption || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs">{photo.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            <button onClick={e => { e.stopPropagation(); setLightboxIdx(null); }} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
              <X size={24} />
            </button>
            {lightboxIdx > 0 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }} className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white">
                <ChevronLeft size={28} />
              </button>
            )}
            {lightboxIdx < photos.length - 1 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }} className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white">
                <ChevronRight size={28} />
              </button>
            )}
            <img
              src={photos[lightboxIdx].imageUrl}
              alt={photos[lightboxIdx].caption || ""}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
              onClick={e => e.stopPropagation()}
            />
            {photos[lightboxIdx].caption && (
              <p className="absolute bottom-6 text-white/70 text-sm">{photos[lightboxIdx].caption}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Photography() {
  const { data: albums = [], isLoading } = usePhotoAlbums();
  const [selectedAlbum, setSelectedAlbum] = useState<PhotoAlbum | null>(null);

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Photography</h1>
          <p className="text-white/60">Capturing moments and perspectives through the lens.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="aspect-video rounded-3xl bg-white/5 animate-pulse" />)}
          </div>
        ) : albums.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] glass-card rounded-3xl p-12 text-center border border-white/10">
            <div className="bg-primary/20 p-6 rounded-full mb-6">
              <Camera className="text-primary" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Gallery Coming Soon</h2>
            <p className="text-white/60 max-w-md mx-auto leading-relaxed">
              Albums will appear here once they're created. Visit the admin panel to set up your first photo album.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-8" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album, idx) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="group cursor-pointer glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300"
                onClick={() => setSelectedAlbum(album)}
              >
                <div className="aspect-video relative overflow-hidden bg-white/5">
                  {album.coverImageUrl ? (
                    <img src={album.coverImageUrl} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3 text-white/30">
                        <FolderOpen size={40} />
                        <span className="text-sm">No cover image</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight">{album.title}</h3>
                    {album.eventDate && <p className="text-white/60 text-xs mt-1">{album.eventDate}</p>}
                  </div>
                </div>
                {album.description && (
                  <div className="p-4">
                    <p className="text-white/60 text-sm line-clamp-2">{album.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedAlbum && <AlbumModal album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />}
      </AnimatePresence>
    </PageTransition>
  );
}
