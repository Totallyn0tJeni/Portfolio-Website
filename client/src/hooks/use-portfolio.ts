import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertMessage, type InsertTestimonial, type Testimonial, type BlogPost, type PhotoAlbum, type AlbumPhoto, type MarketingWork, type InsertPhotoAlbum, type InsertAlbumPhoto, type InsertMarketingWork } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useBlogPosts() {
  return useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const res = await fetch("/api/blog");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return res.json();
    },
  });
}

export function useLatestBlogPost() {
  return useQuery<BlogPost | null>({
    queryKey: ["/api/blog/latest"],
    queryFn: async () => {
      const res = await fetch("/api/blog/latest");
      if (!res.ok) throw new Error("Failed to fetch latest blog post");
      return res.json();
    },
  });
}

export function useTestimonials() {
  return useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });
}

export function useSubmitTestimonial() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      const res = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed to submit testimonial");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Testimonial Submitted", description: "Thank you for your feedback!" });
    },
  });
}

export function useClubs() {
  return useQuery({
    queryKey: [api.clubs.list.path],
    queryFn: async () => {
      const res = await fetch(api.clubs.list.path);
      if (!res.ok) throw new Error("Failed to fetch clubs");
      return api.clubs.list.responses[200].parse(await res.json());
    },
  });
}

export function useMarketingWork() {
  return useQuery<MarketingWork[]>({
    queryKey: [api.marketing.list.path],
    queryFn: async () => {
      const res = await fetch(api.marketing.list.path);
      if (!res.ok) throw new Error("Failed to fetch marketing work");
      return res.json();
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

export function useSendMessage() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.contact.create.input.parse(data);
      const res = await fetch(api.contact.create.path, { method: api.contact.create.method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(validated) });
      if (!res.ok) {
        if (res.status === 400) { const error = await res.json(); throw new Error(error.message || "Invalid input"); }
        throw new Error("Failed to send message");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => { toast({ title: "Message Sent!", description: "Thanks for reaching out. I'll get back to you soon." }); },
    onError: (error) => { toast({ title: "Error", description: error.message, variant: "destructive" }); },
  });
}

// Photo Albums
export function usePhotoAlbums() {
  return useQuery<PhotoAlbum[]>({
    queryKey: ["/api/albums"],
    queryFn: async () => {
      const res = await fetch("/api/albums");
      if (!res.ok) throw new Error("Failed to fetch albums");
      return res.json();
    },
  });
}

export function useAlbumPhotos(albumId: number | null) {
  return useQuery<AlbumPhoto[]>({
    queryKey: ["/api/albums", albumId, "photos"],
    enabled: albumId !== null,
    queryFn: async () => {
      const res = await fetch(`/api/albums/${albumId}/photos`);
      if (!res.ok) throw new Error("Failed to fetch photos");
      return res.json();
    },
  });
}

export function useCreateAlbum() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertPhotoAlbum) => {
      const res = await fetch("/api/albums", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed to create album");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/albums"] });
      toast({ title: "Album Created!" });
    },
    onError: () => { toast({ title: "Error", description: "Failed to create album", variant: "destructive" }); },
  });
}

export function useDeleteAlbum() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/albums/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/albums"] });
      toast({ title: "Album Deleted" });
    },
  });
}

export function useAddPhoto() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ albumId, data }: { albumId: number; data: Omit<InsertAlbumPhoto, "albumId"> }) => {
      const res = await fetch(`/api/albums/${albumId}/photos`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed to add photo");
      return res.json();
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["/api/albums", vars.albumId, "photos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/albums"] });
      toast({ title: "Photo Added!" });
    },
    onError: () => { toast({ title: "Error", description: "Failed to add photo", variant: "destructive" }); },
  });
}

export function useDeletePhoto() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, albumId }: { id: number; albumId: number }) => {
      await fetch(`/api/photos/${id}`, { method: "DELETE" });
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["/api/albums", vars.albumId, "photos"] });
      toast({ title: "Photo Removed" });
    },
  });
}

export function useCreateMarketingItem() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertMarketingWork) => {
      const res = await fetch("/api/marketing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed to create item");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.marketing.list.path] });
      toast({ title: "Marketing Item Added!" });
    },
    onError: () => { toast({ title: "Error", description: "Failed to add item", variant: "destructive" }); },
  });
}

export function useDeleteMarketingItem() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/marketing/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.marketing.list.path] });
      toast({ title: "Item Deleted" });
    },
  });
}
