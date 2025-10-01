"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dumbbell, Plus, Trophy, Star, Target, Zap, TrendingUp } from "lucide-react";
import { workoutService, DashboardData } from "@/services/workoutService";
import { Header } from "@/components/Header";
import { PageTransition } from "@/components/animations/PageTransition";
import { LoadingSpinner } from "@/components/animations/LoadingSpinner";
import { WeeklyProgress } from "@/components/dashboard/WeeklyProgress";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { LoadEvolutionChart } from "@/components/charts/LoadEvolutionChart";
import { ShareModal } from "@/components/ShareModal";
import { XPGuide } from "@/components/XPGuide";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { stats } = useGamification();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  // Carregar dados do dashboard da API
  useEffect(() => {
    const loadDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Se não há token, usar dados vazios
        setDashboardData({
          weekly_data: [
            { day: 'Seg', sessions: 0, completed: false, streak: 0 },
            { day: 'Ter', sessions: 0, completed: false, streak: 0 },
            { day: 'Qua', sessions: 0, completed: false, streak: 0 },
            { day: 'Qui', sessions: 0, completed: false, streak: 0 },
            { day: 'Sex', sessions: 0, completed: false, streak: 0 },
            { day: 'Sáb', sessions: 0, completed: false, streak: 0 },
            { day: 'Dom', sessions: 0, completed: false, streak: 0 },
          ],
          calendar_data: [
            { day: 'Seg', date: 15, completed: false, sessions: 0, is_today: false },
            { day: 'Ter', date: 16, completed: false, sessions: 0, is_today: false },
            { day: 'Qua', date: 17, completed: false, sessions: 0, is_today: false },
            { day: 'Qui', date: 18, completed: false, sessions: 0, is_today: false },
            { day: 'Sex', date: 19, completed: false, sessions: 0, is_today: true },
            { day: 'Sáb', date: 20, completed: false, sessions: 0, is_today: false },
            { day: 'Dom', date: 21, completed: false, sessions: 0, is_today: false },
          ],
          load_evolution_data: [],
          weekly_goal: 3,
          total_sessions: 0,
          completion_rate: 0,
          streak_days: 0,
        });
        setLoadingDashboard(false);
        return;
      }

      try {
        setLoadingDashboard(true);
        const data = await workoutService.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        // Fallback para dados vazios
        setDashboardData({
          weekly_data: [
            { day: 'Seg', sessions: 0, completed: false, streak: 0 },
            { day: 'Ter', sessions: 0, completed: false, streak: 0 },
            { day: 'Qua', sessions: 0, completed: false, streak: 0 },
            { day: 'Qui', sessions: 0, completed: false, streak: 0 },
            { day: 'Sex', sessions: 0, completed: false, streak: 0 },
            { day: 'Sáb', sessions: 0, completed: false, streak: 0 },
            { day: 'Dom', sessions: 0, completed: false, streak: 0 },
          ],
          calendar_data: [
            { day: 'Seg', date: 15, completed: false, sessions: 0, is_today: false },
            { day: 'Ter', date: 16, completed: false, sessions: 0, is_today: false },
            { day: 'Qua', date: 17, completed: false, sessions: 0, is_today: false },
            { day: 'Qui', date: 18, completed: false, sessions: 0, is_today: false },
            { day: 'Sex', date: 19, completed: false, sessions: 0, is_today: true },
            { day: 'Sáb', date: 20, completed: false, sessions: 0, is_today: false },
            { day: 'Dom', date: 21, completed: false, sessions: 0, is_today: false },
          ],
          load_evolution_data: [],
          weekly_goal: 3,
          total_sessions: 0,
          completion_rate: 0,
          streak_days: 0,
        });
      } finally {
        setLoadingDashboard(false);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  const handleCreateWorkout = () => {
    router.push('/dashboard/create-workout');
  };

  const handleMyWorkouts = () => {
    router.push('/dashboard/my-workouts');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const totalSessions = dashboardData?.total_sessions || 0;
  const weeklyGoal = dashboardData?.weekly_goal || 3;

  if (isLoading || loadingDashboard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Bem-vindo, {user.name}! 🎉
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Vamos sair do sedentarismo e construir uma vida mais ativa!
              </p>
            
              {/* Level Progress */}
              <div className="max-w-md mx-auto bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{stats.levelEmoji}</span>
                    <div>
                      <span className="font-semibold text-lg">{stats.levelName}</span>
                      <p className="text-xs text-muted-foreground">{stats.levelDescription}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stats.totalWorkouts} treinos
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.levelProgress}%`,
                      backgroundColor: stats.levelColor
                    }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm text-muted-foreground">
                    Progresso para próximo nível: {Math.round(stats.levelProgress)}%
                  </span>
                </div>
              </div>
          </div>

          {/* Weekly Calendar */}
          <div className="mb-8">
            <WeeklyCalendar
              data={dashboardData?.calendar_data?.map(day => ({
                ...day,
                isToday: day.is_today
              })) || []}
              onDayClick={(day) => {
                addNotification({
                  type: 'info',
                  title: 'Dia selecionado',
                  message: `Você clicou em ${day}`,
                });
              }}
            />
          </div>

          {/* Weekly Progress */}
          <div className="mb-8">
            <WeeklyProgress
              data={dashboardData?.weekly_data || []}
              totalSessions={totalSessions}
              weeklyGoal={weeklyGoal}
              onShare={handleShare}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {dashboardData?.load_evolution_data && dashboardData.load_evolution_data.length > 0 ? (
              <LoadEvolutionChart data={dashboardData.load_evolution_data} exerciseName="Supino Reto" />
            ) : (
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Evolução de Carga</h3>
                <p className="text-muted-foreground">
                  Complete alguns treinos para ver sua evolução de carga aqui!
                </p>
              </div>
            )}
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Resumo da Semana</h3>
              </div>
              
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Treinos completados</span>
                    <span className="font-semibold text-foreground">{totalSessions}/{weeklyGoal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Meta semanal</span>
                    <span className="font-semibold text-foreground">
                      {totalSessions > 0 ? Math.round((totalSessions / weeklyGoal) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Dias ativos</span>
                    <span className="font-semibold text-foreground">
                      {dashboardData?.weekly_data.filter(d => d.completed).length || 0}/7
                    </span>
                  </div>
                </div>
            </div>

            <XPGuide />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stats.totalWorkouts}</p>
              <p className="text-sm text-muted-foreground">Treinos</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stats.totalExercises}</p>
              <p className="text-sm text-muted-foreground">Exercícios</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stats.streak}</p>
              <p className="text-sm text-muted-foreground">Sequência</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Star className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stats.achievements.filter(a => a.unlocked).length}</p>
              <p className="text-sm text-muted-foreground">Conquistas</p>
            </div>
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateWorkout}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group active:scale-95"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <div className="text-left">
                    <h3 className="text-xl font-semibold text-foreground">Criar Treino</h3>
                  <p className="text-muted-foreground">Crie uma nova sessão de treino personalizada.</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleMyWorkouts}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group active:scale-95"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Dumbbell className="h-8 w-8 text-primary" />
                </div>
                <div className="text-left">
                    <h3 className="text-xl font-semibold text-foreground">Meus Treinos</h3>
                  <p className="text-muted-foreground">Visualize e gerencie seus treinos criados.</p>
                </div>
              </div>
            </motion.button>
          </div>
        </main>

        {/* Share Modal */}
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            weeklyData={{
              totalSessions,
              weeklyGoal,
              streakDays: dashboardData?.streak_days || 0,
              completionRate: totalSessions > 0 ? Math.round((totalSessions / weeklyGoal) * 100) : 0,
            }}
            userStats={{
              level: stats.level,
              xp: stats.xp,
              totalWorkouts: stats.totalWorkouts,
              achievements: stats.achievements.filter(a => a.unlocked).length,
            }}
          />
      </div>
    </PageTransition>
  );
}