import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.clubs.list.path, async (req, res) => {
    const clubs = await storage.getClubs();
    res.json(clubs);
  });

  app.get(api.marketing.list.path, async (req, res) => {
    const work = await storage.getMarketingWork();
    res.json(work);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const clubs = await storage.getClubs();
  if (clubs.length === 0) {
    await storage.createClub({
      name: "Brampton FBLC, JEC & TA",
      role: "Vice President",
      description: "Led initiatives and organized events for future business leaders.",
      category: "main",
      images: ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"],
      link: "#"
    });
    await storage.createClub({
      name: "Chinguacousy Robotics",
      role: "Lead Programmer",
      description: "Developed autonomous code for competition robots.",
      category: "main",
      images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e"],
      link: "#"
    });
    await storage.createClub({
      name: "STAC",
      role: "Member",
      description: "Student Technology Advisory Council - bridging tech and students.",
      category: "main",
      images: ["https://images.unsplash.com/photo-1531482615713-2afd69097998"],
      link: "#"
    });
    await storage.createClub({
      name: "Superposition Toronto",
      role: "Event Coordinator",
      description: "Organized hackathons for underrepresented groups in tech.",
      category: "main",
      images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87"],
      link: "#"
    });
    await storage.createClub({
      name: "Debate Club",
      role: "Member",
      description: "Participated in regional debate tournaments.",
      category: "other",
      images: [],
      link: "#"
    });
  }

  const projects = await storage.getProjects();
  if (projects.length === 0) {
    await storage.createProject({
      title: "Portfolio Website",
      description: "A glassmorphism-styled personal portfolio.",
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      repoLink: "https://github.com/user/portfolio",
      demoLink: "#"
    });
    await storage.createProject({
      title: "E-commerce Dashboard",
      description: "Admin dashboard for managing products and orders.",
      techStack: ["Vue.js", "Node.js", "PostgreSQL"],
      repoLink: "https://github.com/user/dashboard",
      demoLink: "#"
    });
    await storage.createProject({
      title: "Weather App",
      description: "Real-time weather application using OpenWeatherMap API.",
      techStack: ["React", "API Integration"],
      repoLink: "https://github.com/user/weather",
      demoLink: "#"
    });
  }

  const marketing = await storage.getMarketingWork();
  if (marketing.length === 0) {
    // Add some placeholder marketing items
    for (let i = 1; i <= 6; i++) {
      await storage.createMarketingWork({
        title: `Marketing Campaign ${i}`,
        description: "Social media graphics and branding materials.",
        imageUrl: `https://images.unsplash.com/photo-${i % 2 === 0 ? '1542744173-8e7e53415bb0' : '1557804506-669a67965ba0'}`,
        category: "Social Media"
      });
    }
  }
}
