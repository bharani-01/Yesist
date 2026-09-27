export class AppError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const Errors = Object.freeze({
  badRequest: (code, message, details) => new AppError(400, code, message, details),
  unauthorized: () => new AppError(401, 'unauthenticated', 'Sign in to continue.'),
  forbidden: () => new AppError(403, 'forbidden', 'You do not have access to this.'),
  notFound: (what = 'Record') => new AppError(404, 'not_found', `${what} not found.`),
  conflict: (code, message) => new AppError(409, code, message),
  unprocessable: (code, message) => new AppError(422, code, message),
  tooManyRequests: () => new AppError(429, 'rate_limited', 'Too many attempts. Try again later.'),
});

// Maps PostgreSQL errors raised by constraints, RLS, and triggers to stable API errors.
export function fromDatabaseError(err) {
  switch (err?.code) {
    case '42501':
      return Errors.forbidden();
    case '23505':
      return Errors.conflict('duplicate', 'This record already exists.');
    case '23514':
    case '23503':
    case '22023':
      return Errors.badRequest('rule_violation', 'The request breaks a data rule.', { reason: err.message });
    default:
      return null;
  }
}
