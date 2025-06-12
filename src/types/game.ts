
export interface Game {
  id: string;
  title: string;
  image: string;
  rating: number;
  platforms: Platform[];
  genre: string;
  isTargeted?: boolean;
  isRecommended?: boolean;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
}

export interface Genre {
  id: string;
  name: string;
  icon: string;
  count?: number;
}
