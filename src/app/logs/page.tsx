"use client";

import { useLocalStorageLogs } from "@/hooks/useLocalStorageLogs";
import { Button } from "@/components/ui/button";

export default function LogPage(){
    const { logs, removeLog } = useLocalStorageLogs();

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold">Logs</h1>
            {logs.length === 0 && <p>No logs yet.</p>}
            {logs.map((log) => (
                <div key={log.timestamp} className="flex justify-between items-center border p-2 rounded">
                    <span>
                        {log.date} - {log.type}
                        {typeof log.note === "string" && log.note && (
                            <span className="text-gray-500 ml-2">({log.note})</span>
                        )}
                        {typeof log.note === "object" && log.note && (
                            <span className="text-gray-500 ml-2">
                                ({log.note.company || "N/A"} - {log.note.position || "N/A"} - {log.note.source || "N/A"})
                            </span>
                        )}
                        </span>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeLog(log.timestamp)}
                    >
                        Delete
                    </Button>
                </div>
            ))}
 
        </main>
    )
}