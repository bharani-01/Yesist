/** Request context passed from controllers to services (no Express objects past this point). */
export const contextOf = (req) => Object.freeze({
  userId: req.auth?.userId ?? null,
  role: req.auth?.role ?? null,
  org: req.org ?? null,
  ip: req.ip,
  requestId: req.id,
});
