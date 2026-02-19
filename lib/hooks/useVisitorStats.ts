import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitsToday: number;
  date: string;
  isNewVisitorToday: boolean;
}

export function useVisitorStats(refreshInterval: number = 5000, useRealtime: boolean = true) {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisits: 0,
    uniqueVisitsToday: 0,
    date: new Date().toISOString().split('T')[0],
    isNewVisitorToday: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVisitorStats = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch('/api/visitors');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setStats({
        totalVisits: data.totalVisits || 0,
        uniqueVisitsToday: data.uniqueVisitsToday || 0,
        date: data.date || new Date().toISOString().split('T')[0],
        isNewVisitorToday: data.isNewVisitorToday || false
      });
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch visitor stats';
      setError(errorMessage);
      setLoading(false);
      console.error('Error fetching visitor stats:', err);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchVisitorStats();
  }, [fetchVisitorStats]);

  // Set up polling for real-time updates
  useEffect(() => {
    const interval = setInterval(fetchVisitorStats, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchVisitorStats, refreshInterval]);

  // Optionally subscribe to Supabase realtime changes to update immediately
  useEffect(() => {
    if (!useRealtime || !supabase) return;

    const channel = supabase
      .channel('visitor_stats_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'visitor_stats' },
        (payload) => {
          try {
            const newRow: any = payload.new;
            if (newRow) {
              setStats((prev) => ({
                ...prev,
                totalVisits: Number(newRow.total_visits_all_time) || prev.totalVisits,
                uniqueVisitsToday: Number(newRow.unique_visits_today) || prev.uniqueVisitsToday,
                date: newRow.date || prev.date,
              }));
            }
          } catch (err) {
            console.error('Error handling realtime visitor_stats payload:', err);
          }
        }
      )
      .subscribe();

    return () => {
      try {
        if (supabase && channel) {
          // @ts-ignore - runtime API
          supabase.removeChannel && supabase.removeChannel(channel);
        }
      } catch (err) {
        try {
          // @ts-ignore
          channel.unsubscribe && channel.unsubscribe();
        } catch (e) {}
      }
    };
  }, [useRealtime]);

  return { stats, loading, error, refetch: fetchVisitorStats };
}
