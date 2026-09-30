import { withTx } from '../../core/db.js';
import * as repo from './reference.repository.js';

export const getReferenceData = () =>
  withTx(null, async (tx) => ({
    categories: await repo.listCategories(tx),
    wards: await repo.listWards(tx),
  }));

export const getAgentIdentity = (userId) =>
  withTx(null, (tx) => repo.getAgentIdentity(tx, userId));
