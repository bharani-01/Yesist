import { contextOf } from '../../shared/context.js';
import * as service from './lots.service.js';

export async function list(req, res) {
  res.json({ lots: await service.listMyLots(contextOf(req)) });
}

export async function create(req, res) {
  res.status(201).json({ lot: await service.createLot(req.valid.body, contextOf(req)) });
}

export async function dispatch(req, res) {
  res.json({ lot: await service.dispatchLot(req.valid.params.id, req.valid.body, contextOf(req)) });
}
