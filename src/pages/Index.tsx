
import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import GameGrid from '../components/GameGrid';
import { useGames, useGenres } from '../hooks/useGameData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const { data: games = [], isLoading: gamesLoading, error: gamesError } = useGames(searchQuery, selectedGenre);
  const { data: genres = [], isLoading: genresLoading } = useGenres();

  return (
    <Box minH="100vh" bg="gray.900">
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
        />
      </Flex>
    </Box>
  );
};

export default Index;
