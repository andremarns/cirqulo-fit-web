"use client";

import { useState } from 'react';
import { Menu, X, User, LogOut, Trophy, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/contexts/GamificationContext';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const { user, logout } = useAuth();
  const { stats } = useGamification();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">CirquloFit</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Stats */}
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-foreground">Lv.{stats.level}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-foreground">{stats.xp} XP</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-foreground">{user?.name}</span>
            </div>

            {/* Logout */}
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('Logout button clicked');
                logout();
              }}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-4">
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-foreground font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">Nível {stats.level}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-accent/50">
                <Star className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">{stats.xp} XP</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.xpToNextLevel} para próximo nível
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-accent/50">
                <Trophy className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{stats.totalWorkouts} treinos</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.streak} dias seguidos
                  </p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('Mobile logout button clicked');
                logout();
              }}
              className="w-full flex items-center space-x-2 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
