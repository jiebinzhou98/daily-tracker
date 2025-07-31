'use client';

import { useState,useEffect } from "react";

export interface LogItem {
    date: string;
    type: "coffee" | "exercise" | "job";
    timestamp: number;
}

export function useLocalStorageLogs() {
    const [logs, setLogs] = useState<LogItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("personal-tracker-logs");
        if(stored){
            setLogs(JSON.parse(stored));
        }
    }, []);

    const saveLogs = (newLogs: LogItem[]) => {
        setLogs(newLogs);
        localStorage.setItem("personal-tracker-logs", JSON.stringify(newLogs));
    }

    const addLog = (type: "coffee" | "exercise" | "job") => {
        const today = new Date().toISOString().split("T")[0];
        const newLog: LogItem = {
            date: today,
            type,
            timestamp: Date.now(),
        };
        saveLogs([...logs, newLog]);
    };
    return {logs, addLog};
}