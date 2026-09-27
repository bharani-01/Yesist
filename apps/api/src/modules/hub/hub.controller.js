import { contextOf } from '../../shared/context.js';
import * as service from './hub.service.js';

export async function listLots(req, res) {
  res.json({ lots: await service.listLots(contextOf(req)) });
}

export async function getLot(req, res) {
  res.json({ lot: await service.getLot(req.valid.params.id, contextOf(req)) });
}

export async function receiveLot(req, res) {
  res.json({ result: await service.receiveLot(req.valid.params.id, req.valid.body, contextOf(req)) });
}

export async function listShipments(req, res) {
  res.json({ shipments: await service.listShipments(contextOf(req)) });
}

export async function getShipment(req, res) {
  res.json({ shipment: await service.getShipment(req.valid.params.id, contextOf(req)) });
}

export async function createShipment(req, res) {
  res.status(201).json({ shipment: await service.createShipment(req.valid.body, contextOf(req)) });
}

export async function addLots(req, res) {
  res.json({ result: await service.addLots(req.valid.params.id, req.valid.body, contextOf(req)) });
}

export async function dispatchShipment(req, res) {
  res.json({ shipment: await service.dispatchShipment(req.valid.params.id, req.valid.body, contextOf(req)) });
}
