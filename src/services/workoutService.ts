// Serviço para gerenciar treinos e progresso

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Workout {
  id: number;
  name: string;
  description: string;
  category: 'cardio' | 'strength' | 'hiit' | 'mobility' | 'mixed';
  level: number;
  duration: number;
  exercises_count: number;
  xp_reward: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkoutSession {
  id: number;
  user_id: number;
  workout_id: number;
  started_at: string;
  completed_at?: string;
  duration?: number;
  xp_earned: number;
  is_completed: boolean;
}

export interface WorkoutExercise {
  id: number;
  session_id: number;
  exercise_name: string;
  sets: number;
  reps: number;
  weight: number;
  completed_sets: number;
  is_completed: boolean;
}

export interface WeeklyProgress {
  week_start: string;
  week_end: string;
  total_sessions: number;
  completed_sessions: number;
  total_xp: number;
  current_streak: number;
  level: number;
  daily_progress: Array<{
    date: string;
    sessions: number;
    completed: number;
    xp_earned: number;
  }>;
}

export interface WorkoutStats {
  total_workouts: number;
  total_exercises: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  level: number;
  level_progress: number;
  achievements_unlocked: number;
}

export interface WeeklyData {
  day: string;
  sessions: number;
  completed: boolean;
  streak: number;
}

export interface CalendarData {
  day: string;
  date: number;
  completed: boolean;
  sessions: number;
  is_today: boolean;
}

export interface LoadEvolutionData {
  date: string;
  weight: number;
  reps: number;
  exercise: string;
}

export interface DashboardData {
  weekly_data: WeeklyData[];
  calendar_data: CalendarData[];
  load_evolution_data: LoadEvolutionData[];
  weekly_goal: number;
  total_sessions: number;
  completion_rate: number;
  streak_days: number;
}

class WorkoutService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    // Adicionar timeout de 10 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map((err: unknown) => {
              if (typeof err === 'object' && err !== null) {
                const errorObj = err as Record<string, unknown>;
                return errorObj.msg || errorObj.message || String(err);
              }
              return String(err);
            }).join(', ');
          } else {
            errorMessage = String(errorData.detail);
          }
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      console.error('API request failed:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - servidor demorou para responder');
      }
      
      throw error;
    }
  }

  async getWorkouts(level?: number): Promise<Workout[]> {
    const params = level ? `?level=${level}` : '';
    return this.request<Workout[]>(`/api/workouts${params}`);
  }

  async createWorkout(workoutData: {
    name: string;
    description?: string;
    category: string;
    level: number;
    duration?: number;
    exercises_count: number;
    xp_reward: number;
  }): Promise<Workout> {
    return this.request<Workout>('/api/workouts/', {
      method: 'POST',
      body: JSON.stringify(workoutData),
    });
  }

  async startWorkoutSession(workoutId: number): Promise<WorkoutSession> {
    return this.request<WorkoutSession>('/api/workouts/sessions/', {
      method: 'POST',
      body: JSON.stringify({
        workout_id: workoutId,
        started_at: new Date().toISOString()
      }),
    });
  }

  async completeWorkoutSession(sessionId: number): Promise<WorkoutSession> {
    return this.request<WorkoutSession>(`/api/workouts/sessions/${sessionId}/complete`, {
      method: 'PATCH',
    });
  }

  async addExerciseToSession(sessionId: number, exerciseData: {
    exercise_name: string;
    sets: number;
    reps: number;
    weight: number;
  }): Promise<WorkoutExercise> {
    return this.request<WorkoutExercise>(`/api/workouts/sessions/${sessionId}/exercises`, {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
  }

  async updateExerciseProgress(exerciseId: number, completedSets: number): Promise<WorkoutExercise> {
    return this.request<WorkoutExercise>(`/api/workouts/sessions/exercises/${exerciseId}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ completed_sets: completedSets }),
    });
  }

  async getSessionExercises(sessionId: number): Promise<WorkoutExercise[]> {
    return this.request<WorkoutExercise[]>(`/api/workouts/sessions/${sessionId}/exercises`);
  }

  async getWeeklyProgress(): Promise<WeeklyProgress> {
    return this.request<WeeklyProgress>('/api/workouts/progress/weekly');
  }

  async getWorkoutStats(): Promise<WorkoutStats> {
    return this.request<WorkoutStats>('/api/workouts/stats/summary');
  }

  async getDashboardData(): Promise<DashboardData> {
    return this.request<DashboardData>('/api/workouts/dashboard/');
  }

}

export const workoutService = new WorkoutService();
