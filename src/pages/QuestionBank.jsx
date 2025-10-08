import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, HelpCircle } from "lucide-react";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");

  useEffect(() => {
    fetch("/data/questionBankData.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Error loading dataset:", err));
  }, []);

  const handleFilter = (course) => {
    setSelectedCourse(course);
    if (course === "All") {
      setFiltered(questions);
    } else {
      setFiltered(questions.filter((q) => q.course === course));
    }
  };

  const uniqueCourses = ["All", ...new Set(questions.map((q) => q.course))];

  return (
    <Card className="p-6 rounded-2xl border-border bg-gradient-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Question Bank</h3>
        <Button size="sm" className="rounded-lg">
          <Upload className="w-4 h-4 mr-2" />
          Add Questions
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {uniqueCourses.map((course) => (
          <Button
            key={course}
            size="sm"
            variant={selectedCourse === course ? "default" : "outline"}
            onClick={() => handleFilter(course)}
          >
            {course}
          </Button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filtered.map((q, index) => (
          <div
            key={index}
            className="p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <p className="font-medium">{q.question}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{q.module}</span>
                  <span>•</span>
                  <span>{q.marks} marks</span>
                  <span>•</span>
                  <span
                    className={`px-2 py-0.5 rounded ${
                      q.difficulty === "Easy"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QuestionBank;
