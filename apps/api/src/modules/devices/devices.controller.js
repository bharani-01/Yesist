import { contextOf } from '../../shared/context.js';
import * as service from './devices.service.js';

export async function list(req, res) {
  res.json({ devices: await service.listDevices(contextOf(req)) });
}

export async function claim(req, res) {
  res.json(await service.claimDevice(req.valid.body, contextOf(req)));
}

export async function certificate(req, res) {
  res.json({ certificate: await service.getDeviceCertificate(req.params.qr, contextOf(req)) });
}

export async function addManual(req, res) {
  res.status(201).json({ device: await service.addManualDevice(req.valid.body, contextOf(req)) });
}

// Photo upload stub — returns a placeholder; replace with real storage (Supabase Storage / GCS) when ready.
export async function uploadPhoto(req, res) {
  res.json({ url: null });
}
