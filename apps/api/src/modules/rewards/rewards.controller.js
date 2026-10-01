import { contextOf } from '../../shared/context.js';
import * as service from './rewards.service.js';

export async function balance(req, res) {
  const stats = await service.getBalanceAndStats(contextOf(req));
  res.json(stats);
}

export async function ledger(req, res) {
  const entries = await service.getLedger(req.valid?.query ?? req.query, contextOf(req));
  res.json(entries);
}

export async function catalogue(req, res) {
  const items = await service.getCatalogue(contextOf(req));
  res.json(items);
}

export async function redeem(req, res) {
  const result = await service.redeemReward(req.valid?.body ?? req.body, contextOf(req));
  res.status(201).json(result);
}

export async function redemptions(req, res) {
  const list = await service.getUserRedemptions(contextOf(req));
  res.json(list);
}

export async function referral(req, res) {
  const info = await service.getReferralInfo(contextOf(req));
  res.json(info);
}

export async function generateReferral(req, res) {
  const info = await service.generateReferralCode(contextOf(req));
  res.json(info);
}
