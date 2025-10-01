export interface GifData {
  id: string;
  title: string;
  url: string;
  preview: string;
  width: number;
  height: number;
}

class GifService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  async searchExerciseGifs(exerciseName: string, limit: number = 5): Promise<GifData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/gifs/search?exercise=${encodeURIComponent(exerciseName)}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar GIFs:', error);
      // Retornar GIFs mockados em caso de erro
      return this.getMockGifs(exerciseName, limit);
    }
  }

  async getTrendingWorkoutGifs(limit: number = 10): Promise<GifData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/gifs/trending?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar GIFs em tendência:', error);
      return this.getMockTrendingGifs(limit);
    }
  }

  private getMockGifs(exerciseName: string, limit: number): GifData[] {
    const exerciseVariations = [
      'Técnica Básica',
      'Forma Avançada',
      'Variação Alternativa',
      'Execução Perfeita',
      'Dicas de Postura'
    ];

    return Array.from({ length: Math.min(limit, 5) }, (_, i) => ({
      id: `mock_${exerciseName}_${i}`,
      title: `${exerciseName} - ${exerciseVariations[i] || `Demonstração ${i + 1}`}`,
      url: `https://via.placeholder.com/300x200/8b5cf6/ffffff?text=${encodeURIComponent(exerciseName)}+${i + 1}`,
      preview: `https://via.placeholder.com/150x100/8b5cf6/ffffff?text=${encodeURIComponent(exerciseName)}+${i + 1}`,
      width: 300,
      height: 200
    }));
  }

  private getMockTrendingGifs(limit: number): GifData[] {
    const trendingExercises = [
      'Flexão', 'Agachamento', 'Prancha', 'Burpee', 'Mountain Climber',
      'Jumping Jacks', 'Polichinelo', 'Abdominal', 'Corrida', 'Yoga'
    ];

    return Array.from({ length: Math.min(limit, 10) }, (_, i) => ({
      id: `trending_${i}`,
      title: `${trendingExercises[i % trendingExercises.length]} - Treino`,
      url: `https://via.placeholder.com/200x200/8b5cf6/ffffff?text=${encodeURIComponent(trendingExercises[i % trendingExercises.length])}`,
      preview: `https://via.placeholder.com/100x100/8b5cf6/ffffff?text=${encodeURIComponent(trendingExercises[i % trendingExercises.length])}`,
      width: 200,
      height: 200
    }));
  }
}

export const gifService = new GifService();
