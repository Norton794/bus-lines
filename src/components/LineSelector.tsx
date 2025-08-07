import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LineSelectorProps {
  selectedLine: string | null;
  onLineChange: (line: string) => void;
  availableLines: string[];
  linesWithDetails: Array<{name: string, description: string, displayName: string}>; // Para exibição
  onRequestLocation: () => void;
  isRequestingLocation: boolean;
}

export const LineSelector = ({ 
  selectedLine, 
  onLineChange, 
  availableLines, 
  linesWithDetails, // ← ADICIONAR ESTA LINHA
  onRequestLocation,
  isRequestingLocation 
}: LineSelectorProps) => {
  const { toast } = useToast();

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      onRequestLocation();
    } else {
      toast({
        title: "Geolocalização não disponível",
        description: "Seu navegador não suporta geolocalização. Selecione uma linha manualmente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <Button
          onClick={handleLocationRequest}
          disabled={isRequestingLocation}
          variant="outline"
          className="flex items-center gap-2 h-11 px-4 min-w-fit"
        >
          {isRequestingLocation ? (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Navigation className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {isRequestingLocation ? "Obtendo..." : "Usar Localização"}
          </span>
          <span className="sm:hidden">
            {isRequestingLocation ? "..." : "GPS"}
          </span>
        </Button>
        
        <div className="flex-1 w-full">
          <Select value={selectedLine || ""} onValueChange={onLineChange}>
            <SelectTrigger className="h-11 bg-card border-border">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Selecione uma linha de ônibus" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {linesWithDetails?.map((line) => (
                <SelectItem key={line.name} value={line.name} className="hover:bg-accent">
                  {line.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
