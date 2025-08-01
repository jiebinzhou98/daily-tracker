"use client";

import { useState } from "react";
import { useLocalStorageLogs } from "@/hooks/useLocalStorageLogs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { isSameDay } from "date-fns";
import CustomDayButton from "@/components/CustomDayButton";

interface DayContentProps {
    date: Date;
    displayMonth: Date;
}

export default function CalendarView() {
    const { logs } = useLocalStorageLogs();
    const [date, setDate] = useState<Date | undefined>(new Date());

    function CustomDayContent({ date }: { date: Date }) {
        const dayLogs = logs.filter((log) => isSameDay(new Date(log.date), date));

        const hasCoffee = dayLogs.some((l) => l.type === "coffee");
        const hasExercise = dayLogs.some((l) => l.type === "exercise");
        const hasJob = dayLogs.some((l) => l.type === "job");

        return (
            <div className="relative flex flex-col items-center">
                <span>{date.getDate()}</span>
                <div className="flex gap-0.5 mt-0.5">
                    {hasCoffee && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>}
                    {hasExercise && <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>}
                    {hasJob && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
                </div>
            </div>
        );
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Card className="cursor-pointer hover:bg-muted transition">
                    <CardHeader>
                        <CardTitle>Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">Tap to view your activity history</p>
                    </CardContent>
                </Card>
            </PopoverTrigger>

            <PopoverContent
                className="w-[90vw] max-w-md p-2 rounded-lg shadow-lg bg-white"
                align="center"
                side="bottom"
                sideOffset={8}
            >
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  components={{
    DayButton: (props) => <CustomDayButton {...props} logs={logs} />,
  }}
/>

            </PopoverContent>
        </Popover>
    );
}
