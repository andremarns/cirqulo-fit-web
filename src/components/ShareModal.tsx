"use client";

import { useState, useRef } from 'react';
import { X, Download, Share2, Trophy, Calendar, Target } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  weeklyData: {
    totalSessions: number;
    weeklyGoal: number;
    streakDays: number;
    completionRate: number;
  };
  userStats: {
    level: number;
    xp: number;
    totalWorkouts: number;
    achievements: number;
  };
}

export function ShareModal({ isOpen, onClose, weeklyData, userStats }: ShareModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!shareRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `cirqulofit-progress-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareToSocial = async () => {
    const text = `🔥 Completei ${weeklyData.totalSessions} treinos esta semana no CirquloFit! Nível ${userStats.level} com ${userStats.xp} XP! 💪`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Progresso no CirquloFit',
          text: text,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar para clipboard
      await navigator.clipboard.writeText(text);
      alert('Texto copiado para a área de transferência!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Compartilhar Progresso</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          {/* Share Card Preview */}
          <div
            ref={shareRef}
            className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-lg p-6 text-center mb-6"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">CirquloFit</h2>
            <p className="text-muted-foreground mb-4">Meu Progresso Semanal</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-card/50 rounded-lg p-3">
                <Calendar className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{weeklyData.totalSessions}</p>
                <p className="text-xs text-muted-foreground">Treinos</p>
              </div>
              <div className="bg-card/50 rounded-lg p-3">
                <Target className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{weeklyData.completionRate}%</p>
                <p className="text-xs text-muted-foreground">Meta</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span>Nível {userStats.level}</span>
              <span>•</span>
              <span>{userStats.xp} XP</span>
              <span>•</span>
              <span>{userStats.achievements} conquistas</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={generateImage}
              disabled={isGenerating}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Gerando...' : 'Baixar Imagem'}</span>
            </button>
            
            <button
              onClick={shareToSocial}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
