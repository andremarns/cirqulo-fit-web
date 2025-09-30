"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Edit, Trash2, Clock, Target, Trophy, Lock } from 'lucide-react';
import { Header } from '@/components/Header';
import { PageTransition } from '@/components/animations/PageTransition';
import { motion } from 'framer-motion';
import { useGamification } from '@/contexts/GamificationContext';
import { getAllAvailableWorkouts } from '@/utils/workoutEvolution';
import { workoutService, Workout } from '@/services/workoutService';

interface WorkoutDisplay extends Workout {
  exercises: number;
  xp: number;
  lastUsed: string;
  completed: boolean;
  unlocked: boolean;
}

export default function MyWorkoutsPage() {
  const router = useRouter();
  const { stats } = useGamification();
  const [workouts, setWorkouts] = useState<WorkoutDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        // Buscar treinos da API
        const apiWorkouts = await workoutService.getWorkouts(stats.level);
        
        // Buscar treinos evolutivos locais
        const availableWorkouts = getAllAvailableWorkouts(stats.level);
        
        // Combinar treinos da API com treinos evolutivos
        const allWorkouts: WorkoutDisplay[] = [
          ...apiWorkouts.map(workout => ({
            ...workout,
            exercises: workout.exercises_count,
            xp: workout.xp_reward,
            lastUsed: 'Nunca',
            completed: false,
            unlocked: workout.level <= stats.level,
          })),
          ...availableWorkouts.map(workout => ({
            id: workout.id,
            name: workout.name,
            description: workout.description,
            category: workout.category,
            level: workout.level,
            duration: workout.duration,
            exercises_count: workout.exercises,
            xp_reward: workout.xp,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            exercises: workout.exercises,
            xp: workout.xp,
            lastUsed: 'Nunca',
            completed: false,
            unlocked: workout.level <= stats.level,
          }))
        ];
        
        setWorkouts(allWorkouts);
      } catch (error) {
        console.error('Erro ao carregar treinos:', error);
        // Fallback para treinos evolutivos apenas
        const availableWorkouts = getAllAvailableWorkouts(stats.level);
        const workoutList: WorkoutDisplay[] = availableWorkouts.map(workout => ({
          id: workout.id,
          name: workout.name,
          description: workout.description,
          category: workout.category,
          level: workout.level,
          duration: workout.duration,
          exercises_count: workout.exercises,
          xp_reward: workout.xp,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          exercises: workout.exercises,
          xp: workout.xp,
          lastUsed: 'Nunca',
          completed: false,
          unlocked: workout.level <= stats.level,
        }));
        setWorkouts(workoutList);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, [stats.level]);

  const handleStartWorkout = (workout: Workout) => {
    if (!workout.unlocked) return;
    // Simular início do treino
    router.push(`/dashboard/workout/${workout.id}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cardio': return '🏃‍♂️';
      case 'strength': return '💪';
      case 'hiit': return '🔥';
      case 'mobility': return '🧘‍♂️';
      case 'mixed': return '⚡';
      default: return '🏋️‍♂️';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cardio': return 'text-blue-500';
      case 'strength': return 'text-red-500';
      case 'hiit': return 'text-orange-500';
      case 'mobility': return 'text-green-500';
      case 'mixed': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Meus Treinos</h1>
              <p className="text-muted-foreground">Gerencie e execute seus treinos</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{workouts.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{workouts.filter(w => w.completed).length}</p>
              <p className="text-sm text-muted-foreground">Completos</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {Math.round(workouts.reduce((acc, w) => acc + w.duration, 0) / workouts.length)}min
              </p>
              <p className="text-sm text-muted-foreground">Média</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {workouts.reduce((acc, w) => acc + w.xp, 0)}
              </p>
              <p className="text-sm text-muted-foreground">XP Total</p>
            </div>
          </div>

          {/* Workouts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card border border-border rounded-lg p-6 transition-all duration-300 ${
                  workout.unlocked 
                    ? 'hover:shadow-lg cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => handleStartWorkout(workout)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{getCategoryIcon(workout.category)}</span>
                      <h3 className="text-lg font-semibold text-foreground">
                        {workout.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {workout.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className={`${getCategoryColor(workout.category)} font-medium`}>
                        Nível {workout.level}
                      </span>
                      <span>•</span>
                      <span>{workout.exercises} exercícios</span>
                      <span>•</span>
                      <span>{workout.duration}min</span>
                    </div>
                  </div>
                  {!workout.unlocked && (
                    <div className="flex-shrink-0 ml-2">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                  {workout.completed && workout.unlocked && (
                    <div className="flex-shrink-0 ml-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{workout.exercises}</p>
                    <p className="text-xs text-muted-foreground">Exercícios</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{workout.duration}min</p>
                    <p className="text-xs text-muted-foreground">Duração</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{workout.xp} XP</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Último uso: {new Date(workout.lastUsed).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="flex space-x-2">
                  {workout.unlocked ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStartWorkout(workout)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      <span>Iniciar</span>
                    </motion.button>
                  ) : (
                    <div className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed">
                      <Lock className="w-4 h-4" />
                      <span>Nível {workout.level} necessário</span>
                    </div>
                  )}
                  
                  {workout.unlocked && (
                    <>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-accent rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {workouts.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum treino criado ainda
              </h3>
              <p className="text-muted-foreground mb-6">
                Crie seu primeiro treino personalizado
              </p>
              <button
                onClick={() => router.push('/dashboard/create-workout')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Criar Primeiro Treino
              </button>
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
}
