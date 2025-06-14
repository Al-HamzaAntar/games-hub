
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

const Index = () => {
  // default platform is 'all', not '', same for initial state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [orderBy, setOrderBy] = useState('relevance');

  // pass platform as undefined if 'all'
  const platformFilter = selectedPlatform === 'all' ? undefined : selectedPlatform;
  const { data: games = [], isLoading: gamesLoading, error: gamesError } = useGames(searchQuery, selectedGenre, platformFilter, orderBy);
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
