"use client";

import { useState } from 'react';
import { Calendar, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DayData {
  day: string;
  date: number;
  completed: boolean;
  sessions: number;
  isToday: boolean;
}

interface WeeklyCalendarProps {
  data: DayData[];
  onDayClick?: (day: string) => void;
}

export function WeeklyCalendar({ data, onDayClick }: WeeklyCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleDayClick = (day: string) => {
    setSelectedDay(selectedDay === day ? null : day);
    onDayClick?.(day);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Esta Semana</h3>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {data.map((day, index) => (
          <motion.button
            key={day.day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDayClick(day.day)}
            className={`
              relative p-3 rounded-lg text-center transition-all duration-200
              ${day.completed 
                ? 'bg-primary text-primary-foreground' 
                : day.isToday
                ? 'bg-accent text-accent-foreground ring-2 ring-primary/50'
                : 'bg-muted hover:bg-muted/80'
              }
              ${selectedDay === day.day ? 'ring-2 ring-primary ring-offset-2' : ''}
            `}
          >
            <div className="text-xs font-medium mb-1">{day.day}</div>
            <div className="text-lg font-bold">{day.date}</div>
            
            {day.completed && (
              <div className="absolute -top-1 -right-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
              </div>
            )}
            
            {day.sessions > 0 && (
              <div className="absolute -bottom-1 -right-1">
                <div className="w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {day.sessions}
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Concluído</span>
        </div>
        <div className="flex items-center space-x-1">
          <Circle className="w-3 h-3 text-primary" />
          <span>Hoje</span>
        </div>
        <div className="flex items-center space-x-1">
          <Circle className="w-3 h-3 text-muted-foreground" />
          <span>Pendente</span>
        </div>
      </div>
    </div>
  );
}
