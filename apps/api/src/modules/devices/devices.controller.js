import { contextOf } from '../../shared/context.js';
import * as service from './devices.service.js';

export async function list(req, res) {
  res.json({ devices: await service.listDevices(contextOf(req)) });
}

export async function claim(req, res) {
  res.json(await service.claimDevice(req.valid.body, contextOf(req)));
}
