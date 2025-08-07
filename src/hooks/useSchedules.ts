import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Schedule {
  id: string;
  line_name: string;
  day_type: string;
  time: string;
  destination?: string;
}

export const useSchedules = (lineName: string | null, dayType: string) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lineName) {
      setSchedules([]);
      return;
    }

    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const { data, error } = await (supabase as any)
          .from('schedules')
          .select('*')
          .eq('line_name', lineName)
          .eq('day_type', dayType)
          .order('time');

        if (error) {
          throw error;
        }

        setSchedules(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar horários');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [lineName, dayType]);

  return { schedules, loading, error };
};