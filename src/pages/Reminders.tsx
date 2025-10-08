import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Calendar, Clock, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { gapi } from "gapi-script";

interface Reminder {
  id: string | number;
  title: string;
  date: string;
  time: string;
  category: string;
}

interface TimetableEntry {
  id?: string;
  day_of_week: string;
  subject: string;
  start_time: string;
  end_time: string;
  room: string;
}

const initialReminders: Reminder[] = [
  { id: 1, title: "Submit Math Assignment", date: "2025-01-15", time: "23:59", category: "Assignment" },
  { id: 2, title: "Physics Lab Session", date: "2025-01-16", time: "10:00", category: "Class" },
  { id: 3, title: "Group Study Meeting", date: "2025-01-17", time: "15:00", category: "Study" },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CLIENT_ID = "<YOUR_CLIENT_ID>";
const API_KEY = "<YOUR_API_KEY>";
const SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly";

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [newReminder, setNewReminder] = useState({ title: "", date: "", time: "", category: "Assignment" });
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [newClass, setNewClass] = useState<TimetableEntry>({
    day_of_week: "Monday",
    subject: "",
    start_time: "",
    end_time: "",
    room: "",
  });
  const { toast } = useToast();

  // Initialize Google API
  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
    }
    gapi.load("client:auth2", start);

    fetchTimetable();
  }, []);

  // Fetch timetable from Supabase
  const fetchTimetable = async () => {
    const { data, error } = await supabase
      .from("timetable")
      .select("*")
      .order("day_of_week", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      toast({ title: "Error loading timetable", description: error.message, variant: "destructive" });
    } else if (data) {
      setTimetable(data);
    }
  };

  // Add manual reminder
  const addReminder = () => {
    if (!newReminder.title || !newReminder.date || !newReminder.time) {
      toast({ title: "Missing information", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const reminder: Reminder = { id: Date.now(), ...newReminder };
    setReminders([...reminders, reminder]);
    setNewReminder({ title: "", date: "", time: "", category: "Assignment" });
    toast({ title: "Reminder added!", description: "Your reminder has been created successfully." });
  };

  const deleteReminder = (id: string | number) => {
    setReminders(reminders.filter((r) => r.id !== id));
    toast({ title: "Reminder deleted", description: "The reminder has been removed." });
  };

  // Add timetable class
  const addClass = async () => {
    if (!newClass.subject || !newClass.start_time || !newClass.end_time) {
      toast({ title: "Missing information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("timetable").insert({
      user_id: user.id,
      day_of_week: newClass.day_of_week,
      subject: newClass.subject,
      start_time: newClass.start_time,
      end_time: newClass.end_time,
      room: newClass.room,
    });

    if (error) {
      toast({ title: "Error adding class", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Class added!", description: "Your timetable has been updated." });
      setNewClass({ day_of_week: "Monday", subject: "", start_time: "", end_time: "", room: "" });
      fetchTimetable();
    }
  };

  const deleteClass = async (id: string) => {
    const { error } = await supabase.from("timetable").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting class", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Class deleted", description: "The class has been removed from your timetable." });
      fetchTimetable();
    }
  };

  // Google Classroom integration
  const signInWithGoogle = async () => {
    await gapi.auth2.getAuthInstance().signIn();
    fetchCoursesAndAssignments();
  };

  const fetchCoursesAndAssignments = async () => {
    await gapi.client.load("classroom", "v1");

    const coursesResponse = await gapi.client.classroom.courses.list();
    const courses = coursesResponse.result.courses || [];

    const assignmentsPromises = courses.map(async (course) => {
      const courseworkResponse = await gapi.client.classroom.courses.courseWork.list({ courseId: course.id });
      return { courseName: course.name, assignments: courseworkResponse.result.courseWork || [] };
    });

    const coursesWithAssignments = await Promise.all(assignmentsPromises);

    const remindersFromClassroom: Reminder[] = coursesWithAssignments.flatMap((course) =>
      course.assignments.map((a) => ({
        id: a.id,
        title: a.title,
        date: `${a.dueDate?.year}-${a.dueDate?.month.toString().padStart(2, "0")}-${a.dueDate?.day.toString().padStart(2, "0")}`,
        time: `${a.dueTime?.hours?.toString().padStart(2, "0") || "00"}:${a.dueTime?.minutes?.toString().padStart(2, "0") || "00"}`,
        category: "Assignment",
      }))
    );

    // Avoid duplicates
    setReminders((prev) => [...prev.filter((r) => typeof r.id === "number"), ...remindersFromClassroom]);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reminders & Timetable</h1>
          <p className="text-muted-foreground">Manage your schedule and never miss important deadlines</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reminders Card */}
          <Card className="lg:col-span-2 p-6 rounded-2xl border-border bg-gradient-card">
            <h2 className="text-xl font-semibold mb-4">Your Reminders</h2>
            <Button onClick={signInWithGoogle} className="w-full rounded-lg mb-4">
              Connect Google Classroom
            </Button>
            <div className="space-y-3">
              {reminders.length === 0 ? (
                <p className="text-center text-muted-foreground mt-4">No reminders available.</p>
              ) : (
                reminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-all">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{reminder.title}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {reminder.date}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {reminder.time}
                        </span>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{reminder.category}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="destructive" className="rounded-lg" onClick={() => deleteReminder(reminder.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Add Reminder Card */}
          <Card className="p-6 rounded-2xl border-border bg-gradient-card">
            <h2 className="text-xl font-semibold mb-4">Add New Reminder</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Submit Assignment" value={newReminder.title} onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })} className="rounded-lg mt-1" />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={newReminder.date} onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })} className="rounded-lg mt-1" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={newReminder.time} onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })} className="rounded-lg mt-1" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select id="category" value={newReminder.category} onChange={(e) => setNewReminder({ ...newReminder, category: e.target.value })} className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background">
                  <option>Assignment</option>
                  <option>Class</option>
                  <option>Study</option>
                  <option>Exam</option>
                  <option>Other</option>
                </select>
              </div>
              <Button onClick={addReminder} className="w-full rounded-lg">
                <Plus className="w-4 h-4 mr-2" /> Add Reminder
              </Button>
            </div>
          </Card>
        </div>

        {/* Timetable Section remains the same as before */}
        {/* ... your existing timetable JSX ... */}
      </div>
    </MainLayout>
  );
};

export default Reminders;
