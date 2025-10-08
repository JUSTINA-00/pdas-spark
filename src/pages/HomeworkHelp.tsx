import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, FileText, Upload, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sampleDocuments = [
  { title: "Calculus Notes.pdf", date: "Jan 10", type: "PDF", starred: true },
  { title: "Physics Formulas.docx", date: "Jan 8", type: "DOC", starred: false },
  { title: "History Summary.pdf", date: "Jan 5", type: "PDF", starred: true },
  { title: "Chemistry Lab 3.pdf", date: "Jan 3", type: "PDF", starred: false },
];

const HomeworkHelp = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI homework assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm a placeholder for Gemini AI. To enable this feature, connect to Google's Gemini API." },
      ]);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Homework Help & Library</h1>
          <p className="text-muted-foreground">Get AI assistance and access your study materials</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border-border bg-gradient-card flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">AI Chatbot</h2>
              <div className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                Connect to Gemini API
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about your homework..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="rounded-xl"
              />
              <Button onClick={sendMessage} className="rounded-xl">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-border bg-gradient-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Student Library</h2>
              <Button size="sm" className="rounded-lg">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>

            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="documents">Docs</TabsTrigger>
                <TabsTrigger value="ppts">PPTs</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="favorites">★</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="space-y-2">
                {sampleDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-muted rounded">
                        {doc.type}
                      </span>
                      <Button size="sm" variant="ghost">
                        <Star
                          className={`w-4 h-4 ${
                            doc.starred ? "fill-accent text-accent" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="ppts">
                <div className="text-center py-12 text-muted-foreground">
                  No presentations uploaded yet
                </div>
              </TabsContent>

              <TabsContent value="notes">
                <div className="text-center py-12 text-muted-foreground">
                  No scanned notes yet
                </div>
              </TabsContent>

              <TabsContent value="favorites">
                <div className="space-y-2">
                  {sampleDocuments
                    .filter((doc) => doc.starred)
                    .map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <p className="font-medium text-sm">{doc.title}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeworkHelp;
