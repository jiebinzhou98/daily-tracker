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
                    <span>{log.date} - {log.type}</span>
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