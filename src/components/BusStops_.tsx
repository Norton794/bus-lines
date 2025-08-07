import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Loader2, AlertCircle } from "lucide-react";
import { useBusStops } from "@/hooks/useBusStops"; // Ajuste o caminho conforme necessário

interface BusStopsProps {
  line: string;
}

export const BusStops = ({ line }: BusStopsProps) => {
  const { busStops, loading, error } = useBusStops(line);

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-soft border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              {line.replace('Linha ', '')}
            </div>
            {line} - Paradas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Carregando paradas...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-soft border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              {line.replace('Linha ', '')}
            </div>
            {line} - Paradas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-destructive">
            <AlertCircle className="h-6 w-6" />
            <span className="ml-2">{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!busStops || busStops.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-soft border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              {line.replace('Linha ', '')}
            </div>
            {line} - Paradas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <MapPin className="h-6 w-6" />
            <span className="ml-2">Nenhuma parada encontrada para esta linha</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            {line.replace('Linha ', '')}
          </div>
          {line} - Paradas
          <Badge variant="secondary" className="ml-auto">
            {busStops.length} paradas
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {busStops.map((stop, index) => (
            <div
              key={stop.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card border-border hover:bg-accent/50 transition-smooth"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {stop.stop_order}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {stop.name}
                  </span>
                  {stop.address && (
                    <span className="text-sm text-muted-foreground">
                      {stop.address}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {stop.fg_condicional && (
                  <Badge variant="outline" className="text-xs">
                    {stop.fg_condicional}
                  </Badge>
                )}
                {stop.latitude && stop.longitude && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    GPS
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
