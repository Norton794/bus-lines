import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BusLine {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export const useBusLines = () => {
  const [busLines, setBusLines] = useState<BusLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusLines = async () => {
      try {
        setLoading(true);
        const { data, error } = await (supabase as any)
          .from('bus_lines')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setBusLines(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar linhas');
      } finally {
        setLoading(false);
      }
    };

    fetchBusLines();
  }, []);

  return { busLines, loading, error };
};