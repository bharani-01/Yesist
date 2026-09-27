import { contextOf } from '../../shared/context.js';
import * as service from './collection.service.js';

export async function listOpen(req, res) {
  res.json({ jobs: await service.listOpenJobs(contextOf(req)) });
}

export async function listMine(req, res) {
  res.json({ jobs: await service.listMyJobs(contextOf(req)) });
}

export async function getById(req, res) {
  res.json({ job: await service.getJob(req.valid.params.id, contextOf(req)) });
}

export async function accept(req, res) {
  res.json({ job: await service.acceptJob(req.valid.params.id, req.valid.body, contextOf(req)) });
}

export async function collect(req, res) {
  res.json({ result: await service.collectJob(req.valid.params.id, req.valid.body, contextOf(req)) });
}
