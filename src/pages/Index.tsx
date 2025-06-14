import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import GameGrid from '../components/GameGrid';
import { useGames, useGenres } from '../hooks/useGameData';
import { useColorModeValue } from '@chakra-ui/react';

const platformOptions = [
  { id: 'all', label: 'All Platforms' },
  { id: 'pc', label: 'PC' },
  { id: 'playstation', label: 'PlayStation' },
  { id: 'xbox', label: 'Xbox' },
  { id: 'ios', label: 'iOS' },
  { id: 'android', label: 'Android' },
  { id: 'mac', label: 'Apple Macintosh' },
  { id: 'linux', label: 'Linux' },
  { id: 'nintendo', label: 'Nintendo' },
  { id: 'atari', label: 'Atari' },
  { id: 'commodore-amiga', label: 'Commodore / Amiga' },
  { id: 'sega', label: 'SEGA' },
  { id: '3do', label: '3DO' },
  { id: 'neo-geo', label: 'Neo Geo' },
  { id: 'web', label: 'Web' }
];

const orderOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'added', label: 'Date added' },
  { id: 'name', label: 'Name' },
  { id: 'released', label: 'Release date' },
  { id: 'popularity', label: 'Popularity' },
  { id: 'rating', label: 'Average rating' }
];

// Map platform strings to RAWG platform numeric IDs
const platformIdMap: Record<string, number | undefined> = {
  'pc': 4,
  'playstation': 18,      // PlayStation 4 for most games; could use 187 for PS5 if desired
  'xbox': 1,              // Xbox One main ID is 1 for RAWG; could use more specific if desired
  'ios': 3,
  'android': 21,
  'mac': 5,
  'linux': 6,
  'nintendo': 7,          // Nintendo Switch: 7
  'atari': 28,
  'commodore-amiga': 166,
  'sega': 167,
  '3do': 111,
  'neo-geo': 12,
  'web': 171,
};

const Index = () => {
  // default platform is 'all', not '', same for initial state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [orderBy, setOrderBy] = useState('relevance');

  // Map selectedPlatform string to platform ID for API, or undefined for "all"
  const platformFilter = selectedPlatform === 'all' ? undefined : platformIdMap[selectedPlatform];
  const { data: games = [], isLoading: gamesLoading, error: gamesError } = useGames(
    searchQuery,
    selectedGenre,
    platformFilter ? String(platformFilter) : undefined, // Ensure ID is a string or undefined
    orderBy
  );
  const { data: genres = [], isLoading: genresLoading } = useGenres();

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      <Flex>
        <Sidebar 
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
          genres={genres}
          isLoading={genresLoading}
        />

        <GameGrid 
          games={games}
          selectedGenre={selectedGenre}
          isLoading={gamesLoading}
          error={gamesError}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          platformOptions={platformOptions}
          orderOptions={orderOptions}
        />
      </Flex>
    </Box>
  );
};

export default Index;
