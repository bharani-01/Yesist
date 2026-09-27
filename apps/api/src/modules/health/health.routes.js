import { Router } from 'express';
import { checkDatabase } from '../../core/db.js';

export const healthRoutes = Router();

// Liveness: the process is up.
healthRoutes.get('/live', (_req, res) => res.json({ status: 'ok' }));

// Readiness: dependencies are reachable.
healthRoutes.get('/ready', async (_req, res) => {
  try {
    await checkDatabase();
    res.json({ status: 'ok', database: 'ok' });
  } catch {
    res.status(503).json({ status: 'unavailable', database: 'unreachable' });
  }
});
