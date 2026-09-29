import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { API_PREFIX } from './config/constants.js';
import { env } from './config/env.js';
import { authenticate } from './middleware/authenticate.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { httpLogger } from './middleware/http-logger.js';
import { originGuard } from './middleware/origin-guard.js';
import { apiLimiter } from './middleware/rate-limit.js';
import { requestContext } from './middleware/request-context.js';
import { buildApiRouter } from './routes/index.js';

const WEB_DIST = resolve(dirname(fileURLToPath(import.meta.url)), '../../web/dist');
// Routes that parse their own (larger) JSON body.
const OWN_BODY_PARSER = /^\/api\/v1\/producer\/batches\/[^/]+\/units$/;

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', env.trustProxy);

  // Order matters: context → logging → security → parsing → auth → routes → errors.
  app.use(requestContext);
  app.use(httpLogger);
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://unpkg.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://unpkg.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
  }));
  const json = express.json({ limit: '100kb' });
  app.use((req, res, next) => (OWN_BODY_PARSER.test(req.path) ? next() : json(req, res, next)));
  app.use(cookieParser());

  // Tile proxy: fetches OSM tiles server-side so the browser never hits an external CSP-blocked domain.
  app.get('/tiles/:z/:x/:y', async (req, res) => {
    const { z, x, y } = req.params;
    const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
    try {
      const upstream = await fetch(url, {
        signal: AbortSignal.timeout(8000),
        headers: { 'User-Agent': 'EcoSure/1.0 (+https://ecosure.trackifyapp.co.in)' },
      });
      if (!upstream.ok) return res.status(upstream.status).end();
      const buf = Buffer.from(await upstream.arrayBuffer());
      res.set('Content-Type', upstream.headers.get('Content-Type') || 'image/png');
      res.set('Cache-Control', 'public, max-age=86400');
      res.send(buf);
    } catch {
      res.status(502).end();
    }
  });

  app.use(API_PREFIX, apiLimiter, originGuard, authenticate, buildApiRouter());
  app.use(API_PREFIX, notFoundHandler);

  // Serves the built web client in production (single origin, no CORS needed).
  if (existsSync(WEB_DIST)) {
    app.use(express.static(WEB_DIST, { index: false, maxAge: '1h' }));
    app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(resolve(WEB_DIST, 'index.html')));
  }

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
