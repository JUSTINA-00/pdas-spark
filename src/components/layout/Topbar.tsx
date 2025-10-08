import { Search, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Topbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      navigate("/auth");
    }
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="w-9 h-9 border-2 border-primary">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
