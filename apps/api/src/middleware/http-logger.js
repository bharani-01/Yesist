/** Logs one line per completed request (no bodies, no query strings with personal data). */
export function httpLogger(req, res, next) {
  const started = process.hrtime.bigint();
  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - started) / 1e6;
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    req.log[level](
      {
        method: req.method,
        path: req.baseUrl + (req.route?.path ?? req.path),
        status: res.statusCode,
        durationMs: Math.round(durationMs),
        userId: req.auth?.userId,
      },
      'request completed',
    );
  });
  next();
}
