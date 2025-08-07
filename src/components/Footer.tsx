import { Info } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card/50 mt-auto">
      <div className="container max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>Baseado nos horários divulgados em 02/06/2025</span>
        </div>
      </div>
    </footer>
  );
};