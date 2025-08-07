import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBusLines } from "./useBusLines";

interface LocationState {
  isLoading: boolean;
  coordinates: { lat: number; lng: number } | null;
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
    error: null,
  });
  const { toast } = useToast();
  const { busLines } = useBusLines();

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      const error = "Geolocalização não é suportada pelo seu navegador";
      setLocation({ isLoading: false, coordinates: null, error });
      toast({
        title: "Erro de Geolocalização",
        description: error,
        variant: "destructive"
      });
      return;
    }

    setLocation(prev => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation({
          isLoading: false,
          coordinates: coords,
          error: null,
        });
        
        toast({
          title: "Localização obtida",
          description: "Buscando linha mais próxima...",
        });
      },
      (error) => {
        let errorMessage = "Erro ao obter localização";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permissão de localização negada";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Localização não disponível";
            break;
          case error.TIMEOUT:
            errorMessage = "Tempo limite excedido";
            break;
        }
        
        setLocation({ isLoading: false, coordinates: null, error: errorMessage });
        toast({
          title: "Erro de Geolocalização",
          description: errorMessage,
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutos
      }
    );
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
      toast({
        title: "Linha sugerida",
        description: `${nearestLine} parece ser a mais próxima da sua localização`,
      });
    }

    return nearestLine;
  }, [location.coordinates, busLines, toast]);

  return {
    location,
    getCurrentLocation,
    findNearestLine,
  };
};