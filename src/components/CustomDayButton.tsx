"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isSameDay } from "date-fns";

interface Log {
  date: string;
  type: string;
}

interface CustomDayButtonProps extends React.ComponentProps<"button"> {
  day: { date: Date };
  modifiers: any;
  logs: Log[];
}

export default function CustomDayButton({
  day,
  modifiers,
  logs,
  className,
  onClick,
  ...props
}: CustomDayButtonProps) {
  // 找到该日期下的所有日志
  const dayLogs = logs.filter((log) => isSameDay(new Date(log.date), day.date));

  const hasCoffee = dayLogs.some((l) => l.type === "coffee");
  const hasExercise = dayLogs.some((l) => l.type === "exercise");
  const hasJob = dayLogs.some((l) => l.type === "job");

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      // 关键：必须透传 onClick 和 data 属性
      onClick={onClick}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative flex flex-col items-center justify-center w-full aspect-square text-xs leading-none hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
        modifiers.selected && "bg-primary text-primary-foreground",
        className
      )}
      {...props}
    >
      <span>{day.date.getDate()}</span>
      <div className="flex gap-0.5 mt-0.5">
        {hasCoffee && (
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
        )}
        {hasExercise && (
          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
        )}
        {hasJob && (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
        )}
      </div>
    </Button>
  );
}
