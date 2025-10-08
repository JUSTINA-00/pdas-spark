import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Layers, Play, Pause, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import QuestionBank from "@/pages/QuestionBank"; // modular QuestionBank

const flashcards = [
  { front: "What is the speed of light?", back: "299,792,458 m/s" },
  { front: "Capital of France?", back: "Paris" },
  { front: "Pythagorean theorem?", back: "a² + b² = c²" },
];

const StudyTools = () => {
  const [isStudying, setIsStudying] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const { toast } = useToast();

  const startStudySession = () => {
    setIsStudying(true);
    toast({
      title: "Study session started!",
      description: "Which subject are you studying?",
    });
  };

  const endStudySession = () => {
    setIsStudying(false);
    toast({
      title: "Great work!",
      description: "Study session ended. What topics did you cover?",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Study Tools Hub</h1>
          <p className="text-muted-foreground">Enhance your learning with AI-powered study tools</p>
        </div>

        <Tabs defaultValue="summarize" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summarize">Summarized PPTs</TabsTrigger>
            <TabsTrigger value="questions">Question Bank</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="tracker">Study Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="summarize" className="mt-6">
            <Card className="p-8 rounded-2xl border-border bg-gradient-card">
              <div className="text-center mb-6">
                <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI PPT Summarizer</h3>
                <p className="text-muted-foreground mb-6">
                  Upload your presentation and get an AI-generated summary
                </p>
                <div className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full inline-block mb-4">
                  Connect to Gemini API
                </div>
              </div>
              <Button className="w-full rounded-xl" size="lg">
                <Upload className="w-5 h-5 mr-2" />
                Upload Presentation
              </Button>
            </Card>
          </TabsContent>

          {/* Render modular QuestionBank */}
          <TabsContent value="questions" className="mt-6">
            <QuestionBank />
          </TabsContent>

          <TabsContent value="flashcards" className="mt-6">
            <Card className="p-6 rounded-2xl border-border bg-gradient-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Flashcards</h3>
                <Button size="sm" className="rounded-lg">
                  <Layers className="w-4 h-4 mr-2" />
                  Generate from Notes
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flashcards.map((card, index) => (
                  <div
                    key={index}
                    className="group perspective-1000 h-48 cursor-pointer"
                  >
                    <div className="relative h-full transition-transform duration-500 transform-style-3d hover:rotate-y-180">
                      <div className="absolute inset-0 bg-gradient-primary rounded-xl p-6 flex items-center justify-center backface-hidden">
                        <p className="text-center font-medium text-primary-foreground">
                          {card.front}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-soft rounded-xl p-6 flex items-center justify-center backface-hidden rotate-y-180">
                        <p className="text-center font-medium">{card.back}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tracker" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-8 rounded-2xl border-border bg-gradient-card text-center">
                <Clock className="w-20 h-20 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">
                  {Math.floor(studyTime / 60)}h {studyTime % 60}m
                </h3>
                <p className="text-muted-foreground mb-6">Today's Study Time</p>

                <div className="flex gap-4 justify-center">
                  {!isStudying ? (
                    <Button
                      size="lg"
                      onClick={startStudySession}
                      className="rounded-xl px-8"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Session
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant="destructive"
                      onClick={endStudySession}
                      className="rounded-xl px-8"
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      End Session
                    </Button>
                  )}
                </div>
              </Card>

              <Card className="p-6 rounded-2xl border-border bg-gradient-soft">
                <h3 className="text-lg font-semibold mb-4">This Week</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Hours</p>
                    <p className="text-2xl font-bold">24.5h</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Sessions</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg. per Day</p>
                    <p className="text-2xl font-bold">3.5h</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default StudyTools;
