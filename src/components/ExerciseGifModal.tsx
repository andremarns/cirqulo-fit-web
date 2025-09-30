"use client";

import { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Loader2 } from 'lucide-react';
import { gifService, GifData } from '@/services/gifService';
import { motion, AnimatePresence } from 'framer-motion';

interface ExerciseGifModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
}

export function ExerciseGifModal({ isOpen, onClose, exerciseName }: ExerciseGifModalProps) {
  const [gifs, setGifs] = useState<GifData[]>([]);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isOpen && exerciseName) {
      loadGifs();
    }
  }, [isOpen, exerciseName]);

  const loadGifs = async () => {
    setIsLoading(true);
    try {
      const gifData = await gifService.searchExerciseGifs(exerciseName, 5);
      setGifs(gifData);
      setCurrentGifIndex(0);
    } catch (error) {
      console.error('Erro ao carregar GIFs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextGif = () => {
    setCurrentGifIndex((prev) => (prev + 1) % gifs.length);
  };

  const prevGif = () => {
    setCurrentGifIndex((prev) => (prev - 1 + gifs.length) % gifs.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) return null;

  const currentGif = gifs[currentGifIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Como executar: {exerciseName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {gifs.length} demonstrações disponíveis
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Carregando demonstrações...</p>
                </div>
              </div>
            ) : gifs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhuma demonstração encontrada para "{exerciseName}"
                </p>
                <button
                  onClick={loadGifs}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* GIF Display */}
                <div className="relative bg-muted rounded-lg overflow-hidden">
                  <img
                    src={currentGif?.url}
                    alt={currentGif?.title}
                    className={`w-full h-64 object-cover ${isPlaying ? 'animate-pulse' : ''}`}
                  />
                  
                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </motion.button>
                  </div>

                  {/* GIF Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h4 className="text-white font-semibold">{currentGif?.title}</h4>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={prevGif}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </motion.button>
                    
                    <span className="text-sm text-muted-foreground">
                      {currentGifIndex + 1} de {gifs.length}
                    </span>
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={nextGif}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 rotate-180" />
                    </motion.button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={loadGifs}
                      className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
                    >
                      Atualizar
                    </button>
                  </div>
                </div>

                {/* GIF Thumbnails */}
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {gifs.map((gif, index) => (
                    <motion.button
                      key={gif.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentGifIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentGifIndex
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={gif.preview}
                        alt={gif.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
