import { z } from 'zod';
import { insertMessageSchema, clubs, marketingWork, projects, messages } from './schema';

export const api = {
  clubs: {
    list: {
      method: 'GET' as const,
      path: '/api/clubs',
      responses: {
        200: z.array(z.custom<typeof clubs.$inferSelect>()),
      },
    },
  },
  marketing: {
    list: {
      method: 'GET' as const,
      path: '/api/marketing',
      responses: {
        200: z.array(z.custom<typeof marketingWork.$inferSelect>()),
      },
    },
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
