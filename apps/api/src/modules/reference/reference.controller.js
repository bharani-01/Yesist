import * as service from './reference.service.js';

export async function getReference(_req, res) {
  res.set('Cache-Control', 'public, max-age=300');
  res.json(await service.getReferenceData());
}
