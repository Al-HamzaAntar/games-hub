
import { useQuery } from '@tanstack/react-query';
import { gameApi } from '../services/gameApi';
import { transformGame, transformGenre } from '../utils/gameTransformers';
import { Game, Genre } from '../types/game';
import staticGenresData from '../data/staticGenres';

// Hardcoded genre list in exact order you want, mapping staticGenres by name.
const GENRE_ORDER_AND_LABELS = [
  { id: 'action', label: 'Action' },
  { id: 'indie', label: 'Indie' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'rpg', label: 'RPG' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'shooter', label: 'Shooter' },
  { id: 'casual', label: 'Casual' },
  { id: 'simulation', label: 'Simulator' }, // note: handle slug/case mismatch!
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
  // Use string id (like "action") for consistent filtering.
  return useQuery({
    queryKey: ['games', search, genre],
    queryFn: async () => {
      // Genre filtering will work if we supply genre as string id as in the mapping
      const rawGames = await gameApi.getGames(search, genre || undefined);
      return rawGames.map(transformGame);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      // Map staticGenresData into our normalized genre list.
      const genres: Genre[] = GENRE_ORDER_AND_LABELS.map(({ id, label }) => {
        // Try to find a genre from static for image and count
        const staticGenre = staticGenresData.find(
          (g: any) => {
            // Some static genres have "role-playing-games-rpg" for RPG,
            // we'll map by lowercased name, falling back as needed
            const slugMatch = (g.slug || '').replace(/-/g,'').toLowerCase();
            const idMatch = id.replace(/-/g,'').toLowerCase();
            return slugMatch === idMatch || (g.name || '').replace(/-/g,'').toLowerCase() === idMatch;
          }
        );
        const transformed = staticGenre ? transformGenre(staticGenre) : {
          id, name: label, icon: '🎮', count: 0,
        };
        // patch in "image_background" so sidebar can use covers
        return {
          ...transformed,
          name: label,
          image_background: staticGenre?.image_background,
        };
      });

      // Add "All Games" option at the beginning
      return [
        { id: '', name: 'All Games', icon: '🎮', count: 0 },
        ...genres
      ];
    },
    staleTime: Infinity,
  });
};
