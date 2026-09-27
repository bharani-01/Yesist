import { Errors } from '../core/errors.js';

/** 401 when there is no valid session. */
export function requireAuth(req, _res, next) {
  if (!req.auth) return next(Errors.unauthorized());
  return next();
}

/** 403 unless the signed-in user's workspace is one of the given workspaces. */
export function requireWorkspace(...workspaces) {
  return (req, _res, next) => {
    if (!req.auth) return next(Errors.unauthorized());
    if (!workspaces.includes(req.auth.workspace)) return next(Errors.forbidden());
    return next();
  };
}

/** 403 unless the user's platform role is one of the given roles. */
export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.auth) return next(Errors.unauthorized());
    if (!roles.includes(req.auth.role)) return next(Errors.forbidden());
    return next();
  };
}

/**
 * Resolves the acting organization into req.org.
 * Optionally restricts the member's org role (e.g. maker-checker approvers).
 */
export function requireOrg(orgTypes, { roles } = {}) {
  return (req, _res, next) => {
    if (!req.auth) return next(Errors.unauthorized());
    const org = req.auth.orgs.find((o) => orgTypes.includes(o.type));
    if (!org) return next(Errors.forbidden());
    if (roles && !roles.includes(org.orgRole)) return next(Errors.forbidden());
    req.org = org;
    return next();
  };
}
