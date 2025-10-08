import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Search, FileText, Star, Folder } from "lucide-react";

const folders = [
  { name: "Mathematics", count: 12, color: "bg-primary/10 text-primary" },
  { name: "Physics", count: 8, color: "bg-accent/10 text-accent" },
  { name: "Chemistry", count: 15, color: "bg-destructive/10 text-destructive" },
  { name: "English", count: 6, color: "bg-primary/10 text-primary" },
];

const recentFiles = [
  { title: "Advanced Calculus Notes.pdf", folder: "Mathematics", date: "Jan 12, 2025", starred: true },
  { title: "Newton's Laws Summary.docx", folder: "Physics", date: "Jan 10, 2025", starred: false },
  { title: "Organic Chemistry.pdf", folder: "Chemistry", date: "Jan 8, 2025", starred: true },
  { title: "Shakespeare Analysis.pdf", folder: "English", date: "Jan 5, 2025", starred: false },
];

const Library = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Library</h1>
            <p className="text-muted-foreground">Organize and access all your study materials</p>
          </div>
          <Button className="rounded-xl">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search your library..."
            className="pl-10 rounded-xl h-12"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder, index) => (
              <Card
                key={index}
                className="p-6 rounded-2xl border-border bg-gradient-card hover:shadow-hover transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${folder.color} flex items-center justify-center`}>
                    <Folder className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-muted-foreground">{folder.count} files</span>
                </div>
                <h3 className="font-semibold text-lg">{folder.name}</h3>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-6 rounded-2xl border-border bg-gradient-card">
          <h2 className="text-xl font-semibold mb-4">Recent Files</h2>
          <div className="space-y-2">
            {recentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{file.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{file.folder}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{file.date}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Star className={`w-5 h-5 ${file.starred ? "fill-accent text-accent" : ""}`} />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Library;
