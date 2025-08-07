import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { DaySelector } from "@/components/DaySelector";
import { LineSelector } from "@/components/LineSelector";
import { ScheduleCard } from "@/components/ScheduleCard";
import { Footer } from "@/components/Footer";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useAvailableLines } from "@/hooks/useAvailableLines";
import { useSchedules } from "@/hooks/useSchedules";
import { useToast } from "@/hooks/use-toast";
import { BusStops } from "@/components/BusStops";

const Index = () => {
  const [selectedDay, setSelectedDay] = useState<string>("DiasUteis");
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const { location, getCurrentLocation, findNearestLine } = useGeolocation();
  const { availableLines, linesWithDetails, loading: linesLoading } = useAvailableLines(selectedDay);
  const { schedules, loading: schedulesLoading } = useSchedules(selectedLine, selectedDay);
  const { toast } = useToast();

  // Resetar linha selecionada se não estiver disponível no dia atual
  useEffect(() => {
    if (selectedLine && !availableLines.includes(selectedLine)) {
      setSelectedLine(null);
    }
  }, [selectedDay, selectedLine, availableLines]);

  // Função para lidar com solicitação de localização
  const handleRequestLocation = () => {
    getCurrentLocation();
  };

  // Buscar linha mais próxima quando a localização for obtida
  useEffect(() => {
    if (location.coordinates && availableLines.length > 0) {
      const nearestLine = findNearestLine(availableLines);
      if (nearestLine) {
        setSelectedLine(nearestLine);
      }
    }
  }, [location.coordinates, availableLines, findNearestLine]);

  // Converter horários para o formato esperado pelo ScheduleCard
  const formatScheduleForCard = () => {
    if (!schedules.length) return null;
    
    // Se tem destinos, retorna como objeto { time: destination }
    if (schedules.some(s => s.destination)) {
      return schedules.reduce((acc, schedule) => {
        acc[schedule.time] = schedule.destination || "";
        return acc;
      }, {} as Record<string, string>);
    }
    
    // Se não tem destinos, retorna array de horários
    return schedules.map(s => s.time);
  };

  const selectedSchedule = formatScheduleForCard();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Header />
      
      <main className="flex-1 py-6 space-y-6">
        {/* Seletor de Dia */}
        <section>
          <DaySelector
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
          />
        </section>

        {/* Seletor de Linha */}
        <section>
          <LineSelector
            selectedLine={selectedLine}
            onLineChange={setSelectedLine}
            availableLines={availableLines}
            linesWithDetails={linesWithDetails}
            onRequestLocation={handleRequestLocation}
            isRequestingLocation={location.isLoading}
          />
        </section>

        {/* Exibição dos Horários */}
        <section className="px-4">
          {schedulesLoading ? (
            <div className="w-full max-w-2xl mx-auto p-6 text-center">
              <div className="bg-card rounded-lg p-8 border border-border shadow-soft">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Carregando horários...</p>
              </div>
            </div>
          ) : selectedLine && selectedSchedule ? (
            <ScheduleCard
              line={selectedLine}
              schedule={selectedSchedule}
            />
          ) : selectedLine && !selectedSchedule ? (
            <div className="w-full max-w-2xl mx-auto p-6 text-center">
              <div className="bg-muted/50 rounded-lg p-8 border border-border">
                <p className="text-muted-foreground">
                  A {selectedLine} não possui horários para {
                    selectedDay === "DiasUteis" ? "dias úteis" :
                    selectedDay === "Sabado" ? "sábados" : "domingos/feriados"
                  }.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl mx-auto p-6 text-center">
              <div className="bg-card rounded-lg p-8 border border-border shadow-soft">
                <h3 className="text-lg font-semibold mb-2">Selecione uma linha</h3>
                <p className="text-muted-foreground">
                  Escolha uma linha de ônibus para ver os horários ou use sua localização para encontrar a linha mais próxima.
                </p>
              </div>
            </div>
          )}
        </section>
{/* Exibição das Paradas - Aparece apenas quando há linha selecionada */}
        {selectedLine && (
          <section className="px-4">
            <BusStops line={selectedLine} />
          </section>
        )}      
</main>

      <Footer />
    </div>
  );
};

export default Index;
