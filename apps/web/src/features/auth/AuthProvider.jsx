import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { onUnauthorized } from '../../lib/http.js';
import { authApi } from './auth.api.js';

const AuthContext = createContext(null);

export const HOME_BY_WORKSPACE = {
  citizen: '/pickups',
  agent: '/agent',
  recycler: '/recycler',
  hub: '/hub',
  producer: '/producer',
  oversight: '/oversight',
};

export const WORKSPACE_LABELS = {
  citizen: 'Citizen',
  agent: 'Collection agent',
  recycler: 'Recycler',
  hub: 'Regional hub',
  producer: 'Manufacturer',
  oversight: 'Oversight',
};

export function AuthProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', user: null, sessionExpired: false });

  const refresh = useCallback(async () => {
    try {
      const { user } = await authApi.me();
      setState({ status: 'authenticated', user, sessionExpired: false });
    } catch (err) {
      if (err.status === 401) setState({ status: 'anonymous', user: null, sessionExpired: false });
      else setState({ status: 'error', user: null, sessionExpired: false, error: err });
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Any authenticated call returning 401 means the session ended (expiry or revocation).
  useEffect(() => onUnauthorized(() => {
    setState((s) => (s.status === 'authenticated' ? { status: 'anonymous', user: null, sessionExpired: true } : s));
  }), []);

  const value = useMemo(() => ({
    ...state,
    refresh,
    login: async (credentials) => {
      const { user } = await authApi.login(credentials);
      setState({ status: 'authenticated', user, sessionExpired: false });
      return user;
    },
    register: async (input) => {
      const { user } = await authApi.register(input);
      setState({ status: 'authenticated', user, sessionExpired: false });
      return user;
    },
    logout: async () => {
      await authApi.logout().catch(() => {});
      setState({ status: 'anonymous', user: null, sessionExpired: false });
    },
  }), [state, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
