import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

interface ScheduleCardProps {
  line: string;
  schedule: string[] | Record<string, string>;
}

const getDestinationColor = (destination: string) => {
  const dest = destination.toLowerCase();
  if (dest.includes('fatec')) return 'bg-fatec text-fatec-foreground';
  if (dest.includes('etec')) return 'bg-etec text-etec-foreground';
  if (dest.includes('estação')) return 'bg-estacao text-estacao-foreground';
  if (dest.includes('cais')) return 'bg-cais text-cais-foreground';
  if (dest.includes('bellagio')) return 'bg-bellagio text-bellagio-foreground';
  return 'bg-muted text-muted-foreground';
};

const formatTime = (time: string) => {
  const now = new Date();
  const [hours, minutes] = time.split(':').map(Number);
  const timeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  
  const isPast = timeDate < now;
  const isUpcoming = !isPast && timeDate.getTime() - now.getTime() < 3600000; // próxima 1 hora
  
  return { time, isPast, isUpcoming };
};

export const ScheduleCard = ({ line, schedule }: ScheduleCardProps) => {
  const isArraySchedule = Array.isArray(schedule);
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            {line.replace('Linha ', '')}
          </div>
          {line}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isArraySchedule ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {schedule.map((time, index) => {
              const { isPast, isUpcoming } = formatTime(time);
              return (
                <div
                  key={index}
                  className={`
                    flex items-center justify-center p-2 rounded-lg border text-sm font-medium
                    transition-smooth
                    ${isPast 
                      ? 'bg-muted/50 text-muted-foreground border-muted' 
                      : isUpcoming 
                        ? 'bg-primary/10 text-primary border-primary/30 ring-1 ring-primary/20' 
                        : 'bg-card text-foreground border-border hover:bg-accent'
                    }
                  `}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {time}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(schedule).map(([time, destination]) => {
              const { isPast, isUpcoming } = formatTime(time);
              return (
                <div
                  key={time}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border
                    transition-smooth
                    ${isPast 
                      ? 'bg-muted/50 border-muted' 
                      : isUpcoming 
                        ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20' 
                        : 'bg-card border-border hover:bg-accent/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${isPast ? 'text-muted-foreground' : 'text-primary'}`} />
                    <span className={`font-medium ${isPast ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {time}
                    </span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${getDestinationColor(destination)} flex items-center gap-1`}
                  >
                    <MapPin className="h-3 w-3" />
                    {destination}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};