import { z } from 'zod';
import { qrPublicId } from '../../shared/schemas.js';

export const claimBody = z.object({ qr: qrPublicId });
