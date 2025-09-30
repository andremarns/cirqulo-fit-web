"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Dumbbell } from 'lucide-react';

interface LoadData {
  date: string;
  weight: number;
  reps: number;
  exercise: string;
}

interface LoadEvolutionChartProps {
  data: LoadData[];
  exerciseName?: string;
}

export function LoadEvolutionChart({ data, exerciseName = "Exercício" }: LoadEvolutionChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum dado ainda</h3>
        <p className="text-muted-foreground">
          Complete alguns treinos para ver sua evolução de carga
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Evolução de Carga</h3>
        </div>
        <span className="text-sm text-muted-foreground">{exerciseName}</span>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-primary">{Math.max(...data.map(d => d.weight))}kg</p>
          <p className="text-xs text-muted-foreground">Maior carga</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-500">
            {data.length > 1 ? 
              `${((data[data.length - 1].weight - data[0].weight) / data[0].weight * 100).toFixed(1)}%` : 
              '0%'
            }
          </p>
          <p className="text-xs text-muted-foreground">Evolução</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-500">{data.length}</p>
          <p className="text-xs text-muted-foreground">Sessões</p>
        </div>
      </div>
    </div>
  );
}
