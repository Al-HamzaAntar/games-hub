
import { useQuery } from '@tanstack/react-query';
import { gameApi } from '../services/gameApi';
import { transformGame, transformGenre } from '../utils/gameTransformers';
import { Game, Genre } from '../types/game';
import staticGenresData from '../data/staticGenres';

export const useGames = (search?: string, genre?: string) => {
  return useQuery({
    queryKey: ['games', search, genre],
    queryFn: async () => {
      const rawGames = await gameApi.getGames(search, genre);
      return rawGames.map(transformGame);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      // Use all static data instead of limiting to 8
      const transformedGenres = staticGenresData.map(transformGenre);
      
      // Add "All Games" option at the beginning
      return [
        { id: '', name: 'All Games', icon: '🎮', count: 0 },
        ...transformedGenres
      ];
    },
    staleTime: Infinity, // Never refetch since it's static data
  });
};
