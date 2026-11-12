import express, { type Request, type Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { SEED_PARTNERS, SEED_OFFERS, SEED_PUBLIC_SETTINGS } from './lib/data/seed-data.ts';
import { requireAuth, type AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getUserByUid } from './src/db/users.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

// Enable JSON body parser
app.use(express.json());

// Cloud Run health check endpoints
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'finazen-cloud-run',
  });
});

// Public metadata endpoints
app.get('/api/settings/public', (_req: Request, res: Response) => {
  res.json(SEED_PUBLIC_SETTINGS);
});

app.get('/api/partners', (_req: Request, res: Response) => {
  res.json(SEED_PARTNERS);
});

app.get('/api/offers', (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  if (category) {
    return res.json(SEED_OFFERS.filter(o => o.category === category));
  }
  res.json(SEED_OFFERS);
});

// Authenticated user sync route
app.post('/api/users/sync', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const email = req.user?.email || '';
    const name = (req.user as any)?.name || '';

    if (!uid) {
      return res.status(401).json({ error: 'Missing authenticated user ID' });
    }

    const user = await getOrCreateUser(uid, email, name);
    res.json({ success: true, user });
  } catch (err: any) {
    console.error('Error in /api/users/sync:', err);
    res.status(500).json({ error: 'User sync failed' });
  }
});

app.get('/api/users/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      return res.status(401).json({ error: 'Missing authenticated user ID' });
    }

    const user = await getUserByUid(uid);
    res.json({ user });
  } catch (err: any) {
    console.error('Error in /api/users/me:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Catch-all for undefined /api routes
app.all('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'API route not found' });
});

// Serve frontend static assets from dist/
const distPath = path.resolve(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1h' }));

  // Fallback wildcard for Single Page Application client-side routing
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req: Request, res: Response) => {
    res.status(200).send('Finazen server active. Frontend assets building...');
  });
}

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Finazen production server running on http://${HOST}:${PORT}`);
});

// Graceful shutdown handling for Cloud Run container lifecycle
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received: exiting');
  server.close(() => {
    process.exit(0);
  });
});
