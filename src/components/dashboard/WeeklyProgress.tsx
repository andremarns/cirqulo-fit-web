"use client";

import { useState } from 'react';
import { Calendar, Trophy, Target, Zap, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeeklyData {
  day: string;
  sessions: number;
  completed: boolean;
  streak: number;
}

interface WeeklyProgressProps {
  data: WeeklyData[];
  totalSessions: number;
  weeklyGoal: number;
  onShare: () => void;
}

export function WeeklyProgress({ data, totalSessions, weeklyGoal, onShare }: WeeklyProgressProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  
  const completionRate = Math.round((totalSessions / weeklyGoal) * 100);
  const isGoalAchieved = totalSessions >= weeklyGoal;
  const streakDays = data.filter(d => d.completed).length;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Esta Semana</h3>
        </div>
        <button
          onClick={onShare}
          className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm">Compartilhar</span>
        </button>
      </div>

      {/* Progress Ring */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionRate / 100)}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{totalSessions}</span>
            <span className="text-xs text-muted-foreground">de {weeklyGoal}</span>
          </div>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {data.map((day) => (
          <motion.button
            key={day.day}
            onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
            whileTap={{ scale: 0.95 }}
            className={`
              relative p-2 rounded-lg text-center transition-all duration-200
              ${day.completed 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
              }
              ${selectedDay === day.day ? 'ring-2 ring-primary ring-offset-2' : ''}
            `}
          >
            <div className="text-xs font-medium">{day.day}</div>
            <div className="text-lg font-bold">{day.sessions}</div>
            {day.completed && (
              <div className="absolute -top-1 -right-1">
                <Trophy className="w-3 h-3 text-yellow-400" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Target className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-2xl font-bold text-foreground">{completionRate}%</span>
          </div>
          <p className="text-xs text-muted-foreground">Meta</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-2xl font-bold text-foreground">{streakDays}</span>
          </div>
          <p className="text-xs text-muted-foreground">Dias ativos</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Trophy className="w-4 h-4 text-primary mr-1" />
            <span className="text-2xl font-bold text-foreground">
              {isGoalAchieved ? '🎉' : '🔥'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Status</p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-4 p-3 rounded-lg bg-accent/50 text-center">
        <p className="text-sm text-foreground">
          {isGoalAchieved 
            ? "🎉 Parabéns! Você atingiu sua meta semanal!" 
            : `🔥 Faltam ${weeklyGoal - totalSessions} sessões para atingir sua meta!`
          }
        </p>
      </div>
    </div>
  );
}
