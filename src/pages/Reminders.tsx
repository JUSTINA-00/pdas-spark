import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Calendar, Clock, Edit2, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Reminder {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
}

const initialReminders: Reminder[] = [
  { id: 1, title: "Submit Math Assignment", date: "2025-01-15", time: "23:59", category: "Assignment" },
  { id: 2, title: "Physics Lab Session", date: "2025-01-16", time: "10:00", category: "Class" },
  { id: 3, title: "Group Study Meeting", date: "2025-01-17", time: "15:00", category: "Study" },
];

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [newReminder, setNewReminder] = useState({ title: "", date: "", time: "", category: "Assignment" });
  const { toast } = useToast();

  const addReminder = () => {
    if (!newReminder.title || !newReminder.date || !newReminder.time) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const reminder: Reminder = {
      id: Date.now(),
      ...newReminder,
    };

    setReminders([...reminders, reminder]);
    setNewReminder({ title: "", date: "", time: "", category: "Assignment" });
    toast({
      title: "Reminder added!",
      description: "Your reminder has been created successfully.",
    });
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter((r) => r.id !== id));
    toast({
      title: "Reminder deleted",
      description: "The reminder has been removed.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reminders & Timetable</h1>
          <p className="text-muted-foreground">Manage your schedule and never miss important deadlines</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 rounded-2xl border-border bg-gradient-card">
            <h2 className="text-xl font-semibold mb-4">Your Reminders</h2>
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{reminder.title}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(reminder.date).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {reminder.time}
                      </span>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {reminder.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-lg"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-border bg-gradient-card">
            <h2 className="text-xl font-semibold mb-4">Add New Reminder</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Submit Assignment"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="rounded-lg mt-1"
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newReminder.date}
                  onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                  className="rounded-lg mt-1"
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="rounded-lg mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={newReminder.category}
                  onChange={(e) => setNewReminder({ ...newReminder, category: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background"
                >
                  <option>Assignment</option>
                  <option>Class</option>
                  <option>Study</option>
                  <option>Exam</option>
                  <option>Other</option>
                </select>
              </div>
              <Button onClick={addReminder} className="w-full rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Reminder
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6 rounded-2xl border-border bg-gradient-soft">
          <h2 className="text-xl font-semibold mb-4">Upload Timetable</h2>
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-border rounded-xl hover:border-primary transition-colors">
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">Upload your class timetable (PDF, Excel, or Image)</p>
            <Button variant="outline" className="rounded-lg">
              Choose File
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Reminders;
