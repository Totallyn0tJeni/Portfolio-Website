import { db } from "./db";
import {
  clubs, marketingWork, projects, messages, testimonials, blogPosts,
  photoAlbums, albumPhotos,
  type Club, type InsertClub,
  type MarketingWork, type InsertMarketingWork,
  type PhotoAlbum, type InsertPhotoAlbum,
  type AlbumPhoto, type InsertAlbumPhoto,
  type Project, type InsertProject,
  type Message, type InsertMessage,
  type Testimonial, type InsertTestimonial,
  type BlogPost, type InsertBlogPost
} from "@shared/schema";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  getClubs(): Promise<Club[]>;
  getMarketingWork(): Promise<MarketingWork[]>;
  createMarketingWork(work: InsertMarketingWork): Promise<MarketingWork>;
  deleteMarketingWork(id: number): Promise<void>;
  getProjects(): Promise<Project[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getLatestBlogPost(): Promise<BlogPost | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  createClub(club: InsertClub): Promise<Club>;
  createProject(project: InsertProject): Promise<Project>;

  // Photo albums
  getPhotoAlbums(): Promise<PhotoAlbum[]>;
  getPhotoAlbum(id: number): Promise<PhotoAlbum | undefined>;
  createPhotoAlbum(album: InsertPhotoAlbum): Promise<PhotoAlbum>;
  deletePhotoAlbum(id: number): Promise<void>;

  // Album photos
  getAlbumPhotos(albumId: number): Promise<AlbumPhoto[]>;
  createAlbumPhoto(photo: InsertAlbumPhoto): Promise<AlbumPhoto>;
  deleteAlbumPhoto(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getClubs(): Promise<Club[]> {
    return await db.select().from(clubs);
  }

  async getMarketingWork(): Promise<MarketingWork[]> {
    return await db.select().from(marketingWork);
  }

  async createMarketingWork(work: InsertMarketingWork): Promise<MarketingWork> {
    const [newWork] = await db.insert(marketingWork).values(work).returning();
    return newWork;
  }

  async deleteMarketingWork(id: number): Promise<void> {
    await db.delete(marketingWork).where(eq(marketingWork.id, id));
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getLatestBlogPost(): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt)).limit(1);
    return post;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async createClub(club: InsertClub): Promise<Club> {
    const [newClub] = await db.insert(clubs).values(club).returning();
    return newClub;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async getPhotoAlbums(): Promise<PhotoAlbum[]> {
    return await db.select().from(photoAlbums).orderBy(desc(photoAlbums.createdAt));
  }

  async getPhotoAlbum(id: number): Promise<PhotoAlbum | undefined> {
    const [album] = await db.select().from(photoAlbums).where(eq(photoAlbums.id, id));
    return album;
  }

  async createPhotoAlbum(album: InsertPhotoAlbum): Promise<PhotoAlbum> {
    const [newAlbum] = await db.insert(photoAlbums).values(album).returning();
    return newAlbum;
  }

  async deletePhotoAlbum(id: number): Promise<void> {
    await db.delete(albumPhotos).where(eq(albumPhotos.albumId, id));
    await db.delete(photoAlbums).where(eq(photoAlbums.id, id));
  }

  async getAlbumPhotos(albumId: number): Promise<AlbumPhoto[]> {
    return await db.select().from(albumPhotos)
      .where(eq(albumPhotos.albumId, albumId))
      .orderBy(asc(albumPhotos.displayOrder));
  }

  async createAlbumPhoto(photo: InsertAlbumPhoto): Promise<AlbumPhoto> {
    const [newPhoto] = await db.insert(albumPhotos).values(photo).returning();
    return newPhoto;
  }

  async deleteAlbumPhoto(id: number): Promise<void> {
    await db.delete(albumPhotos).where(eq(albumPhotos.id, id));
  }
}

export const storage = new DatabaseStorage();
