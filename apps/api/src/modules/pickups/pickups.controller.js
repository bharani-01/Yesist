import { contextOf } from '../../shared/context.js';
import * as service from './pickups.service.js';

export async function create(req, res) {
  res.status(201).json({ pickup: await service.createPickup(req.valid.body, contextOf(req)) });
}

export async function list(req, res) {
  res.json({ pickups: await service.listMyPickups(contextOf(req)) });
}

export async function getById(req, res) {
  res.json({ pickup: await service.getMyPickup(req.valid.params.id, contextOf(req)) });
}

export async function cancel(req, res) {
  res.json({ pickup: await service.cancelPickup(req.valid.params.id, req.valid.body, contextOf(req)) });
}

export async function issueHandoverCode(req, res) {
  res.json(await service.issueHandoverCode(req.valid.params.id, contextOf(req)));
}
