import { Errors } from '../core/errors.js';

/**
 * Validates request parts against zod schemas and exposes the parsed values on req.valid.
 * Usage: validate({ params: idParams, body: createSchema, query: listQuery })
 */
export function validate(schemas) {
  return (req, _res, next) => {
    const valid = {};
    const issues = [];
    for (const part of ['params', 'query', 'body']) {
      if (!schemas[part]) continue;
      const result = schemas[part].safeParse(req[part] ?? {});
      if (result.success) valid[part] = result.data;
      else issues.push(...result.error.issues.map((i) => ({ path: [part, ...i.path].join('.'), message: i.message })));
    }
    if (issues.length) return next(Errors.badRequest('validation_failed', 'Some fields need attention.', issues));
    req.valid = valid;
    return next();
  };
}
