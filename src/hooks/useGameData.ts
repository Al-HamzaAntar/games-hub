
import { useQuery } from '@tanstack/react-query';
import { gameApi } from '../services/gameApi';
import { transformGame, transformGenre } from '../utils/gameTransformers';
import { Game, Genre } from '../types/game';
import staticGenresData from '../data/staticGenres';

// 19 genres, in your required order & naming
const GENRE_ORDER_AND_LABELS = [
  { id: 'action', label: 'Action' },
  { id: 'indie', label: 'Indie' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'rpg', label: 'RPG' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'shooter', label: 'Shooter' },
  { id: 'casual', label: 'Casual' },
  { id: 'simulation', label: 'Simulation' }, // note spelling!
  { id: 'puzzle', label: 'Puzzle' },
  { id: 'arcade', label: 'Arcade' },
  { id: 'platformer', label: 'Platformer' },
  { id: 'racing', label: 'Racing' },
  { id: 'massively-multiplayer', label: 'Massively Multiplayer' },
  { id: 'sports', label: 'Sports' },
  { id: 'fighting', label: 'Fighting' },
  { id: 'family', label: 'Family' },
  { id: 'board-games', label: 'Board Games' },
  { id: 'educational', label: 'Educational' },
  { id: 'card', label: 'Card' },
];

export const useGames = (search?: string, genre?: string) => {
  return useQuery({
    queryKey: ['games', search, genre],
    queryFn: async () => {
      const rawGames = await gameApi.getGames(search, genre || undefined);
      return rawGames.map(transformGame);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      // Map the static data so that every required genre appears in the correct order
      const genres: Genre[] = GENRE_ORDER_AND_LABELS.map(({ id, label }) => {
        // Find a genre whose name matches label, case-insensitive
        const staticGenre = staticGenresData.find(
          (g: any) => (g.name || '').toLowerCase() === (label.toLowerCase())
        );
        // Use staticGenre's image/count if found, else fallback
        if (staticGenre) {
          // Use transformer for icons/count, but patch image_background through
          const transformed = transformGenre(staticGenre, id, label);
          return {
            ...transformed,
            name: label,
            image_background: staticGenre.image_background,
          };
        } else {
          // No static genre data, fallback to generic
          return {
            id,
            name: label,
            icon: '🎮',
            count: 0,
          };
        }
      });

      // Add "All Games" at the top for user convenience
      return [{ id: '', name: 'All Games', icon: '🎮', count: 0 }, ...genres];
    },
    staleTime: Infinity,
  });
};

