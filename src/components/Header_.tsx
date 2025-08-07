import { Bus } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-soft">
      <div className="container flex h-16 max-w-screen-xl items-center">
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
      </div>
    </header>
  );
};