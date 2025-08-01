'use client'

import { useState } from "react"
import { useLocalStorageLogs } from "@/hooks/useLocalStorageLogs"

export default function CalendarView() {
    const {logs} = useLocalStorageLogs()
    const [selectedDate, setSelectedDate] = useState<string>("");

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const logDates = logs.map((log) => log.date);

    const dates = Array.from({length: daysInMonth}, (_, i) => {
        const day = i + 1;
        const dateStr = `${year} - ${String(month + 1). padStart(2, "0")} - ${String(day).padStart(2, "0")}`;
        const hasLog = logDates.includes(dateStr);
        return {day, dateStr, hasLog};
    });

    const selectedLogs = logs.filter((log) => log.date === selectedDate);

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold text-center">
                {today.toLocaleString("default", {month: "long"})} {year}
            </h2>
            <div className="grid grid-cols-7 gap-1 text-center">
                {dates.map (({day, dateStr, hasLog}) => (
                    <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`p-2 rounded text-sm ${hasLog ? "bg-green-200" : "bg-gray-100"}
                        ${selectedDate === dateStr ? "border border-blue-500" : ""}`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {selectedDate && (
                <div className="mt-2 p-2 border rounded bg-gray-50">
                    <p className="font-medium">Logs on {selectedDate}</p>
                    {selectedLogs.length === 0 && <p>No logs</p>}
                    {selectedLogs.map((log) => (
                        <p key={log.timestamp}>
                            - {log.type}
                            {typeof log.note === "string" && log.note && `(${log.note})`}
                            {typeof log.note === "object" && log.note && (
                                `(${log.note.company || ""} - ${log.note.position || ""} - ${log.note.source || ""})`
                            )}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}