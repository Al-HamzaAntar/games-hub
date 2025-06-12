
import { Game, Genre, Platform } from '../types/game';
import { RawgGame, RawgGenre } from '../services/gameApi';

const platformMapping: Record<string, Platform> = {
  'PC': { id: 'pc', name: 'PC', icon: '💻' },
  'PlayStation': { id: 'ps', name: 'PlayStation', icon: '🎮' },
  'PlayStation 4': { id: 'ps4', name: 'PlayStation 4', icon: '🎮' },
  'PlayStation 5': { id: 'ps5', name: 'PlayStation 5', icon: '🎮' },
  'Xbox': { id: 'xbox', name: 'Xbox', icon: '🎯' },
  'Xbox One': { id: 'xbox', name: 'Xbox One', icon: '🎯' },
  'Xbox Series S/X': { id: 'xbox', name: 'Xbox Series S/X', icon: '🎯' },
  'Nintendo Switch': { id: 'switch', name: 'Nintendo Switch', icon: '🎮' },
  'iOS': { id: 'mobile', name: 'Mobile', icon: '📱' },
  'Android': { id: 'mobile', name: 'Mobile', icon: '📱' },
};

const genreMapping: Record<string, { icon: string; id: string }> = {
  'Action': { icon: '⚔️', id: 'action' },
  'Adventure': { icon: '🗺️', id: 'adventure' },
  'RPG': { icon: '🗡️', id: 'rpg' },
  'Role-playing (RPG)': { icon: '🗡️', id: 'rpg' },
  'Shooter': { icon: '🔫', id: 'shooter' },
  'Strategy': { icon: '♟️', id: 'strategy' },
  'Sports': { icon: '⚽', id: 'sports' },
  'Racing': { icon: '🏎️', id: 'racing' },
  'Simulation': { icon: '🏗️', id: 'simulation' },
  'Indie': { icon: '🎨', id: 'indie' },
  'Casual': { icon: '🎯', id: 'casual' },
};

export const transformGame = (rawgGame: RawgGame): Game => {
  const platforms: Platform[] = rawgGame.parent_platforms
    ?.map(p => platformMapping[p.platform.name])
    .filter(Boolean) || [];

  const primaryGenre = rawgGame.genres?.[0]?.name || 'action';
  const genreId = genreMapping[primaryGenre]?.id || 'action';

  return {
    id: rawgGame.id.toString(),
    title: rawgGame.name,
    image: rawgGame.background_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
    rating: Math.round((rawgGame.metacritic || rawgGame.rating * 20)),
    genre: genreId,
    platforms: platforms.slice(0, 4), // Limit to 4 platforms for UI
    isTargeted: Math.random() > 0.7, // Random for demo
    isRecommended: rawgGame.rating > 4.0,
  };
};

export const transformGenre = (rawgGenre: RawgGenre): Genre => {
  const mapping = genreMapping[rawgGenre.name] || { icon: '🎮', id: rawgGenre.name.toLowerCase() };
  
  return {
    id: mapping.id,
    name: rawgGenre.name,
    icon: mapping.icon,
    count: rawgGenre.games_count,
  };
};
