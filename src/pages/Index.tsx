
import { useState, useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import GameGrid from '../components/GameGrid';
import { games } from '../data/mockData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !selectedGenre || game.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

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
        />
        
        <GameGrid 
          games={filteredGames}
          selectedGenre={selectedGenre}
        />
      </Flex>
    </Box>
  );
};

export default Index;
