import { useAsync } from '../../hooks/useAsync.js';
import { http } from '../../lib/http.js';

let cache = null;

/** Categories and wards; fetched once per session and shared. */
export function useReference() {
  return useAsync(async (signal) => {
    if (!cache) cache = await http.get('/reference', { signal });
    return cache;
  }, []);
}
