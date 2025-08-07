import { Bus, Coffee, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-soft">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
            <Bus className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Horários de Ônibus
            </h1>
            <p className="text-sm text-muted-foreground">Lins - SP</p>
          </div>
        </div>
        
        {/* Link de apoio */}
     <Link
  to="/cafezim"
  className="group relative flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-sm hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
>
  {/* Ícone de café */}
  ☕
  {/* Texto responsivo */}
  <span className="hidden sm:block">Me pague um café</span>
  <span className="sm:hidden">Café</span>
  {/* Brilho sutil */}
  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
</Link>
      </div>
    </header>
  );
};
