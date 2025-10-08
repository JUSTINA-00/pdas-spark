import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, X, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageToPdf = () => {
  const [files, setFiles] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileSelect = () => {
    // Simulate file selection
    const mockFiles = ["image1.jpg", "image2.png", "image3.jpg"];
    setFiles(mockFiles);
    toast({
      title: "Images selected",
      description: `${mockFiles.length} images ready to convert`,
    });
  };

  const convertToPdf = () => {
    toast({
      title: "Converting to PDF",
      description: "This is a placeholder. Implement actual conversion logic.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Image to PDF Converter</h1>
          <p className="text-muted-foreground">Convert multiple images into a single PDF document</p>
        </div>

        <Card className="p-8 rounded-2xl border-border bg-gradient-card">
          <div
            className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer"
            onClick={handleFileSelect}
          >
            <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop images here or click to upload</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports JPG, PNG, WEBP formats
            </p>
            <Button className="rounded-lg">
              Select Images
            </Button>
          </div>
        </Card>

        {files.length > 0 && (
          <Card className="p-6 rounded-2xl border-border bg-gradient-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Selected Images ({files.length})</h3>
              <Button variant="outline" size="sm" onClick={() => setFiles([])} className="rounded-lg">
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-secondary rounded-xl flex items-center justify-center">
                    <FileImage className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-center mt-2 truncate">{file}</p>
                  <button
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <Button onClick={convertToPdf} className="w-full rounded-xl" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Convert to PDF
            </Button>
          </Card>
        )}

        <Card className="p-6 rounded-2xl border-border bg-gradient-soft">
          <h3 className="font-semibold mb-2">💡 Tips for best results:</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Use high-quality images for better PDF output</li>
            <li>Images will be arranged in the order you select them</li>
            <li>The PDF will maintain the original image quality</li>
          </ul>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ImageToPdf;
