import { subscribe } from '../../realtime/flag-events.js';
import { contextOf } from '../../shared/context.js';
import * as service from './oversight.service.js';

export async function overview(req, res) {
  res.json(await service.getOverview(contextOf(req)));
}

export async function listFlags(req, res) {
  res.json({ flags: await service.listFlags(req.valid.query.status, contextOf(req)) });
}

export async function updateFlag(req, res) {
  res.json({ flag: await service.updateFlag(req.valid.params.id, req.valid.body, contextOf(req)) });
}

// Server-sent events: pushes flag ids only; the client refetches through the authorised API.
export function stream(req, res) {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-store',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.flushHeaders();
  res.write('retry: 5000\n\n');
  const unsubscribe = subscribe(res);
  req.on('close', unsubscribe);
}
