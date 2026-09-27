/** Prevents caching of authenticated or sensitive API responses. */
export function noStore(_req, res, next) {
  res.set('Cache-Control', 'no-store');
  next();
}
