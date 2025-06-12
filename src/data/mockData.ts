
export const games = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
    rating: 85,
    genre: 'rpg',
    platforms: [
      { id: 'pc', name: 'PC', icon: '💻' },
      { id: 'ps5', name: 'PlayStation 5', icon: '🎮' },
      { id: 'xbox', name: 'Xbox', icon: '🎯' }
    ],
    isTargeted: true,
    isRecommended: false
  },
  {
    id: '2',
    title: 'The Witcher 3',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop',
    rating: 95,
    genre: 'rpg',
    platforms: [
      { id: 'pc', name: 'PC', icon: '💻' },
      { id: 'switch', name: 'Nintendo Switch', icon: '🎮' }
    ],
    isTargeted: false,
    isRecommended: true
  },
  {
    id: '3',
    title: 'Call of Duty: Modern Warfare',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=200&fit=crop',
    rating: 78,
    genre: 'shooter',
    platforms: [
      { id: 'pc', name: 'PC', icon: '💻' },
      { id: 'ps5', name: 'PlayStation 5', icon: '🎮' },
      { id: 'xbox', name: 'Xbox', icon: '🎯' }
    ],
    isTargeted: false,
    isRecommended: false
  },
  {
    id: '4',
    title: 'Minecraft',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=200&fit=crop',
    rating: 92,
    genre: 'sandbox',
    platforms: [
      { id: 'pc', name: 'PC', icon: '💻' },
      { id: 'mobile', name: 'Mobile', icon: '📱' },
      { id: 'switch', name: 'Nintendo Switch', icon: '🎮' }
    ],
    isTargeted: true,
    isRecommended: true
  },
  {
    id: '5',
    title: 'Grand Theft Auto V',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
    rating: 88,
    genre: 'action',
    platforms: [
      { id: 'pc', name: 'PC', icon: '💻' },
      { id: 'ps5', name: 'PlayStation 5', icon: '🎮' },
      { id: 'xbox', name: 'Xbox', icon: '🎯' }
    ],
    isTargeted: false,
    isRecommended: false
  },
  {
    id: '6',
    title: 'Valorant',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
    rating: 82,
    genre: 'shooter',
    platforms: [
      { id: 'pc', name: 'PC', icon: '💻' }
    ],
    isTargeted: false,
    isRecommended: true
  }
];

export const genres = [
  { id: '', name: 'All Games', icon: '🎮', count: 6 },
  { id: 'action', name: 'Action', icon: '⚔️', count: 1 },
  { id: 'rpg', name: 'RPG', icon: '🗡️', count: 2 },
  { id: 'shooter', name: 'Shooter', icon: '🔫', count: 2 },
  { id: 'sandbox', name: 'Sandbox', icon: '🏗️', count: 1 },
  { id: 'sports', name: 'Sports', icon: '⚽', count: 0 },
  { id: 'racing', name: 'Racing', icon: '🏎️', count: 0 },
  { id: 'strategy', name: 'Strategy', icon: '♟️', count: 0 }
];
