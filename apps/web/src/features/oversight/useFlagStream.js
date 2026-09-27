import { useEffect, useRef, useState } from 'react';
import { oversightApi } from './oversight.api.js';

const DEBOUNCE_MS = 400;
const SEEN_LIMIT = 500;

/**
 * Subscribes to server-sent flag events. Deduplicates repeated events, debounces bursts
 * into one refetch, reports connection state, and closes the stream on unmount.
 * EventSource reconnects automatically; a 'resync' event after reconnect triggers a refetch.
 */
export function useFlagStream(onChange) {
  const [connection, setConnection] = useState('connecting');
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const seen = new Set();
    let timer = null;
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => onChangeRef.current(), DEBOUNCE_MS);
    };

    const source = new EventSource(oversightApi.streamUrl, { withCredentials: true });
    source.onopen = () => setConnection('live');
    source.onerror = () => setConnection(source.readyState === EventSource.CLOSED ? 'closed' : 'reconnecting');
    source.addEventListener('resync', schedule);
    source.addEventListener('flag', (event) => {
      let payload;
      try { payload = JSON.parse(event.data); } catch { return; }
      const key = `${payload.id}:${payload.op}:${event.lastEventId || event.timeStamp}`;
      if (seen.has(key)) return;
      seen.add(key);
      if (seen.size > SEEN_LIMIT) seen.delete(seen.values().next().value);
      schedule();
    });

    return () => {
      clearTimeout(timer);
      source.close();
    };
  }, []);

  return connection;
}
