import { contextOf } from '../../shared/context.js';
import * as service from './producer.service.js';

export async function overview(req, res) {
  res.json(await service.overview(contextOf(req)));
}

export async function listModels(req, res) {
  res.json({ models: await service.listModels(contextOf(req)) });
}

export async function createModel(req, res) {
  res.status(201).json({ model: await service.createModel(req.valid.body, contextOf(req)) });
}

export async function listBatches(req, res) {
  res.json({ batches: await service.listBatches(contextOf(req)) });
}

export async function getBatch(req, res) {
  res.json({ batch: await service.getBatch(req.valid.params.id, contextOf(req)) });
}

export async function createBatch(req, res) {
  res.status(201).json({ batch: await service.createBatch(req.valid.body, contextOf(req)) });
}

export async function registerUnits(req, res) {
  res.json(await service.registerUnits(req.valid.params.id, req.valid.body, contextOf(req)));
}

export async function placeBatch(req, res) {
  res.json({ batch: await service.placeBatch(req.valid.params.id, contextOf(req)) });
}

export async function batchLabels(req, res) {
  res.json(await service.batchLabels(req.valid.params.id, contextOf(req)));
}

export async function listUnits(req, res) {
  res.json({ units: await service.listUnits(req.valid.query, contextOf(req)) });
}
