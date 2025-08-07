import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface DaySelectorProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
}

const dayOptions = [
  { key: "DiasUteis", label: "Dias Úteis", icon: Clock },
  { key: "Sabado", label: "Sábado", icon: Calendar },
  { key: "Domingo", label: "Domingo/Feriado", icon: Calendar },
];

export const DaySelector = ({ selectedDay, onDayChange }: DaySelectorProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {dayOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedDay === option.key;
          
          return (
            <Button
              key={option.key}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onDayChange(option.key)}
              className={`
                flex items-center justify-center gap-2 h-12 transition-smooth
                ${isSelected 
                  ? 'bg-primary text-primary-foreground shadow-medium' 
                  : 'hover:bg-accent hover:text-accent-foreground'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{option.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};