"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, SkipForward, CheckCircle, Clock, Target, Trophy, Video } from 'lucide-react';
import { Header } from '@/components/Header';
import { PageTransition } from '@/components/animations/PageTransition';
import { LoadingSpinner } from '@/components/animations/LoadingSpinner';
import { ExerciseGifModal } from '@/components/ExerciseGifModal';
import { useNotifications } from '@/contexts/NotificationContext';
import { useGamification } from '@/contexts/GamificationContext';
import { workoutService } from '@/services/workoutService';
import { motion } from 'framer-motion';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutSession {
  id: string;
  name: string;
  exercises: Exercise[];
  currentExercise: number;
  currentSet: number;
  isActive: boolean;
  startTime: Date | null;
  totalDuration: number;
}

export default function WorkoutSessionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { completeWorkout, completeExercise, addXP } = useGamification();
  
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [showGifModal, setShowGifModal] = useState(false);

  // Mock workout data
  useEffect(() => {
    const getWorkoutData = (id: string): WorkoutSession => {
      const workouts: Record<string, WorkoutSession> = {
        '1': {
          id: '1',
          name: '🏃‍♂️ Cardio Inicial - Fôlego',
          exercises: [
            { id: '1', name: 'Caminhada Leve', sets: 1, reps: 5, weight: 0, completed: false },
            { id: '2', name: 'Esteira - Ritmo Moderado', sets: 1, reps: 10, weight: 0, completed: false },
            { id: '3', name: 'Bike Ergométrica', sets: 1, reps: 8, weight: 0, completed: false },
            { id: '4', name: 'Elíptico', sets: 1, reps: 6, weight: 0, completed: false },
            { id: '5', name: 'Subida na Escada', sets: 1, reps: 3, weight: 0, completed: false },
            { id: '6', name: 'Alongamento Final', sets: 1, reps: 1, weight: 0, completed: false },
          ],
          currentExercise: 0,
          currentSet: 1,
          isActive: false,
          startTime: null,
          totalDuration: 0,
        },
        '2': {
          id: '2',
          name: '💪 Força Básica - Peito e Braços',
          exercises: [
            { id: '1', name: 'Supino Reto', sets: 3, reps: 12, weight: 40, completed: false },
            { id: '2', name: 'Supino Inclinado', sets: 3, reps: 10, weight: 35, completed: false },
            { id: '3', name: 'Crucifixo', sets: 3, reps: 15, weight: 15, completed: false },
            { id: '4', name: 'Tríceps Pulley', sets: 3, reps: 12, weight: 20, completed: false },
            { id: '5', name: 'Rosca Bíceps', sets: 3, reps: 12, weight: 15, completed: false },
          ],
          currentExercise: 0,
          currentSet: 1,
          isActive: false,
          startTime: null,
          totalDuration: 0,
        },
        '3': {
          id: '3',
          name: '🦵 Pernas e Core - Base Sólida',
          exercises: [
            { id: '1', name: 'Agachamento Livre', sets: 3, reps: 15, weight: 0, completed: false },
            { id: '2', name: 'Leg Press', sets: 3, reps: 12, weight: 60, completed: false },
            { id: '3', name: 'Afundo', sets: 3, reps: 10, weight: 0, completed: false },
            { id: '4', name: 'Prancha', sets: 3, reps: 30, weight: 0, completed: false },
            { id: '5', name: 'Abdominal', sets: 3, reps: 15, weight: 0, completed: false },
            { id: '6', name: 'Ponte Glúteo', sets: 3, reps: 12, weight: 0, completed: false },
          ],
          currentExercise: 0,
          currentSet: 1,
          isActive: false,
          startTime: null,
          totalDuration: 0,
        },
        '4': {
          id: '4',
          name: '🔥 HIIT - Queima e Condicionamento',
          exercises: [
            { id: '1', name: 'Burpees', sets: 4, reps: 8, weight: 0, completed: false },
            { id: '2', name: 'Mountain Climber', sets: 4, reps: 20, weight: 0, completed: false },
            { id: '3', name: 'Jumping Jacks', sets: 4, reps: 30, weight: 0, completed: false },
            { id: '4', name: 'Polichinelo', sets: 4, reps: 25, weight: 0, completed: false },
            { id: '5', name: 'Agachamento com Salto', sets: 4, reps: 10, weight: 0, completed: false },
            { id: '6', name: 'Flexão Inclinada', sets: 4, reps: 8, weight: 0, completed: false },
            { id: '7', name: 'Prancha Lateral', sets: 4, reps: 20, weight: 0, completed: false },
            { id: '8', name: 'Descanso Ativo', sets: 4, reps: 1, weight: 0, completed: false },
          ],
          currentExercise: 0,
          currentSet: 1,
          isActive: false,
          startTime: null,
          totalDuration: 0,
        },
        '5': {
          id: '5',
          name: '🧘‍♂️ Mobilidade e Postura',
          exercises: [
            { id: '1', name: 'Alongamento Cervical', sets: 2, reps: 30, weight: 0, completed: false },
            { id: '2', name: 'Rotação de Ombros', sets: 2, reps: 15, weight: 0, completed: false },
            { id: '3', name: 'Alongamento Peitoral', sets: 2, reps: 30, weight: 0, completed: false },
            { id: '4', name: 'Flexão de Coluna', sets: 2, reps: 10, weight: 0, completed: false },
            { id: '5', name: 'Alongamento Lombar', sets: 2, reps: 30, weight: 0, completed: false },
            { id: '6', name: 'Alongamento de Pernas', sets: 2, reps: 20, weight: 0, completed: false },
            { id: '7', name: 'Respiração Diafragmática', sets: 1, reps: 5, weight: 0, completed: false },
          ],
          currentExercise: 0,
          currentSet: 1,
          isActive: false,
          startTime: null,
          totalDuration: 0,
        },
      };
      
      return workouts[id] || workouts['1'];
    };
    
    const mockWorkout = getWorkoutData(params.id);
    setSession(mockWorkout);
    setIsLoading(false);
  }, [params.id]);

  // Rest timer effect
  useEffect(() => {
    if (restTimer > 0) {
      const timer = setTimeout(() => setRestTimer(restTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isResting) {
      setIsResting(false);
    }
  }, [restTimer, isResting]);

  const startWorkout = async () => {
    if (!session) return;
    
    try {
      // Iniciar sessão na API
      const apiSession = await workoutService.startWorkoutSession(parseInt(id));
      setSessionId(apiSession.id);
      
      setSession({
        ...session,
        isActive: true,
        startTime: new Date(),
      });
      
      // XP por iniciar o treino
      addXP(10);
      
      addNotification({
        type: 'success',
        title: 'Treino iniciado!',
        message: '+10 XP por iniciar o treino! Boa sorte! 💪',
      });
    } catch (error) {
      console.error('Erro ao iniciar treino:', error);
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível iniciar o treino',
      });
    }
  };

  const completeSet = async () => {
    if (!session) return;
    
    const updatedSession = { ...session };
    const currentEx = updatedSession.exercises[updatedSession.currentExercise];
    
    try {
      if (updatedSession.currentSet < currentEx.sets) {
        updatedSession.currentSet += 1;
        
        // Registrar exercício na API se for a primeira série
        if (updatedSession.currentSet === 1) {
          await workoutService.addExerciseToSession(sessionId, {
            exercise_name: currentEx.name,
            sets: currentEx.sets,
            reps: currentEx.reps,
            weight: currentEx.weight,
          });
        }
        
        // Atualizar progresso na API
        await workoutService.updateExerciseProgress(currentEx.id, updatedSession.currentSet);
        
        // XP por completar uma série
        addXP(5);
        addNotification({
          type: 'info',
          title: 'Série concluída!',
          message: '+5 XP',
        });
      } else {
        // Exercise completed
        currentEx.completed = true;
        updatedSession.currentExercise += 1;
        updatedSession.currentSet = 1;
        
        completeExercise();
        addXP(15); // XP por completar um exercício
        
        addNotification({
          type: 'success',
          title: 'Exercício concluído!',
          message: '+15 XP por completar o exercício!',
        });
        
        if (updatedSession.currentExercise < updatedSession.exercises.length) {
          // Start rest timer
          setRestTimer(90); // 90 seconds rest
          setIsResting(true);
        } else {
          // Workout completed
          finishWorkout();
          return;
        }
      }
    } catch (error) {
      console.error('Erro ao registrar série:', error);
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível registrar a série',
      });
    }
    
    setSession(updatedSession);
  };

  const finishWorkout = async () => {
    if (!session) return;
    
    try {
      // Completar sessão na API
      await workoutService.completeWorkoutSession(sessionId);
      
      const duration = session.startTime ? 
        Math.floor((new Date().getTime() - session.startTime.getTime()) / 1000 / 60) : 0;
      
      completeWorkout();
      addXP(100); // XP por completar todo o treino
      
      addNotification({
        type: 'success',
        title: 'Treino concluído!',
        message: `Parabéns! +100 XP por completar o treino! Duração: ${duration}min`,
      });
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao finalizar treino:', error);
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível finalizar o treino',
      });
    }
  };

  if (isLoading || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Carregando treino...</p>
        </div>
      </div>
    );
  }

  const currentExercise = session.exercises[session.currentExercise];
  const progress = session.currentExercise / session.exercises.length;
  const completedExercises = session.exercises.filter(ex => ex.completed).length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{session.name}</h1>
              <p className="text-muted-foreground">
                {completedExercises} de {session.exercises.length} exercícios concluídos
              </p>
            </div>
            {session.isActive && (
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {session.startTime ? 
                    Math.floor((new Date().getTime() - session.startTime.getTime()) / 1000 / 60) : 0
                  }min
                </div>
                <p className="text-sm text-muted-foreground">Duração</p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progresso</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <motion.div
                className="bg-primary h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {!session.isActive ? (
            /* Start Workout */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Pronto para começar?
              </h2>
              <p className="text-muted-foreground mb-8">
                {session.exercises.length} exercícios • ~45 minutos
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={startWorkout}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
              >
                Iniciar Treino
              </motion.button>
            </div>
          ) : (
            /* Active Workout */
            <div className="space-y-6">
              {/* Rest Timer */}
              {isResting && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent border border-accent-foreground/20 rounded-lg p-6 text-center"
                >
                  <Clock className="w-8 h-8 text-accent-foreground mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-accent-foreground mb-2">
                    Tempo de Descanso
                  </h3>
                  <div className="text-4xl font-bold text-accent-foreground mb-2">
                    {Math.floor(restTimer / 60)}:{(restTimer % 60).toString().padStart(2, '0')}
                  </div>
                  <p className="text-sm text-accent-foreground/80">
                    Próximo: {session.exercises[session.currentExercise]?.name}
                  </p>
                </motion.div>
              )}

              {/* Current Exercise */}
              {!isResting && currentExercise && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold text-foreground">
                          {currentExercise.name}
                        </h3>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowGifModal(true)}
                          className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                          title="Ver demonstração"
                        >
                          <Video className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <p className="text-muted-foreground">
                        Série {session.currentSet} de {currentExercise.sets}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {currentExercise.weight}kg
                      </div>
                      <p className="text-sm text-muted-foreground">Peso</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">
                        {currentExercise.reps}
                      </div>
                      <p className="text-sm text-muted-foreground">Repetições</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Trophy className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">
                        {session.currentSet}/{currentExercise.sets}
                      </div>
                      <p className="text-sm text-muted-foreground">Séries</p>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={completeSet}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
                  >
                    Concluir Série
                  </motion.button>
                </div>
              )}

              {/* Exercise List */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-foreground">Exercícios</h4>
                {session.exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className={`
                      flex items-center justify-between p-4 rounded-lg border
                      ${exercise.completed 
                        ? 'bg-green-500/10 border-green-500/20' 
                        : index === session.currentExercise
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-muted border-border'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      {exercise.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span className="font-medium text-foreground">
                        {exercise.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-muted-foreground">
                        {exercise.sets} séries × {exercise.reps} reps
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setShowGifModal(true);
                        }}
                        className="p-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded transition-colors"
                        title="Ver demonstração"
                      >
                        <Video className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Exercise GIF Modal */}
        <ExerciseGifModal
          isOpen={showGifModal}
          onClose={() => setShowGifModal(false)}
          exerciseName={currentExercise?.name || ''}
        />
      </div>
    </PageTransition>
  );
}
