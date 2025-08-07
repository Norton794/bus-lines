import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Loader2, AlertCircle, Navigation } from "lucide-react";
import { useBusStops } from "@/hooks/useBusStops"; // Ajuste o caminho conforme necessário

interface BusStopsProps {
  line: string;
}

// Função para abrir direções no mapa
const openDirections = (latitude: number, longitude: number, stopName: string) => {
  const destination = `${latitude},${longitude}`;
  
  // Detectar se é iOS ou Android para abrir o app de mapas apropriado
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  let mapUrl: string;
  
  if (isIOS) {
    // Apple Maps no iOS
    mapUrl = `maps://maps.google.com/maps?daddr=${destination}&dirflg=w`;
  } else if (isAndroid) {
    // Google Maps no Android
    mapUrl = `google.navigation:q=${destination}&mode=w`;
  } else {
    // Fallback para web - Google Maps
    mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=walking`;
  }
  
  // Tentar abrir o app nativo, senão abre no browser
  window.open(mapUrl, '_blank');
};

// Função para calcular distância (aproximada) usando fórmula de Haversine
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const BusStops = ({ line }: BusStopsProps) => {
  const { busStops, loading, error } = useBusStops(line);
  
  // Tentar obter localização atual do usuário para calcular distâncias
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.log("Erro ao obter localização:", error);
        }
      );
    }
  }, []);

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
                  {userLocation && stop.latitude && stop.longitude && (
                    <span className="text-xs text-primary font-medium">
                      {(calculateDistance(
                        userLocation.lat, 
                        userLocation.lon, 
                        Number(stop.latitude), 
                        Number(stop.longitude)
                      ) * 1000).toFixed(0)}m de distância
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
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      GPS
                    </Badge>
                    <button
                      onClick={() => openDirections(stop.latitude!, stop.longitude!, stop.name)}
                      className="text-primary hover:text-primary/80 transition-colors"
                      title="Como chegar"
                    >
                      <MapPin className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
