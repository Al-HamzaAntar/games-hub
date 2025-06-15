import {
  Box,
  SimpleGrid,
  Text,
  HStack,
  VStack,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { Game } from '../types/game';
import GameCard from './GameCard';
import { Select as ShadSelect, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { Skeleton } from './ui/skeleton';

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

  // Find selected labels
  const selectedPlatformLabel = platformOptions.find(o => o.id === selectedPlatform)?.label;

  // Capitalize helper
  const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

  // For genres, just use the selectedGenre id (capitalized), since we don't have a label mapping here
  const selectedGenreLabel = selectedGenre ? capitalize(selectedGenre) : undefined;

  // Format header: Show "PC Action Games" if filtered, otherwise just "Games"
  let gridTitle = 'Games';
  if (
    (selectedPlatform && selectedPlatform !== 'all') ||
    (selectedGenre && selectedGenre !== '')
  ) {
    gridTitle = [
      selectedPlatform && selectedPlatform !== 'all' ? selectedPlatformLabel : null,
      selectedGenre && selectedGenre !== '' ? selectedGenreLabel : null,
      'Games',
    ]
      .filter(Boolean)
      .join(' ');
  }

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
            {gridTitle}
          </Text>
          <HStack spacing={4}>
            {/* Platforms Dropdown */}
            <ShadSelect value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-black border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-md hover:bg-gray-50 dark:hover:bg-gray-900">
                <SelectValue>
                  {platformOptions.find(o => o.id === selectedPlatform)?.label || 'Platforms'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-black border border-gray-300 dark:border-gray-600 shadow-2xl z-[9999] w-[220px] max-h-72 overflow-auto">
                {platformOptions.map(option => (
                  <SelectItem 
                    key={option.id} 
                    value={option.id}
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer px-3 py-2 focus:bg-gray-100 dark:focus:bg-gray-800"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadSelect>
            {/* Order By Dropdown */}
            <ShadSelect value={orderBy} onValueChange={setOrderBy}>
              <SelectTrigger className="w-[200px] bg-white dark:bg-black border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-md hover:bg-gray-50 dark:hover:bg-gray-900">
                <SelectValue>
                  {`Order by: ${orderOptions.find(opt => opt.id === orderBy)?.label || "Relevance"}`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-black border border-gray-300 dark:border-gray-600 shadow-2xl z-[9999] w-[260px] max-h-72 overflow-auto">
                {orderOptions.map(option => (
                  <SelectItem 
                    key={option.id} 
                    value={option.id}
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer px-3 py-2 focus:bg-gray-100 dark:focus:bg-gray-800"
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
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {Array.from({ length: 12 }).map((_, index) => (
              <Box 
                key={index}
                className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <Skeleton className="h-[200px] w-full bg-gray-200 dark:bg-gray-800" />
                <Box p={4} className="space-y-3">
                  <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-800" />
                  </div>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
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
