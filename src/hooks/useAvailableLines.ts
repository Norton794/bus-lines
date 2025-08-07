/*import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAvailableLines = (dayType: string) => {
  const [availableLines, setAvailableLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableLines = async () => {
      try {
        setLoading(true);
        const { data, error } = await (supabase as any)
          .from('schedules')
          .select('line_name')
          .eq('day_type', dayType)
.order('line_name', { ascending: true });

        if (error) {
          throw error;
        }

        // Get unique line names
        const uniqueLines = [...new Set(data?.map((item: any) => item.line_name) || [])];
        setAvailableLines(uniqueLines as string[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar linhas disponíveis');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableLines();
  }, [dayType]);

  return { availableLines, loading, error };
};*/


import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAvailableLines = (dayType: string) => {
  const [availableLines, setAvailableLines] = useState<string[]>([]);
  const [linesWithDetails, setLinesWithDetails] = useState<Array<{name: string, description: string, displayName: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableLines = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("schedules")
          .select(`
            line_name,
            bus_lines (
              description
            )
          `)
          .eq("day_type", dayType)
          .order("line_name", { ascending: true });

        if (error) {
          throw error;
        }

        // Criar array com detalhes únicos
        const uniqueLinesMap = new Map();
        data?.forEach((item: any) => {
          if (!uniqueLinesMap.has(item.line_name)) {
            uniqueLinesMap.set(item.line_name, {
              name: item.line_name,
              description: item.bus_lines?.description || '',
              displayName: `${item.line_name} - ${item.bus_lines?.description || ''}`
            });
          }
        });

        const linesDetails = Array.from(uniqueLinesMap.values());
        const uniqueLines = linesDetails.map(line => line.name);

        setAvailableLines(uniqueLines);
        setLinesWithDetails(linesDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar linhas disponíveis');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableLines();
  }, [dayType]);

  return { availableLines, linesWithDetails, loading, error };
};
