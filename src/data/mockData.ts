
import { Game, Genre, Platform } from '../types/game';

export const platforms: Platform[] = [
  { id: 'pc', name: 'PC', icon: '💻' },
  { id: 'ps', name: 'PlayStation', icon: '🎮' },
  { id: 'xbox', name: 'Xbox', icon: '🎯' },
  { id: 'switch', name: 'Nintendo Switch', icon: '🎲' },
  { id: 'mobile', name: 'Mobile', icon: '📱' },
];

export const genres: Genre[] = [
  { id: 'action', name: 'Action', icon: '⚔️', count: 1847 },
  { id: 'indie', name: 'Indie', icon: '🎨', count: 1234 },
  { id: 'adventure', name: 'Adventure', icon: '🗺️', count: 956 },
  { id: 'rpg', name: 'RPG', icon: '🧙', count: 789 },
  { id: 'strategy', name: 'Strategy', icon: '♟️', count: 654 },
  { id: 'shooter', name: 'Shooter', icon: '🔫', count: 543 },
  { id: 'casual', name: 'Casual', icon: '🎈', count: 432 },
  { id: 'simulation', name: 'Simulation', icon: '🚁', count: 321 },
  { id: 'puzzle', name: 'Puzzle', icon: '🧩', count: 298 },
  { id: 'arcade', name: 'Arcade', icon: '🕹️', count: 267 },
  { id: 'platformer', name: 'Platformer', icon: '🏃', count: 234 },
  { id: 'racing', name: 'Racing', icon: '🏎️', count: 198 },
  { id: 'multiplayer', name: 'Massively Multiplayer', icon: '👥', count: 156 },
];

export const games: Game[] = [
  {
    id: '1',
    title: 'Grand Theft Auto V',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
    rating: 92,
    platforms: [platforms[0], platforms[1], platforms[2]],
    genre: 'action',
    isTargeted: true,
  },
  {
    id: '2',
    title: 'The Witcher 3: Wild Hunt',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop',
    rating: 92,
    platforms: [platforms[0], platforms[1], platforms[2], platforms[3]],
    genre: 'rpg',
    isTargeted: true,
    isRecommended: true,
  },
  {
    id: '3',
    title: 'Portal 2',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    rating: 95,
    platforms: [platforms[0], platforms[1], platforms[2], platforms[4]],
    genre: 'puzzle',
    isTargeted: true,
  },
  {
    id: '4',
    title: 'Counter-Strike: Global Offensive',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    rating: 81,
    platforms: [platforms[0], platforms[2], platforms[4]],
    genre: 'shooter',
    isRecommended: true,
  },
  {
    id: '5',
    title: 'Red Dead Redemption 2',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    rating: 97,
    platforms: [platforms[0], platforms[1], platforms[2]],
    genre: 'action',
  },
  {
    id: '6',
    title: 'Cyberpunk 2077',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    rating: 76,
    platforms: [platforms[0], platforms[1], platforms[2]],
    genre: 'rpg',
  },
  {
    id: '7',
    title: 'Minecraft',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop',
    rating: 93,
    platforms: [platforms[0], platforms[1], platforms[2], platforms[3], platforms[4]],
    genre: 'casual',
  },
  {
    id: '8',
    title: 'Call of Duty: Modern Warfare',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop',
    rating: 84,
    platforms: [platforms[0], platforms[1], platforms[2]],
    genre: 'shooter',
  },
];
