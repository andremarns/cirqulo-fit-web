"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Dumbbell, Clock, Target, Trash2, Save } from 'lucide-react';
import { Header } from '@/components/Header';
import { PageTransition } from '@/components/animations/PageTransition';
import { LoadingSpinner } from '@/components/animations/LoadingSpinner';
import { useNotifications } from '@/contexts/NotificationContext';
import { useGamification } from '@/contexts/GamificationContext';
import { motion } from 'framer-motion';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default function CreateWorkoutPage() {
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { completeWorkout } = useGamification();
  const [isCreating, setIsCreating] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: '', sets: 3, reps: 12, weight: 0 }
  ]);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: 3,
      reps: 12,
      weight: 0
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (id: string) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter(ex => ex.id !== id));
    }
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string | number) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const handleCreateWorkout = async () => {
    if (!workoutName.trim()) {
      addNotification({
        type: 'error',
        title: 'Nome obrigatório',
        message: 'Digite um nome para o treino',
      });
      return;
    }

    if (exercises.some(ex => !ex.name.trim())) {
      addNotification({
        type: 'error',
        title: 'Exercícios incompletos',
        message: 'Preencha o nome de todos os exercícios',
      });
      return;
    }

    setIsCreating(true);
    
    // Simular criação de treino
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addNotification({
      type: 'success',
      title: 'Treino criado!',
      message: 'Agora você pode iniciar sua sessão de treino!',
    });
    
    router.push('/dashboard');
  };

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
            <div>
              <h1 className="text-3xl font-bold text-foreground">Criar Treino</h1>
              <p className="text-muted-foreground">Personalize sua sessão de treino</p>
            </div>
          </div>

          {/* Workout Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Informações do Treino</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nome do Treino *
                    </label>
                    <input
                      type="text"
                      value={workoutName}
                      onChange={(e) => setWorkoutName(e.target.value)}
                      placeholder="Ex: Treino de Peito e Tríceps"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Descrição (opcional)
                    </label>
                    <textarea
                      value={workoutDescription}
                      onChange={(e) => setWorkoutDescription(e.target.value)}
                      placeholder="Descreva seu treino..."
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>

              {/* Exercises */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Exercícios</h3>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={addExercise}
                    className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar</span>
                  </motion.button>
                </div>
                
                <div className="space-y-3">
                  {exercises.map((exercise, index) => (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg"
                    >
                      <Dumbbell className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                          placeholder={`Exercício ${index + 1}`}
                          className="w-full px-2 py-1 border border-border rounded bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value) || 0)}
                          placeholder="Sets"
                          className="w-16 px-2 py-1 border border-border rounded bg-input text-foreground text-center focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                        <input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(exercise.id, 'reps', parseInt(e.target.value) || 0)}
                          placeholder="Reps"
                          className="w-16 px-2 py-1 border border-border rounded bg-input text-foreground text-center focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                        <input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => updateExercise(exercise.id, 'weight', parseInt(e.target.value) || 0)}
                          placeholder="Peso"
                          className="w-16 px-2 py-1 border border-border rounded bg-input text-foreground text-center focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                        {exercises.length > 1 && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeExercise(exercise.id)}
                            className="p-1 hover:bg-destructive/10 text-destructive rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Resumo</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Dumbbell className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Exercícios</span>
                    </div>
                    <span className="font-semibold text-foreground">{exercises.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Duração estimada</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {exercises.length * 10} min
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">XP estimado</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {exercises.length * 10} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Create Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateWorkout}
                disabled={isCreating}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Criando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Criar Treino</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
