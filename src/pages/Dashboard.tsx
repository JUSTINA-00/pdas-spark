import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const upcomingClasses = [
  { subject: "Mathematics", time: "9:00 AM", room: "Room 301" },
  { subject: "Physics", time: "11:00 AM", room: "Lab 2" },
  { subject: "English Literature", time: "2:00 PM", room: "Room 105" },
];

const upcomingAssignments = [
  { title: "Calculus Problem Set", due: "Tomorrow", priority: "high" },
  { title: "History Essay", due: "In 3 days", priority: "medium" },
  { title: "Chemistry Lab Report", due: "Next week", priority: "low" },
];

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setUserEmail(user.email.split("@")[0]);
      }
    });
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userEmail || "Student"} 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your studies today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Classes Today"
            value={3}
            icon={BookOpen}
            trend="+2 more this week"
          />
          <StatCard
            title="Pending Assignments"
            value={5}
            icon={AlertCircle}
            iconColor="bg-accent/10"
          />
          <StatCard
            title="Study Hours (Week)"
            value="24.5h"
            icon={Clock}
            trend="+12% from last week"
          />
          <StatCard
            title="Completed Tasks"
            value={18}
            icon={CheckCircle}
            iconColor="bg-primary/10"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border-border bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Today's Classes</h3>
            <div className="space-y-3">
              {upcomingClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">{cls.room}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{cls.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-border bg-gradient-card">
            <h3 className="text-lg font-semibold mb-4">Upcoming Assignments</h3>
            <div className="space-y-3">
              {upcomingAssignments.map((assignment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">{assignment.due}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      assignment.priority === "high"
                        ? "bg-destructive/10 text-destructive"
                        : assignment.priority === "medium"
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {assignment.priority}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6 rounded-2xl border-border bg-gradient-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Weekly Study Progress</h3>
            <span className="text-sm text-muted-foreground">Target: 30 hours</span>
          </div>
          <Progress value={82} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            24.5 hours completed - You're on track! 🎯
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border-border bg-gradient-soft">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🌟</div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Wellness Reminder</h3>
              <p className="text-muted-foreground">
                You've been studying for 2 hours straight. Time for a 15-minute break! 
                Stretch, hydrate, and rest your eyes.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
