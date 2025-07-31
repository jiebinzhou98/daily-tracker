'use client';

import { useState, useEffect } from "react";

export interface LogItem {
    date: string;
    type: "coffee" | "exercise" | "job";
    timestamp: number;
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
        const newLog: LogItem = {
            date: today,
            type,
            timestamp: Date.now(),
        };
        const updatedLogs = [...currentLogs, newLog];
        saveLogs(updatedLogs);
    };

    return { logs, addLog };
}
