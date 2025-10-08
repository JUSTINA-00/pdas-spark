import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  MessageSquare,
  FileImage,
  Library,
  FileText,
  HelpCircle,
  Layers,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Reminders", icon: Bell, path: "/reminders" },
  { title: "Homework Help", icon: MessageSquare, path: "/homework-help" },
  { title: "Image to PDF", icon: FileImage, path: "/image-to-pdf" },
  { title: "Library", icon: Library, path: "/library" },
  { title: "Summarized PPTs", icon: FileText, path: "/study-tools/summarized-ppts" },
  { title: "Question Bank", icon: HelpCircle, path: "/study-tools/question-bank" },
  { title: "Flashcards", icon: Layers, path: "/study-tools/flashcards" },
  { title: "Study Tracker", icon: TrendingUp, path: "/study-tools/tracker" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          PDAS
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Personal Digital Assistant</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300",
                    "hover:bg-sidebar-accent hover:shadow-soft",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-medium"
                      : "text-sidebar-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-5 h-5", isActive && "animate-fade-in")} />
                    <span className="font-medium">{item.title}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-gradient-soft rounded-xl p-4">
          <p className="text-xs font-medium text-foreground mb-1">💡 Daily Tip</p>
          <p className="text-xs text-muted-foreground">
            Take regular breaks to boost focus and retention!
          </p>
        </div>
      </div>
    </aside>
  );
};
