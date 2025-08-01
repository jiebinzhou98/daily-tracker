"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorageLogs } from "@/hooks/useLocalStorageLogs";
import CalendarView from "@/components/CalendarView";

export default function Home() {
  const { logs, addLog } = useLocalStorageLogs();

  const today = new Date().toISOString().split("T")[0];
  const todayLogs = logs.filter((log) => log.date === today);

  const coffeeCount = todayLogs.filter((l) => l.type === "coffee").length;
  const exerciseCount = todayLogs.filter((l) => l.type === "exercise").length;
  const jobCount = todayLogs.filter((l) => l.type === "job").length;

  const summaryData = [
    { type: "coffee", label: "Coffees", count: coffeeCount },
    { type: "exercise", label: "Exercise", count: exerciseCount },
    { type: "job", label: "Job Applications", count: jobCount },
  ];

  return (
    <main className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Personal Tracker</h1>

      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {
            if (window.confirm("You sure you had a second cup?")) {
              addLog("coffee");
            }
          }}
        >
          Log Coffee
        </Button>
        <Button
          onClick={() => {
            if (window.confirm("You sure to record this?")) {
              addLog("exercise");
            }
          }}
        >
          Log Exercise
        </Button>
        <Button onClick={() => addLog("job")}>Log Job Application</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {summaryData.map((item) => (
            <p key={item.type}>
              {item.label}: {item.count}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <CalendarView />
        </CardContent>
      </Card>
    </main>
  );
}
