"use client";

import { Trophy, Play, Target, CheckCircle } from 'lucide-react';

export function XPGuide() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Como Ganhar XP</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Play className="w-4 h-4 text-green-500" />
          <span className="text-sm text-foreground">Iniciar treino:</span>
          <span className="font-semibold text-green-500">+10 XP</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Target className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-foreground">Completar série:</span>
          <span className="font-semibold text-blue-500">+5 XP</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-4 h-4 text-purple-500" />
          <span className="text-sm text-foreground">Completar exercício:</span>
          <span className="font-semibold text-purple-500">+15 XP</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-foreground">Completar treino:</span>
          <span className="font-semibold text-yellow-500">+100 XP</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-accent/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Dica:</strong> Você só ganha XP quando realmente treina! 
          Criar treinos não dá XP, apenas executá-los.
        </p>
      </div>
    </div>
  );
}
