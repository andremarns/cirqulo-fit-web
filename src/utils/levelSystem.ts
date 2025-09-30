// Sistema de evolução de níveis para treinos

export interface LevelInfo {
  level: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  requiredSessions: number;
  nextLevelSessions: number;
}

export const LEVEL_SYSTEM: LevelInfo[] = [
  {
    level: 1,
    name: 'Ameba',
    description: 'Saiu do sedentarismo - primeiros passos!',
    emoji: '🦠',
    color: '#8B5CF6',
    requiredSessions: 0,
    nextLevelSessions: 5,
  },
  {
    level: 2,
    name: 'Tartaruga',
    description: 'Movimento lento mas constante',
    emoji: '🐢',
    color: '#10B981',
    requiredSessions: 5,
    nextLevelSessions: 10,
  },
  {
    level: 3,
    name: 'Coelho',
    description: 'Ganhou agilidade e fôlego',
    emoji: '🐰',
    color: '#F59E0B',
    requiredSessions: 15,
    nextLevelSessions: 15,
  },
  {
    level: 4,
    name: 'Cavalo',
    description: 'Força e resistência em desenvolvimento',
    emoji: '🐴',
    color: '#EF4444',
    requiredSessions: 30,
    nextLevelSessions: 20,
  },
  {
    level: 5,
    name: 'Leão',
    description: 'Predador do sedentarismo',
    emoji: '🦁',
    color: '#F97316',
    requiredSessions: 50,
    nextLevelSessions: 25,
  },
  {
    level: 6,
    name: 'Tigre',
    description: 'Agilidade e força combinadas',
    emoji: '🐅',
    color: '#DC2626',
    requiredSessions: 75,
    nextLevelSessions: 30,
  },
  {
    level: 7,
    name: 'Águia',
    description: 'Visão de longo prazo e disciplina',
    emoji: '🦅',
    color: '#7C3AED',
    requiredSessions: 105,
    nextLevelSessions: 35,
  },
  {
    level: 8,
    name: 'Dragão',
    description: 'Lendário - domina o sedentarismo',
    emoji: '🐉',
    color: '#BE185D',
    requiredSessions: 140,
    nextLevelSessions: 40,
  },
  {
    level: 9,
    name: 'Fênix',
    description: 'Renasce mais forte a cada treino',
    emoji: '🔥',
    color: '#F59E0B',
    requiredSessions: 180,
    nextLevelSessions: 50,
  },
  {
    level: 10,
    name: 'Titã',
    description: 'Deus do fitness - nível máximo',
    emoji: '⚡',
    color: '#FBBF24',
    requiredSessions: 230,
    nextLevelSessions: 0,
  },
];

export const getLevelInfo = (level: number): LevelInfo => {
  return LEVEL_SYSTEM.find(l => l.level === level) || LEVEL_SYSTEM[0];
};

export const getNextLevelInfo = (currentLevel: number): LevelInfo | null => {
  const nextLevel = LEVEL_SYSTEM.find(l => l.level === currentLevel + 1);
  return nextLevel || null;
};

export const getLevelProgress = (totalSessions: number, currentLevel: number): number => {
  const levelInfo = getLevelInfo(currentLevel);
  const nextLevelInfo = getNextLevelInfo(currentLevel);
  
  if (!nextLevelInfo) return 100; // Nível máximo
  
  const progress = totalSessions - levelInfo.requiredSessions;
  const totalNeeded = nextLevelInfo.requiredSessions - levelInfo.requiredSessions;
  
  return Math.min(100, Math.max(0, (progress / totalNeeded) * 100));
};
