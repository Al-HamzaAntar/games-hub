
import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import GameGrid from '../components/GameGrid';
import { useGames, useGenres } from '../hooks/useGameData';
import { useColorModeValue } from '@chakra-ui/react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const { data: games = [], isLoading: gamesLoading, error: gamesError } = useGames(searchQuery, selectedGenre);
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
        />
      </Flex>
    </Box>
  );
};

export default Index;
