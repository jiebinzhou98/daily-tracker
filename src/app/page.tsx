"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorageLogs } from "@/hooks/useLocalStorageLogs";

export default function Home() {
  const { addLog } = useLocalStorageLogs();

  return (
    <main className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Personal Tracker</h1>

      <div className="flex flex-col gap-2">
        <Button onClick={() => addLog("coffee")}>Log Coffee</Button>
        <Button onClick={() => addLog("exercise")}>Log Exercise</Button>
        <Button onClick={() => addLog("job")}>Log Job Application</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Coffees</p>
          <p>Exercise</p>
          <p>Job Application</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Calendar</p>
        </CardContent>
      </Card>
    </main>
  );
}
