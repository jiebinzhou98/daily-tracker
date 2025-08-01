'use client';

import { useState, useEffect } from "react";

export interface LogItem {
    date: string;
    type: "coffee" | "exercise" | "job";
    timestamp: number;
    note?: string | {
        company?: string;
        position?: string;
        source?: string;
    };
}

const STORAGE_KEY = "personal-tracker-logs";

export function useLocalStorageLogs() {
    const [logs, setLogs] = useState<LogItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setLogs(JSON.parse(stored));
        }
    }, []);

    const saveLogs = (newLogs: LogItem[]) => {
        setLogs(newLogs);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
    }

    const addLog = (type: "coffee" | "exercise" | "job") => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const currentLogs: LogItem[] = stored ? JSON.parse(stored) : [];
        const today = new Date().toISOString().split("T")[0];

        let note: LogItem["note"] = "";

        if(type === "job"){
            const company = prompt("Enter company name");
            if(company === null) return;
            const position = prompt("Enter position");
            if(position === null) return;
            const source = prompt("Enter source (e.g., LinkedIn, Company Website)");
            if(source === null) return;
            
            note = { company, position, source };
        }
        const newLog: LogItem = {
            date: today,
            type,
            timestamp: Date.now(),
            note
        };
        const updatedLogs = [...currentLogs, newLog];
        saveLogs(updatedLogs);
    };

    const removeLog = (timestamp: number) => {
        const updatedLogs = logs.filter((log) => log.timestamp !== timestamp);
        saveLogs(updatedLogs);
    }

    return { logs, addLog, removeLog };
}
