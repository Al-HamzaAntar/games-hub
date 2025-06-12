
import {
  Box,
  SimpleGrid,
  Text,
  HStack,
  Select,
  VStack,
} from '@chakra-ui/react';
import { Game } from '../types/game';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
  selectedGenre: string;
}

const GameGrid = ({ games, selectedGenre }: GameGridProps) => {
  return (
    <Box flex={1} p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold" color="white">
            Games
          </Text>
          
          <HStack spacing={4}>
            <HStack>
              <Text color="gray.400" fontSize="sm">Platforms</Text>
              <Select
                size="sm"
                bg="gray.800"
                border="none"
                color="white"
                defaultValue="all"
              >
                <option value="all">All Platforms</option>
                <option value="pc">PC</option>
                <option value="ps">PlayStation</option>
                <option value="xbox">Xbox</option>
                <option value="switch">Nintendo Switch</option>
                <option value="mobile">Mobile</option>
              </Select>
            </HStack>
            
            <HStack>
              <Text color="gray.400" fontSize="sm">Order by:</Text>
              <Select
                size="sm"
                bg="gray.800"
                border="none"
                color="white"
                defaultValue="relevance"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="release">Release Date</option>
                <option value="popularity">Popularity</option>
              </Select>
            </HStack>
          </HStack>
        </HStack>

        {/* Games Grid */}
        {games.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </SimpleGrid>
        ) : (
          <Box
            textAlign="center"
            py={20}
            color="gray.400"
          >
            <Text fontSize="xl">No games found</Text>
            <Text>Try adjusting your search or filters</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default GameGrid;
