import { AppError, Errors, fromDatabaseError } from '../core/errors.js';

export function notFoundHandler(_req, _res, next) {
  next(Errors.notFound('Route'));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  let appError = err instanceof AppError ? err : fromDatabaseError(err);
  if (appError && !(err instanceof AppError)) {
    req.log?.warn({ dbCode: err.code, dbMessage: err.message, path: req.path }, 'database rule rejected request');
  }
  if (!appError && err?.type === 'entity.parse.failed') {
    appError = Errors.badRequest('invalid_json', 'The request body is not valid JSON.');
  }
  if (!appError && err?.type === 'entity.too.large') {
    appError = new AppError(413, 'payload_too_large', 'The request is too large.');
  }
  if (!appError) {
    (req.log ?? console).error({ err, path: req.path }, 'unhandled error');
    appError = new AppError(500, 'internal', 'Something went wrong. Please try again.');
  }
  if (res.headersSent) return;
  const body = { error: { code: appError.code, message: appError.message, requestId: req.id } };
  if (appError.details) body.error.details = appError.details;
  res.status(appError.status).json(body);
}
