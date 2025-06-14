

import {
  Box,
  SimpleGrid,
  Text,
  HStack,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { Game } from '../types/game';
import GameCard from './GameCard';
import { Select as ShadSelect, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';

interface GameGridProps {
  games: Game[];
  selectedGenre: string;
  isLoading?: boolean;
  error?: Error | null;
  selectedPlatform: string;
  setSelectedPlatform: (id: string) => void;
  orderBy: string;
  setOrderBy: (id: string) => void;
  platformOptions: { id: string; label: string }[];
  orderOptions: { id: string; label: string }[];
}

const GameGrid = ({
  games,
  selectedGenre,
  isLoading,
  error,
  selectedPlatform,
  setSelectedPlatform,
  orderBy,
  setOrderBy,
  platformOptions,
  orderOptions,
}: GameGridProps) => {
  const textColor = useColorModeValue('gray.800', 'white');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  
  if (error) {
    return (
      <Box flex={1} p={6}>
        <Alert status="error">
          <AlertIcon />
          Failed to load games. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Box flex={1} p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold" color={textColor}>
            Games
          </Text>
          <HStack spacing={4}>
            {/* Platforms Dropdown */}
            <ShadSelect value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                <SelectValue>
                  {platformOptions.find(o => o.id === selectedPlatform)?.label || 'Platforms'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent
                className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-2xl z-[9999] w-[220px] max-h-72 overflow-auto"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  zIndex: 9999,
                  minWidth: 180,
                  maxWidth: 260,
                  overflowY: 'auto',
                  border: '2px solid #d1d5db'
                }}
              >
                {platformOptions.map(option => (
                  <SelectItem 
                    key={option.id} 
                    value={option.id}
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer px-3 py-2"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadSelect>
            {/* Order By Dropdown */}
            <ShadSelect value={orderBy} onValueChange={setOrderBy}>
              <SelectTrigger className="w-[200px] bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                <SelectValue>
                  {`Order by: ${orderOptions.find(opt => opt.id === orderBy)?.label || "Relevance"}`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent
                className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-2xl z-[9999] w-[260px] max-h-72 overflow-auto"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  zIndex: 9999,
                  minWidth: 200,
                  maxWidth: 300,
                  overflowY: 'auto',
                  border: '2px solid #d1d5db'
                }}
              >
                {orderOptions.map(option => (
                  <SelectItem 
                    key={option.id} 
                    value={option.id}
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer px-3 py-2"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadSelect>
          </HStack>
        </HStack>
        {/* Loading State */}
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={20}>
            <Spinner size="xl" color="purple.500" />
          </Box>
        ) : (
          games.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              textAlign="center"
              py={20}
              color={labelColor}
            >
              <Text fontSize="xl">No games found</Text>
              <Text>Try adjusting your search or filters</Text>
            </Box>
          )
        )}
      </VStack>
    </Box>
  );
};

export default GameGrid;

