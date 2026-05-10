import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertTestimonialSchema, insertPhotoAlbumSchema, insertAlbumPhotoSchema, insertMarketingWorkSchema, blogPosts } from "@shared/schema";
import { db } from "./db";
import { like } from "drizzle-orm";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Clubs
  app.get(api.clubs.list.path, async (req, res) => {
    const clubs = await storage.getClubs();
    res.json(clubs);
  });

  // Marketing
  app.get(api.marketing.list.path, async (req, res) => {
    const work = await storage.getMarketingWork();
    res.json(work);
  });

  app.post("/api/marketing", async (req, res) => {
    try {
      const input = insertMarketingWorkSchema.parse(req.body);
      const item = await storage.createMarketingWork(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  app.delete("/api/marketing/:id", async (req, res) => {
    await storage.deleteMarketingWork(Number(req.params.id));
    res.status(204).end();
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const input = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(input);
      res.status(201).json(testimonial);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  // Contact
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

  // Blog
  app.get("/api/blog", async (req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog/latest", async (req, res) => {
    const post = await storage.getLatestBlogPost();
    res.json(post || null);
  });

  // Photo Albums
  app.get("/api/albums", async (req, res) => {
    const albums = await storage.getPhotoAlbums();
    res.json(albums);
  });

  app.get("/api/albums/:id", async (req, res) => {
    const album = await storage.getPhotoAlbum(Number(req.params.id));
    if (!album) { res.status(404).json({ message: "Album not found" }); return; }
    res.json(album);
  });

  app.post("/api/albums", async (req, res) => {
    try {
      const input = insertPhotoAlbumSchema.parse(req.body);
      const album = await storage.createPhotoAlbum(input);
      res.status(201).json(album);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  app.delete("/api/albums/:id", async (req, res) => {
    await storage.deletePhotoAlbum(Number(req.params.id));
    res.status(204).end();
  });

  // Album Photos
  app.get("/api/albums/:id/photos", async (req, res) => {
    const photos = await storage.getAlbumPhotos(Number(req.params.id));
    res.json(photos);
  });

  app.post("/api/albums/:id/photos", async (req, res) => {
    try {
      const input = insertAlbumPhotoSchema.parse({ ...req.body, albumId: Number(req.params.id) });
      const photo = await storage.createAlbumPhoto(input);
      res.status(201).json(photo);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  app.delete("/api/photos/:id", async (req, res) => {
    await storage.deleteAlbumPhoto(Number(req.params.id));
    res.status(204).end();
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const clubs = await storage.getClubs();
  if (clubs.length === 0) {
    await storage.createClub({
      name: "Brampton FBLC, TA & JEC",
      role: "Deputy Director of Marketing Department",
      description: "As Deputy Director of Marketing, I assumed a leadership role in overseeing and supporting the marketing team while working closely with executive leadership to drive organizational goals. I contributed to the development and execution of marketing strategies for large-scale events and initiatives, ensuring alignment with the organization's mission and brand identity. I guided team members by delegating responsibilities, reviewing deliverables, and providing feedback to maintain high standards of quality and consistency. Additionally, I supported strategic planning, evaluated campaign effectiveness, and helped improve engagement through targeted, data-informed marketing approaches, strengthening both team performance and organizational visibility.",
      category: "main",
      images: [
        "/Images/21ba3e6b-87b2-4bff-83f6-cd7ca5067873.jpg",
        "/Images/DSCN5403.JPG",
        "/Images/DSCN5419.JPG"
      ],
      link: "#"
    });

    await storage.createClub({
      name: "Chinguacousy Robotics",
      role: "Business Co-Lead & Social Media Coordinator",
      description: "As the Business Co-Lead & Head Social Media Manager for Chinguacousy Robotics, I managed and represented the team at competitions while leading community outreach events like Grade 9 Orientation and the SciTech Open House, effectively engaging students and sponsors. I spearheaded social media initiatives, boosting community engagement across multiple platforms, and designed marketing materials, including posters, brochures, banners, and presentations, to enhance the team's outreach both online and in person. As the lead photographer and videographer, I oversaw media production to ensure professional documentation of competitions and events. Additionally, I directed a media team, managing logistics and coverage to create compelling promotional content. I also led scouting efforts at FRC competitions, gathering key intelligence on competitors to refine team strategies, and secured sponsorships to fund robot development, club initiatives, and competition participation. Additionally, we won the 2025 REEFSCAPE FIRST Team Spirit Award at the Ontario District Humber College Polytechnic Event.",
      category: "main",
      images: [
        "/Images/E2F61FDF-61F1-4D26-A465-FDF088F91887_L0_001-2025-10-21, 8_45_13 AM.jpg",
        "/Images/6A527F9C-A139-46FF-81CD-AFF4EBC967A7_L0_001-2025-10-14, 8_24_36 PM.jpg",
        "/Images/image (2).png",
        "/Images/WhatsApp Image 2025-05-16 at 09.31.12_8886e90a.jpg",
        "/Images/61AE39F4-B98C-4EA5-9C94-7402B04B37E7_L0_001-2025-10-28, 8_58_19 PM.jpg",
        "/Images/E399BB19-5D2D-4697-833C-DAFC5E984A8F_L0_001-2025-10-23, 1_40_34 AM.jpg"
      ],
      link: "#"
    });

    await storage.createClub({
      name: "Sci-Tech Activity Committee (STAC)",
      role: "Marketing & PR Director",
      description: "Over my tenure with the SciTech Activity Committee, I contributed to shaping and promoting innovative, engaging experiences for the school community. Starting as a Research & Development Officer, I designed technical challenges, planned major events such as SteamWorks, WolfHacks, and the SciTech Open House, and captured high-quality photography and videography to showcase these initiatives. I then advanced to Marketing & Public Relations Officer, leading content creation across social media, presentations, and promotional campaigns that generated over 75,000 views and significantly increased engagement and event turnout. Most recently, as Director of Marketing & Public Relations, I oversaw the Marketing & PR team, developed strategic campaigns, coordinated with event leads, and ensured consistent branding and messaging across all initiatives. Throughout my time with STAC, I combined creativity, leadership, and technical expertise to enhance event visibility, strengthen community engagement, and leave a lasting impact on the organization.",
      category: "main",
      images: [
        "/Images/image (4).png",
        "/Images/unnamed.jpg",
        "/Images/IMG_0166.JPG",
        "/Images/933F8B30-C37F-42B1-87E2-EAB23989B6F0_L0_001-2025-10-21, 1_49_04 AM.jpg",
        "/Images/image (3).png"
      ],
      link: "#"
    });

    await storage.createClub({
      name: "Superposition Toronto",
      role: "Director of Communications",
      description: "As Director of Communications at Superposition Toronto, I lead the organization's external and internal communications strategy, overseeing brand voice, digital presence, and public-facing initiatives. I design and manage social media and promotional content, ensuring consistent, high-quality visuals and messaging across platforms. In addition, I host and lead bi-weekly communications meetings to plan content, align team goals, and coordinate upcoming campaigns and events. Through strategic storytelling, visual design, and cross-team collaboration, I work to increase engagement, strengthen brand identity, and effectively connect Superposition Toronto with its community and stakeholders.",
      category: "main",
      images: [],
      link: "#"
    });

    await storage.createClub({
      name: "Student Activity Committee",
      role: "Videographer",
      description: "As a Videographer for the Chinguacousy Student Activity Council, I played a key role in organizing major student events, including Grade 9 Orientation and Semi-Formal, ensuring seamless execution and engagement. I created eye-catching promotional materials, such as social media content, presentations, and flyers, helping to boost event awareness and attract around 400 attendees. Leading a media team, I captured high-quality event photography and videography for promotional and archival purposes. Additionally, I assisted in troubleshooting technical and logistical challenges to ensure smooth event operations.",
      category: "other",
      images: [
        "/Images/WhatsApp Image 2025-05-16 at 14.10.43_e77f212a.jpg",
        "/Images/E284159A-AAA0-4050-99ED-DCBA73F89D98_L0_001-2025-01-01, 1_37_50 AM.jpg"
      ],
      link: "#"
    });

    await storage.createClub({
      name: "Sending Sunshine Chinguacousy Chapter",
      role: "Advertizing Manager",
      description: "Managed advertising and outreach for the Chinguacousy Chapter's initiatives under Sending Sunshine. Designed promotional materials, coordinated social media campaigns, and boosted community engagement for student-led events and programs.",
      category: "other",
      images: [],
      link: "#"
    });

    await storage.createClub({
      name: "Gujurati Student Society",
      role: "Marketing Director",
      description: "As Marketing Director & Lead Social Media Manager, I lead the organization's overall marketing strategy and oversee its digital presence across all social media platforms. I plan, design, and manage high-impact visual and written content, ensuring consistent branding and messaging across campaigns and initiatives. In this role, I analyze engagement metrics to optimize content performance, schedule and execute promotional campaigns, and adapt strategies based on audience insights. I also coordinate marketing efforts across teams, support event promotion, and guide content planning to drive increased visibility, sustained audience growth, and meaningful community engagement.",
      category: "other",
      images: [],
      link: "#"
    });

    await storage.createClub({
      name: "Chinguacousy Secondary School",
      role: "Student Ambassador",
      description: "Represented the student body as a School Ambassador, supporting school events, leading campus tours, and promoting a positive school culture. As a member of the Wolfpack student leadership team, collaborated on school spirit initiatives, mentored peers, and contributed to community-building efforts within the school.",
      category: "other",
      images: [],
      link: "#"
    });

    await storage.createClub({
      name: "Chinguacousy Scholars",
      role: "Executive Marketing Director",
      description: "As Executive Marketing Director for Ching Scholars, I lead the organization's overall marketing strategy and brand development, overseeing social media presence, promotional campaigns, and community outreach. I design and manage high-impact visual content, plan and execute marketing initiatives for events and programs, and ensure consistent messaging across all platforms. I also coordinate the marketing team through regular planning meetings, delegate tasks, and collaborate with executive members to align marketing goals with the organization's mission, driving engagement, visibility, and sustained growth within the school community.",
      category: "other",
      images: [],
      link: "#"
    });
  }

  const projects = await storage.getProjects();
  if (projects.length === 0) {
    await storage.createProject({
      title: "Portfolio Website",
      description: "Designed and developed a personal portfolio website to showcase my achievements, marketing work, coding projects, club involvement, and resume. Built a responsive, modern interface using React and TypeScript, with a Node.js backend to manage content and functionality. Focused on clear information architecture, performance, and presenting a strong personal brand online.",
      techStack: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"],
      repoLink: "https://github.com/Totallyn0tJeni/Portfolio-Website",
      demoLink: "#"
    });
    await storage.createProject({
      title: "Smart Home Display",
      description: "Designed and engineered a smart home display system that integrates software, physical hardware, and third-party applications into a centralized home information and control platform. Developed a responsive front-end interface using React and TypeScript to display real-time data and provide intuitive user interaction, supported by a Node.js backend that manages system logic, API requests, and data flow between the interface, external applications, and hardware components.",
      techStack: ["React.js", "Node.js", "PostgreSQL", "Python"],
      repoLink: "https://github.com/Totallyn0tJeni/Smart-display",
      demoLink: "#"
    });
  }

  const marketing = await storage.getMarketingWork();
  if (marketing.length === 0) {
    const marketingItems = [
      { title: "Marketing Campaign - Jamnshimi", imageUrl: "/Portfolio Images/1.png", carouselImages: ["/Portfolio Images/1.png", "/Portfolio Images/2.png", "/Portfolio Images/3.png"], description: "A series of social media posts for the Hindu Festival Jamnshimi.", category: "Social Media" },
      { title: "Ambassador Applications", imageUrl: "/Portfolio Images/4.png", carouselImages: ["/Portfolio Images/FINAL.png"], description: "Visual assets for recruitment of student ambassadors.", category: "Brand Design" },
      { title: "Aviation & Aerospace Flyer", imageUrl: "/Portfolio Images/Aviation & Areospace SHSM Flyer.png", description: "SHSM program flyer for aviation and aerospace.", category: "Print Design" },
      { title: "Wolfhacks 26 Banner", imageUrl: "/Portfolio Images/updated wolhacks 26 banner .png", description: "Event banner for WolfHacks 2026 hackathon.", category: "Event Marketing" },
      { title: "EHS Flyer", imageUrl: "/Portfolio Images/EHS Flyer_ R.E.M.png", description: "Promotional flyer for EHS event.", category: "Print Design" },
      { title: "STEM Expo", imageUrl: "/Portfolio Images/STEM University Expo 5.o.png", description: "Visual for STEM University Expo event.", category: "Event Marketing" },
      { title: "Wolfhacks Final Poster", imageUrl: "/Portfolio Images/wolfhacks final poster.png", description: "Final event poster for WolfHacks hackathon.", category: "Event Marketing" },
      { title: "GSS Posts", imageUrl: "/Portfolio Images/GSS Posts (3).png", description: "Social media posts for the Gujurati Student Society.", category: "Social Media" },
      { title: "Restaurant Menu", imageUrl: "/Portfolio Images/Restarunt Menu - Buisness.png", description: "Business class restaurant menu design.", category: "Brand Design" },
      { title: "Career Assignment", imageUrl: "/Portfolio Images/Career Assignment - Comp Eng.png", description: "Computer Engineering career assignment visual.", category: "Print Design" },
      { title: "Scitech Activity Committee", imageUrl: "/Portfolio Images/Scitech Activity Committee.png", description: "Promotional visual for STAC.", category: "Brand Design" },
      { title: "SHSM Flyer", imageUrl: "/Portfolio Images/SHSM Flyer_ R.E.M.png", description: "Specialist High Skills Major program flyer.", category: "Print Design" },
      { title: "STAC Sponsorship Package", imageUrl: "/Portfolio Images/STAC Sponsorship & Donation Package (Final Copy).png", description: "Sponsorship and donation package for STAC.", category: "Brand Design" },
      { title: "Wolfhacks Graphic", imageUrl: "/Portfolio Images/WOlfhacks (1).png", description: "Promotional graphic for WolfHacks.", category: "Event Marketing" },
      { title: "Final Graphic", imageUrl: "/Portfolio Images/FINAL.png", description: "Final design asset.", category: "Brand Design" },
      { title: "Transformed Graphic", imageUrl: "/Portfolio Images/wmremove-transformed (1).png", description: "Transformed design asset.", category: "Brand Design" },
    ];

    for (const item of marketingItems) {
      await storage.createMarketingWork({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        carouselImages: item.carouselImages || [],
        category: item.category,
      });
    }
  }

  const testimonials = await storage.getTestimonials();
  if (testimonials.length === 0) {
    await storage.createTestimonial({ name: "Alex Thompson", role: "Project Lead, TechCorp", content: "Jenisha is an incredibly talented and dedicated individual. Her marketing strategies for our latest campaign were data-driven and highly effective." });
    await storage.createTestimonial({ name: "Sarah Chen", role: "Founder, InnovateNow", content: "Working with Jenisha on our rebranding was a pleasure. She has a keen eye for design and a deep understanding of brand storytelling." });
  }

  await db.update(blogPosts).set({ imageUrl: null }).where(like(blogPosts.imageUrl, '%unsplash%'));

  // Remove old FRC 2025 post — replaced by 2026
  await storage.deleteBlogPostByTitle("FRC Provincials 2025 — Chinguacousy Robotics");

  const existingPosts = await storage.getBlogPosts();
  const blogTitles = existingPosts.map(p => p.title);

  // Posts seeded oldest → newest so desc sort shows newest (WolfHacks) at top
  if (!blogTitles.includes("CNLC 2026 — Canadian National Leadership Conference")) {
    await storage.createBlogPost({
      title: "CNLC 2026 — Canadian National Leadership Conference",
      content: "Attended the Canadian National Leadership Conference (CNLC) in February 2026, connecting with student leaders from across the country. The conference brought together driven young leaders for workshops, keynote sessions, and networking opportunities focused on leadership development, civic engagement, and making a meaningful impact. It was an incredible experience to exchange ideas, build national connections, and grow as a leader alongside some of Canada's most passionate students.",
      publishedAt: new Date("2026-02-26"),
    });
  }

  if (!blogTitles.includes("Robotics Competitions 2026 — Chinguacousy Robotics")) {
    await storage.createBlogPost({
      title: "Robotics Competitions 2026 — Chinguacousy Robotics",
      content: "Competed in the 2026 FRC season representing Chinguacousy Robotics. As Business Co-Lead & Social Media Coordinator, I managed our team's outreach strategy, documenting each competition through photography and videography, running our social media presence, and leading scouting efforts to support our alliance selections. Every competition was an opportunity to showcase our team's hard work and dedication — from build season all the way to the competition floor.",
      publishedAt: new Date("2026-03-15"),
    });
  }

  if (!blogTitles.includes("CYCS 2026 — Canadian Youth Changemakers Summit")) {
    await storage.createBlogPost({
      title: "CYCS 2026 — Canadian Youth Changemakers Summit",
      content: "Participated in the Canadian Youth Changemakers Summit (CYCS) 2026, a national gathering of youth committed to social change and community impact. The summit featured panels, workshops, and collaborative sessions on advocacy, entrepreneurship, and leadership. It was a powerful reminder of the impact young people can have when given the right platform — and an inspiring opportunity to connect with changemakers from every corner of Canada.",
      publishedAt: new Date("2026-04-10"),
    });
  }

  if (!blogTitles.includes("FRC Provincials 2026 — Chinguacousy Robotics")) {
    await storage.createBlogPost({
      title: "FRC Provincials 2026 — Chinguacousy Robotics",
      content: "Competed at the FRC Ontario Provincial Championship 2026 representing Chinguacousy Robotics. As Business Co-Lead & Social Media Coordinator, I led our team's outreach and media presence throughout the event — documenting matches, scouting competitors, and keeping our community engaged online. It was an incredible experience showcasing the hard work our team put in all season, and a proud moment as we represented our school on a provincial stage.",
      publishedAt: new Date("2026-04-25"),
    });
  }

  if (!blogTitles.includes("WolfHacks — Hackathon Event")) {
    await storage.createBlogPost({
      title: "WolfHacks — Hackathon Event",
      content: "WolfHacks is a student-run hackathon organized by the Sci-Tech Activity Committee (STAC) at Chinguacousy Secondary School. As part of the Marketing & PR team, I helped design promotional materials, coordinated social media campaigns, and drove awareness leading up to the event. WolfHacks brought together students to collaborate, build, and innovate — and seeing it all come together was incredibly rewarding. The event featured coding challenges, workshops, and prizes, drawing strong participation from the student community.",
      publishedAt: new Date("2026-05-10"),
    });
  }
}
