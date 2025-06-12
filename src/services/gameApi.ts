
const API_KEY = '0021430af2644b4397b6ab1b9916d250';
const BASE_URL = 'https://api.rawg.io/api';

export interface RawgGame {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  genres: Array<{ id: number; name: string }>;
  parent_platforms: Array<{
    platform: {
      id: number;
      name: string;
    };
  }>;
  metacritic: number;
}

export interface RawgGenre {
  id: number;
  name: string;
  games_count: number;
}

export const gameApi = {
  async getGames(search?: string, genre?: string, page: number = 1): Promise<RawgGame[]> {
    const params = new URLSearchParams({
      key: API_KEY,
      page: page.toString(),
      page_size: '20',
    });

    if (search) {
      params.append('search', search);
    }

    if (genre) {
      params.append('genres', genre);
    }

    const response = await fetch(`${BASE_URL}/games?${params}`);
    const data = await response.json();
    return data.results || [];
  },

  async getGenres(): Promise<RawgGenre[]> {
    const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
    const data = await response.json();
    return data.results || [];
  }
};
