import { db } from "./db";
import {
  clubs, marketingWork, projects, messages, testimonials, blogPosts,
  type Club, type InsertClub,
  type MarketingWork, type InsertMarketingWork,
  type Project, type InsertProject,
  type Message, type InsertMessage,
  type Testimonial, type InsertTestimonial,
  type BlogPost, type InsertBlogPost
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getClubs(): Promise<Club[]>;
  getMarketingWork(): Promise<MarketingWork[]>;
  getProjects(): Promise<Project[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getLatestBlogPost(): Promise<BlogPost | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Seed methods
  createClub(club: InsertClub): Promise<Club>;
  createMarketingWork(work: InsertMarketingWork): Promise<MarketingWork>;
  createProject(project: InsertProject): Promise<Project>;
}

export class DatabaseStorage implements IStorage {
  async getClubs(): Promise<Club[]> {
    return await db.select().from(clubs);
  }

  async getMarketingWork(): Promise<MarketingWork[]> {
    return await db.select().from(marketingWork);
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

  async createMarketingWork(work: InsertMarketingWork): Promise<MarketingWork> {
    const [newWork] = await db.insert(marketingWork).values(work).returning();
    return newWork;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }
}

export const storage = new DatabaseStorage();
