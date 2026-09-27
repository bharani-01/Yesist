import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Runs an async loader and tracks loading / success / error. Aborts stale requests
 * on dependency change and unmount; reload() refetches without clearing current data.
 */
export function useAsync(loader, deps = []) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  const controllerRef = useRef(null);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  const run = useCallback(async ({ background = false } = {}) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    if (!background) setState((s) => ({ ...s, status: 'loading', error: null }));
    try {
      const data = await loaderRef.current(controller.signal);
      if (!controller.signal.aborted) setState({ status: 'success', data, error: null });
    } catch (error) {
      if (error.name === 'AbortError' || controller.signal.aborted) return;
      setState((s) => ({ status: 'error', data: s.data, error }));
    }
  }, []);

  useEffect(() => {
    run();
    return () => controllerRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, reload: run, refresh: () => run({ background: true }) };
}

/** Wraps a mutation with pending and error state. */
export function useMutation(fn) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const mounted = useRef(true);
  useEffect(() => () => { mounted.current = false; }, []);

  const mutate = useCallback(async (...args) => {
    setPending(true);
    setError(null);
    try {
      return await fn(...args);
    } catch (err) {
      if (mounted.current) setError(err);
      throw err;
    } finally {
      if (mounted.current) setPending(false);
    }
  }, [fn]);

  return { mutate, pending, error, reset: () => setError(null) };
}
