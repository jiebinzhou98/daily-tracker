import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Personal Tracker</h1>

      <div className="flex flex-col gap-2">
      <Button variant="outline" className="justify-start">Log Coffee</Button>
      <Button variant="outline" className="justify-start">Log Exercise</Button>
      <Button variant="outline" className="justify-start">Log Job Application</Button>
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
  )
}