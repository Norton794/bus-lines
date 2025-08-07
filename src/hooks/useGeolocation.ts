import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBusLines } from "./useBusLines";

interface LocationState {
  isLoading: boolean;
  coordinates: { lat: number; lng: number } | null;
  accuracy: number | null;
  error: string | null;
}

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const useGeolocation = () => {
  const [location, setLocation] = useState<LocationState>({
    isLoading: false,
    coordinates: null,
    accuracy: null,
    error: null,
  });
  const { toast } = useToast();
  const { busLines } = useBusLines();

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      const error = "Geolocalização não é suportada pelo seu navegador";
      setLocation({ isLoading: false, coordinates: null, accuracy: null, error });
      toast({
        title: "Erro de Geolocalização",
        description: error,
        variant: "destructive"
      });
      return;
    }

    setLocation(prev => ({ ...prev, isLoading: true, error: null }));
    
    // Opções otimizadas para maior precisão
    const options: PositionOptions = {
      enableHighAccuracy: true,  // Força GPS em vez de WiFi/IP
      timeout: 20000,           // 20 segundos para GPS se estabilizar
      maximumAge: 0             // Sempre pega nova localização, não usa cache
    };

    let attempts = 0;
    const maxAttempts = 3;

    const tryGetLocation = () => {
      attempts++;
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          const accuracy = position.coords.accuracy;
          
          console.log(`📍 Tentativa ${attempts}:`, {
            coords,
            accuracy: `${accuracy.toFixed(0)}m`,
            timestamp: new Date().toLocaleTimeString()
          });

          // Se a precisão ainda está muito baixa e temos tentativas restantes
          if (accuracy > 1000 && attempts < maxAttempts) {
            console.log('⚠️ Precisão baixa, tentando novamente...');
            toast({
              title: "Melhorando precisão...",
              description: `Tentativa ${attempts + 1} de ${maxAttempts}`,
            });
            setTimeout(tryGetLocation, 3000);
            return;
          }

          setLocation({
            isLoading: false,
            coordinates: coords,
            accuracy,
            error: null,
          });

          const precisionText = accuracy < 100 ? 'alta' : 
                               accuracy < 500 ? 'média' : 'baixa';
                               
          toast({
            title: "Localização obtida",
            description: `Precisão ${precisionText} (±${accuracy.toFixed(0)}m). Buscando linha mais próxima...`,
          });
        },
        (error) => {
          console.error(`❌ Erro na tentativa ${attempts}:`, error);
          
          let errorMessage = "Erro ao obter localização";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permissão de localização negada. Permita o acesso nas configurações do navegador.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Localização não disponível. Tente sair de ambientes fechados.";
              break;
            case error.TIMEOUT:
              errorMessage = `Tempo limite excedido (tentativa ${attempts}/${maxAttempts})`;
              break;
          }

          // Se ainda temos tentativas e não foi negação de permissão
          if (attempts < maxAttempts && error.code !== error.PERMISSION_DENIED) {
            console.log('🔄 Tentando novamente...');
            toast({
              title: "Tentando novamente...",
              description: `Tentativa ${attempts + 1} de ${maxAttempts}`,
            });
            setTimeout(tryGetLocation, 2000);
            return;
          }

          setLocation({ isLoading: false, coordinates: null, accuracy: null, error: errorMessage });
          toast({
            title: "Erro de Geolocalização",
            description: errorMessage,
            variant: "destructive"
          });
        },
        options
      );
    };

    // Inicia a primeira tentativa
    tryGetLocation();
  }, [toast]);

  const findNearestLine = useCallback((availableLines: string[]) => {
    if (!location.coordinates || busLines.length === 0) return null;

    let nearestLine = null;
    let shortestDistance = Infinity;

    availableLines.forEach(lineName => {
      const busLine = busLines.find(line => line.name === lineName);
      if (busLine) {
        const distance = calculateDistance(
          location.coordinates!.lat,
          location.coordinates!.lng,
          Number(busLine.latitude),
          Number(busLine.longitude)
        );
        
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestLine = lineName;
        }
      }
    });

    if (nearestLine) {
      const distanceText = shortestDistance < 0.5 ? 
        `${(shortestDistance * 1000).toFixed(0)}m` : 
        `${shortestDistance.toFixed(1)}km`;
        
      toast({
        title: "Linha sugerida",
        description: `${nearestLine} está a ${distanceText} da sua localização`,
      });
      
      // Log para debug
      console.log('🎯 Linha mais próxima:', {
        linha: nearestLine,
        distancia: distanceText,
        precisaoGPS: location.accuracy ? `±${location.accuracy.toFixed(0)}m` : 'N/A'
      });
    }

    return nearestLine;
  }, [location.coordinates, location.accuracy, busLines, toast]);

  return {
    location,
    getCurrentLocation,
    findNearestLine,
  };
};
