"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLevelInfo, getLevelProgress } from '@/utils/levelSystem';
import { workoutService, WorkoutStats } from '@/services/workoutService';

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalWorkouts: number;
  totalExercises: number;
  streak: number;
  achievements: Achievement[];
  levelProgress: number;
  levelName: string;
  levelDescription: string;
  levelEmoji: string;
  levelColor: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface GamificationContextType {
  stats: UserStats;
  addXP: (amount: number) => void;
  completeWorkout: () => void;
  completeExercise: () => void;
  updateStreak: () => void;
  checkAchievements: () => void;
  resetStats: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_workout',
    name: 'Primeiro Passo',
    description: 'Saiu do sedentarismo - primeiro treino!',
    icon: '🚀',
    unlocked: false,
  },
  {
    id: 'streak_7',
    name: 'Consistência',
    description: '7 dias seguidos de atividade física',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'level_5',
    name: 'Determinado',
    description: 'Alcance o nível 5 - fôlego melhorando!',
    icon: '⭐',
    unlocked: false,
  },
  {
    id: 'workout_10',
    name: 'Dedicado',
    description: '10 treinos completados - massa magra crescendo!',
    icon: '💪',
    unlocked: false,
  },
  {
    id: 'streak_30',
    name: 'Mestre',
    description: '30 dias de transformação - novo estilo de vida!',
    icon: '👑',
    unlocked: false,
  },
  {
    id: 'cardio_master',
    name: 'Fôlego de Ferro',
    description: 'Complete 5 treinos de cardio',
    icon: '🏃‍♂️',
    unlocked: false,
  },
  {
    id: 'strength_builder',
    name: 'Construtor',
    description: 'Complete 5 treinos de força',
    icon: '🏋️‍♂️',
    unlocked: false,
  },
  {
    id: 'posture_improver',
    name: 'Postura Perfeita',
    description: 'Complete 3 treinos de mobilidade',
    icon: '🧘‍♂️',
    unlocked: false,
  },
];

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<UserStats>(() => {
    const levelInfo = getLevelInfo(1);
    return {
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalWorkouts: 0,
      totalExercises: 0,
      streak: 0,
      achievements: ACHIEVEMENTS.map(ach => ({ ...ach, unlocked: false })),
      levelProgress: 0,
      levelName: levelInfo.name,
      levelDescription: levelInfo.description,
      levelEmoji: levelInfo.emoji,
      levelColor: levelInfo.color,
    };
  });

  useEffect(() => {
    // Carregar stats da API apenas se houver token
    const loadStatsFromAPI = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Se não há token, usar dados locais
        const savedStats = localStorage.getItem('cirqulofit-stats');
        if (savedStats) {
          const parsedStats = JSON.parse(savedStats);
          const levelInfo = getLevelInfo(parsedStats.level || 1);
          setStats({
            ...parsedStats,
            levelProgress: getLevelProgress(parsedStats.totalWorkouts || 0, parsedStats.level || 1),
            levelName: levelInfo.name,
            levelDescription: levelInfo.description,
            levelEmoji: levelInfo.emoji,
            levelColor: levelInfo.color,
          });
        }
        return;
      }

      try {
        const apiStats = await workoutService.getWorkoutStats();
        const levelInfo = getLevelInfo(apiStats.level);
        
        setStats({
          level: apiStats.level,
          xp: apiStats.total_xp,
          xpToNextLevel: 100, // Será calculado baseado no nível
          totalWorkouts: apiStats.total_workouts,
          totalExercises: apiStats.total_exercises,
          streak: apiStats.current_streak,
          achievements: ACHIEVEMENTS.map(ach => ({
            ...ach,
            unlocked: ach.id === 'first_workout' && apiStats.total_workouts > 0
          })),
          levelProgress: apiStats.level_progress,
          levelName: levelInfo.name,
          levelDescription: levelInfo.description,
          levelEmoji: levelInfo.emoji,
          levelColor: levelInfo.color,
        });
      } catch (error) {
        console.error('Erro ao carregar stats da API:', error);
        // Fallback para dados locais
        const savedStats = localStorage.getItem('cirqulofit-stats');
        if (savedStats) {
          const parsedStats = JSON.parse(savedStats);
          const levelInfo = getLevelInfo(parsedStats.level || 1);
          setStats({
            ...parsedStats,
            levelProgress: getLevelProgress(parsedStats.totalWorkouts || 0, parsedStats.level || 1),
            levelName: levelInfo.name,
            levelDescription: levelInfo.description,
            levelEmoji: levelInfo.emoji,
            levelColor: levelInfo.color,
          });
        }
      }
    };

    loadStatsFromAPI();
  }, []);

  useEffect(() => {
    // Salvar stats no localStorage
    localStorage.setItem('cirqulofit-stats', JSON.stringify(stats));
  }, [stats]);

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 100) + 1;
  };

  const calculateXPToNext = (level: number) => {
    return level * 100;
  };

  const addXP = (amount: number) => {
    setStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const xpToNext = calculateXPToNext(newLevel) - newXP;
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: xpToNext,
      };
    });
  };

  const completeWorkout = () => {
    setStats(prev => {
      const newTotalWorkouts = prev.totalWorkouts + 1;
      const newLevel = Math.floor(newTotalWorkouts / 5) + 1; // Evolui a cada 5 treinos
      const levelInfo = getLevelInfo(newLevel);
      
      return {
        ...prev,
        totalWorkouts: newTotalWorkouts,
        level: newLevel,
        levelProgress: getLevelProgress(newTotalWorkouts, newLevel),
        levelName: levelInfo.name,
        levelDescription: levelInfo.description,
        levelEmoji: levelInfo.emoji,
        levelColor: levelInfo.color,
      };
    });
    // XP é adicionado na página de sessão de treino, não aqui
    checkAchievements();
  };

  const completeExercise = () => {
    setStats(prev => ({
      ...prev,
      totalExercises: prev.totalExercises + 1,
    }));
    addXP(10);
  };

  const updateStreak = () => {
    setStats(prev => ({
      ...prev,
      streak: prev.streak + 1,
    }));
    checkAchievements();
  };

  const checkAchievements = () => {
    setStats(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;

        switch (achievement.id) {
          case 'first_workout':
            shouldUnlock = prev.totalWorkouts >= 1;
            break;
          case 'streak_7':
            shouldUnlock = prev.streak >= 7;
            break;
          case 'level_5':
            shouldUnlock = prev.level >= 5;
            break;
          case 'workout_10':
            shouldUnlock = prev.totalWorkouts >= 10;
            break;
          case 'streak_30':
            shouldUnlock = prev.streak >= 30;
            break;
        }

        if (shouldUnlock) {
          return {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date(),
          };
        }

        return achievement;
      });

      return {
        ...prev,
        achievements: updatedAchievements,
      };
    });
  };

  const resetStats = () => {
    const levelInfo = getLevelInfo(1);
    setStats({
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalWorkouts: 0,
      totalExercises: 0,
      streak: 0,
      achievements: ACHIEVEMENTS,
      levelProgress: 0,
      levelName: levelInfo.name,
      levelDescription: levelInfo.description,
      levelEmoji: levelInfo.emoji,
      levelColor: levelInfo.color,
    });
    // Limpar localStorage
    localStorage.removeItem('cirqulofit-stats');
  };

  return (
    <GamificationContext.Provider value={{
      stats,
      addXP,
      completeWorkout,
      completeExercise,
      updateStreak,
      checkAchievements,
      resetStats,
    }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
