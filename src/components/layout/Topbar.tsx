import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Topbar = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-background border-b border-border flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="pl-10 rounded-xl border-border focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground hidden lg:block">{currentDate}</p>
        <Avatar className="w-9 h-9 border-2 border-primary">
          <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
            J
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
