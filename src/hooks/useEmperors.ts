import { useState, useEffect } from 'react';
import { Emperor } from '../types/emperor';

export function useEmperors() {
  const [emperors, setEmperors] = useState<Emperor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmperors = async () => {
      try {
        const response = await fetch('/data/emperors.json');
        if (!response.ok) {
          throw new Error('Failed to load emperors data');
        }
        const data = await response.json();
        setEmperors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadEmperors();
  }, []);

  return { emperors, loading, error };
}