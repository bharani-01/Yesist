import { http } from '../../lib/http.js';

export const authApi = {
  me: () => http.get('/auth/me', { silent401: true }),
  login: (body) => http.post('/auth/login', body, { silent401: true }),
  register: (body) => http.post('/auth/register', body),
  logout: () => http.post('/auth/logout'),
};
