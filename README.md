# Jenisha Patel — Personal Portfolio

A full-stack personal portfolio site built with React, TypeScript, Express, and PostgreSQL.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
| Routing | Wouter |
| Backend | Node.js + Express 5 |
| Database | PostgreSQL + Drizzle ORM |
| Forms | React Hook Form + Zod |

---

## Local Setup

### Prerequisites

- **Node.js** v20 or later — [nodejs.org](https://nodejs.org)
- **PostgreSQL** v14 or later — [postgresql.org](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)

---

### 1. Clone / Download the project

```bash
# If using git
git clone <your-repo-url>
cd portfolio

# Or unzip the downloaded file and open the folder
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Set up your environment variables

Copy the example env file and fill in your database details:

```bash
cp .env.example .env
```

Then open `.env` and update `DATABASE_URL` with your local PostgreSQL connection:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/portfolio
```

> **Tip:** Create the database first in psql:
> ```sql
> CREATE DATABASE portfolio;
> ```

---

### 4. Push the database schema

This creates all the tables automatically:

```bash
npm run db:push
```

---

### 5. Start the development server

```bash
npm run dev
```

The site will be live at **http://localhost:5000**

---

## Making Updates

Everything you'd want to change is in these files:

| What | File(s) |
|---|---|
| Homepage content | `client/src/pages/Home.tsx` |
| About page | `client/src/pages/About.tsx` |
| Blog posts | Admin panel → `/admin` (passcode: `jenisha2026`) |
| Photography albums | Admin panel → `/admin` |
| Marketing page | `client/src/pages/Marketing.tsx` |
| Coding projects | Admin panel → `/admin` |
| Clubs / Extracurriculars | Admin panel → `/admin` |
| Contact info | `client/src/pages/Contact.tsx` |
| Navigation | `client/src/components/Navigation.tsx` |
| Color theme | `client/src/hooks/use-theme.tsx` |
| Database schema | `shared/schema.ts` (then re-run `npm run db:push`) |
| API routes | `server/routes.ts` |

### Changing the admin passcode

Open `client/src/pages/Admin.tsx` and change line:
```ts
const PASSCODE = "jenisha2026";
```

---

## Building for Production

```bash
npm run build
```

This outputs a production build to the `dist/` folder.

To run the production build:

```bash
npm start
```

The server serves both the API and the built frontend on port **5000**.

---

## Deploying to Your Own Domain

### Option A — Any Linux VPS (Recommended)

1. Upload the project to your server (via SFTP, git, etc.)
2. Install Node.js and PostgreSQL on the server
3. Follow steps 2–4 above on the server
4. Run `npm run build` then `npm start`
5. Use **nginx** as a reverse proxy to point your domain to port 5000:

```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. Use **Certbot** for free HTTPS: `sudo certbot --nginx -d yourdomain.com`
7. Use **PM2** to keep the server running: `pm2 start "npm start" --name portfolio`

### Option B — Railway / Render / Fly.io

These platforms support Node.js + PostgreSQL with no server management:

1. Push the project to a GitHub repo
2. Connect the repo to Railway/Render
3. Add `DATABASE_URL` as an environment variable (they provide a database add-on)
4. Set build command: `npm run build`
5. Set start command: `npm start`
6. Point your custom domain in the platform's settings

### Option C — Vercel (Frontend only)

Not recommended — this project needs a backend. Use Railway or a VPS instead.

---

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/        # One file per page
│   │   ├── components/   # Shared UI components
│   │   ├── hooks/        # Data fetching hooks
│   │   └── index.css     # Global styles + theme variables
│   └── public/           # Static images and assets
│       └── Images/       # Portfolio photos
├── server/               # Express backend
│   ├── routes.ts         # All API endpoints + database seed
│   ├── storage.ts        # Database query functions
│   └── db.ts             # PostgreSQL connection
├── shared/               # Shared between frontend and backend
│   ├── schema.ts         # Database table definitions
│   └── routes.ts         # API route definitions
├── .env.example          # Environment variable template
├── drizzle.config.ts     # Database migration config
└── package.json
```

---

## Adding Images

Place any images into `client/public/Images/` and reference them in the app as `/Images/filename.jpg`.

For portfolio images used in the Marketing admin: place them in `client/public/Portfolio Images/` and reference as `/Portfolio Images/filename.png`.

---

## Troubleshooting

**`DATABASE_URL must be set` error**
→ Make sure you created a `.env` file based on `.env.example` and filled in your database URL.

**`npm run db:push` fails**
→ Check that PostgreSQL is running and the database exists. Verify your `DATABASE_URL` credentials.

**Port already in use**
→ Change the port by setting `PORT=3000` in your `.env` file (the server reads `process.env.PORT`).

**Images not showing**
→ Make sure the images are in `client/public/Images/` (lowercase i) and the path in the app matches exactly including capitalization.
