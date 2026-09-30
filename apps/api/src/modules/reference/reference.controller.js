import * as service from './reference.service.js';

export async function getReference(_req, res) {
  res.set('Cache-Control', 'public, max-age=300');
  res.json(await service.getReferenceData());
}

export async function getAgentIdentity(req, res) {
  const agent = await service.getAgentIdentity(req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.json(agent);
}
