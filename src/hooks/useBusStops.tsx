import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BusStop {
  id: string;
  line_id: string;
  stop_order: number;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string | null;
  fg_condicional: string | null;
}

export const useBusStops = (lineName: string | null) => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lineName) {
      setBusStops([]);
      return;
    }

    const fetchBusStops = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca as paradas fazendo join com a tabela bus_lines
        const { data, error } = await (supabase as any)
          .from('bus_stops')
          .select(`
            *,
            bus_lines!inner(name)
          `)
          .eq('bus_lines.name', lineName)
          .order('stop_order');

        if (error) {
          throw error;
        }

        setBusStops(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar paradas');
        setBusStops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusStops();
  }, [lineName]);

  return { busStops, loading, error };
};
