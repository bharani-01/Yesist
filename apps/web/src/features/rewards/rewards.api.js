import { http } from '../../lib/http.js';

export const rewardsApi = {
  balance: (signal) => http.get('/rewards/balance', { signal }),
  ledger: ({ limit = 20, before } = {}, signal) =>
    http.get(`/rewards/ledger?limit=${limit}${before ? `&before=${before}` : ''}`, { signal }),
  catalogue: (signal) => http.get('/rewards/catalogue', { signal }),
  redemptions: (signal) => http.get('/rewards/redemptions', { signal }),
  redeem: (body) => http.post('/rewards/redeem', body),
  referral: (signal) => http.get('/rewards/referral', { signal }),
  generateReferral: () => http.post('/rewards/referral/generate'),
};
