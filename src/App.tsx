import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reminders from "./pages/Reminders";
import HomeworkHelp from "./pages/HomeworkHelp";
import ImageToPdf from "./pages/ImageToPdf";
import Library from "./pages/Library";
import StudyTools from "./pages/StudyTools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/homework-help" element={<HomeworkHelp />} />
          <Route path="/image-to-pdf" element={<ImageToPdf />} />
          <Route path="/library" element={<Library />} />
          <Route path="/study-tools/:tool" element={<StudyTools />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
