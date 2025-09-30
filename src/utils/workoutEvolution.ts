// Sistema de evolução de treinos baseado no nível

export interface WorkoutData {
  id: string;
  name: string;
  description: string;
  exercises: number;
  duration: number;
  xp: number;
  level: number;
  category: 'cardio' | 'strength' | 'hiit' | 'mobility' | 'mixed';
}

export const EVOLUTIONARY_WORKOUTS: Record<number, WorkoutData[]> = {
  1: [ // Ameba - Nível 1
    {
      id: '1-1',
      name: '🦠 Primeiros Passos',
      description: 'Caminhada leve para sair do sedentarismo',
      exercises: 3,
      duration: 15,
      xp: 20,
      level: 1,
      category: 'cardio',
    },
    {
      id: '1-2',
      name: '🦠 Alongamento Básico',
      description: 'Mobilidade inicial para programadores',
      exercises: 4,
      duration: 10,
      xp: 15,
      level: 1,
      category: 'mobility',
    },
  ],
  2: [ // Tartaruga - Nível 2
    {
      id: '2-1',
      name: '🐢 Caminhada Moderada',
      description: 'Aumentando o ritmo gradualmente',
      exercises: 4,
      duration: 20,
      xp: 30,
      level: 2,
      category: 'cardio',
    },
    {
      id: '2-2',
      name: '🐢 Força Básica',
      description: 'Primeiros exercícios com peso',
      exercises: 5,
      duration: 25,
      xp: 35,
      level: 2,
      category: 'strength',
    },
  ],
  3: [ // Coelho - Nível 3
    {
      id: '3-1',
      name: '🐰 Cardio Intermediário',
      description: 'Corrida leve e exercícios aeróbicos',
      exercises: 5,
      duration: 25,
      xp: 40,
      level: 3,
      category: 'cardio',
    },
    {
      id: '3-2',
      name: '🐰 Força em Desenvolvimento',
      description: 'Treino de força com mais intensidade',
      exercises: 6,
      duration: 30,
      xp: 45,
      level: 3,
      category: 'strength',
    },
    {
      id: '3-3',
      name: '🐰 HIIT Básico',
      description: 'Primeiro treino intervalado',
      exercises: 6,
      duration: 20,
      xp: 50,
      level: 3,
      category: 'hiit',
    },
  ],
  4: [ // Cavalo - Nível 4
    {
      id: '4-1',
      name: '🐴 Cardio Avançado',
      description: 'Corrida e exercícios de alta intensidade',
      exercises: 6,
      duration: 30,
      xp: 55,
      level: 4,
      category: 'cardio',
    },
    {
      id: '4-2',
      name: '🐴 Força Sólida',
      description: 'Treino de força com cargas maiores',
      exercises: 7,
      duration: 35,
      xp: 60,
      level: 4,
      category: 'strength',
    },
    {
      id: '4-3',
      name: '🐴 HIIT Intermediário',
      description: 'Treino intervalado mais intenso',
      exercises: 8,
      duration: 25,
      xp: 65,
      level: 4,
      category: 'hiit',
    },
  ],
  5: [ // Leão - Nível 5
    {
      id: '5-1',
      name: '🦁 Cardio de Predador',
      description: 'Exercícios de alta intensidade',
      exercises: 7,
      duration: 35,
      xp: 70,
      level: 5,
      category: 'cardio',
    },
    {
      id: '5-2',
      name: '🦁 Força de Leão',
      description: 'Treino de força avançado',
      exercises: 8,
      duration: 40,
      xp: 75,
      level: 5,
      category: 'strength',
    },
    {
      id: '5-3',
      name: '🦁 HIIT de Leão',
      description: 'Treino intervalado de alta intensidade',
      exercises: 9,
      duration: 30,
      xp: 80,
      level: 5,
      category: 'hiit',
    },
    {
      id: '5-4',
      name: '🦁 Treino Completo',
      description: 'Combinação de força e cardio',
      exercises: 10,
      duration: 45,
      xp: 90,
      level: 5,
      category: 'mixed',
    },
  ],
  6: [ // Tigre - Nível 6
    {
      id: '6-1',
      name: '🐅 Agilidade de Tigre',
      description: 'Treino focado em agilidade e velocidade',
      exercises: 8,
      duration: 30,
      xp: 85,
      level: 6,
      category: 'hiit',
    },
    {
      id: '6-2',
      name: '🐅 Força de Tigre',
      description: 'Treino de força com complexidade',
      exercises: 9,
      duration: 45,
      xp: 90,
      level: 6,
      category: 'strength',
    },
    {
      id: '6-3',
      name: '🐅 Resistência de Tigre',
      description: 'Cardio de longa duração',
      exercises: 6,
      duration: 50,
      xp: 95,
      level: 6,
      category: 'cardio',
    },
  ],
  7: [ // Águia - Nível 7
    {
      id: '7-1',
      name: '🦅 Visão de Águia',
      description: 'Treino de precisão e controle',
      exercises: 10,
      duration: 40,
      xp: 100,
      level: 7,
      category: 'mixed',
    },
    {
      id: '7-2',
      name: '🦅 Voo de Águia',
      description: 'Cardio de alta altitude',
      exercises: 8,
      duration: 45,
      xp: 105,
      level: 7,
      category: 'cardio',
    },
    {
      id: '7-3',
      name: '🦅 Garras de Águia',
      description: 'Força e agilidade combinadas',
      exercises: 11,
      duration: 50,
      xp: 110,
      level: 7,
      category: 'strength',
    },
  ],
  8: [ // Dragão - Nível 8
    {
      id: '8-1',
      name: '🐉 Fogo de Dragão',
      description: 'HIIT de intensidade máxima',
      exercises: 12,
      duration: 35,
      xp: 120,
      level: 8,
      category: 'hiit',
    },
    {
      id: '8-2',
      name: '🐉 Escamas de Dragão',
      description: 'Força lendária',
      exercises: 12,
      duration: 55,
      xp: 125,
      level: 8,
      category: 'strength',
    },
    {
      id: '8-3',
      name: '🐉 Voo de Dragão',
      description: 'Resistência sobrenatural',
      exercises: 10,
      duration: 60,
      xp: 130,
      level: 8,
      category: 'cardio',
    },
  ],
  9: [ // Fênix - Nível 9
    {
      id: '9-1',
      name: '🔥 Renascimento',
      description: 'Treino de transformação total',
      exercises: 15,
      duration: 60,
      xp: 150,
      level: 9,
      category: 'mixed',
    },
    {
      id: '9-2',
      name: '🔥 Chamas Eternas',
      description: 'Intensidade que nunca se apaga',
      exercises: 14,
      duration: 45,
      xp: 145,
      level: 9,
      category: 'hiit',
    },
  ],
  10: [ // Titã - Nível 10
    {
      id: '10-1',
      name: '⚡ Poder dos Deuses',
      description: 'Treino divino - nível máximo',
      exercises: 20,
      duration: 90,
      xp: 200,
      level: 10,
      category: 'mixed',
    },
    {
      id: '10-2',
      name: '⚡ Trovão dos Titãs',
      description: 'Força sobrenatural',
      exercises: 18,
      duration: 75,
      xp: 195,
      level: 10,
      category: 'strength',
    },
    {
      id: '10-3',
      name: '⚡ Relâmpago Divino',
      description: 'Velocidade dos deuses',
      exercises: 16,
      duration: 50,
      xp: 190,
      level: 10,
      category: 'hiit',
    },
  ],
};

export const getWorkoutsForLevel = (level: number): WorkoutData[] => {
  return EVOLUTIONARY_WORKOUTS[level] || EVOLUTIONARY_WORKOUTS[1];
};

export const getAllAvailableWorkouts = (currentLevel: number): WorkoutData[] => {
  const workouts: WorkoutData[] = [];
  
  for (let level = 1; level <= currentLevel; level++) {
    workouts.push(...getWorkoutsForLevel(level));
  }
  
  return workouts;
};
