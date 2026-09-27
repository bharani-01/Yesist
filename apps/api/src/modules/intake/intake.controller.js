import { contextOf } from '../../shared/context.js';
import * as service from './intake.service.js';

export async function list(req, res) {
  res.json({ lots: await service.listInboundLots(contextOf(req)) });
}

export async function getById(req, res) {
  res.json({ lot: await service.getLot(req.valid.params.id, contextOf(req)) });
}

export async function receive(req, res) {
  res.json({ result: await service.receiveLot(req.valid.params.id, req.valid.body, contextOf(req)) });
}
