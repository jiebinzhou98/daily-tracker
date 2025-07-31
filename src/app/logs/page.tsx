"use client";

import { useLocalStorageLogs } from "@/hooks/useLocalStorageLogs";

export default function LogPage(){
    const { logs } = useLocalStorageLogs();

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold">Logs</h1>
            <div className="mt-4 space-y-2">
                {logs.length === 0 ?(
                    <p>No Log yet</p>
                ): (
                    logs
                        .sort((a,b) => b.timestamp - a.timestamp)
                        .map((log, index) => (
                            <div key={index} className="p-2 border rounded">
                                {log.date} - {log.type}
                            </div>
                        ))
                )}
            </div>
        </main>
    )
}