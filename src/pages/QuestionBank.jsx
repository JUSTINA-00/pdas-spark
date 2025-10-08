import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search } from "lucide-react";

const QuestionBank = () => {
  const [data, setData] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedMarks, setSelectedMarks] = useState("");

  useEffect(() => {
    // Fetch from public folder
    fetch("/data/questionBank.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch JSON");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading dataset:", err));
  }, []);

  const handleSearch = () => {
    let filtered = data;

    if (selectedCourse) filtered = filtered.filter((q) => q.course === selectedCourse);
    if (selectedModule) filtered = filtered.filter((q) => q.module === selectedModule);
    if (selectedMarks) filtered = filtered.filter((q) => q.markWeightage === selectedMarks);

    // Flatten questions array with id and question
    const questionsList = filtered.flatMap((q) =>
      q.questions.map((ques) => ({
        id: ques.id,
        question: ques.question,
      }))
    );

    setFilteredQuestions(questionsList);
  };

  return (
    <Card className="p-6 rounded-2xl border-border bg-gradient-card">
      <h3 className="text-xl font-semibold mb-4">Question Bank</h3>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          className="border rounded px-3 py-2"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="" disabled>
            Select Course
          </option>
          <option value="Data Science">Data Science</option>
          <option value="Database Management System">Database Management System</option>
          <option value="Web Technology">Web Technology</option>
          <option value="Theory of Computation">Theory of Computation</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
        >
          <option value="" disabled>
            Select Module
          </option>
          {[1, 2, 3, 4, 5, 6].map((m) => (
            <option key={m} value={m.toString()}>
              {m}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={selectedMarks}
          onChange={(e) => setSelectedMarks(e.target.value)}
        >
          <option value="" disabled>
            Select Marks
          </option>
          {[1, 2, 6, 7, 10, 12].map((m) => (
            <option key={m} value={m.toString()}>
              {m}
            </option>
          ))}
        </select>

        <Button className="flex items-center gap-2" onClick={handleSearch}>
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div
              key={q.id + q.question} // ensure unique key
              className="p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" />
                <p className="font-medium">
                  {q.id}. {q.question}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground mt-4">
            No questions found for selected filters.
          </p>
        )}
      </div>
    </Card>
  );
};

export default QuestionBank;
