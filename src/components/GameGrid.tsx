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
              <SelectTrigger className="w-[170px] bg-muted">
                <SelectValue>
                  {platformOptions.find(o => o.id === selectedPlatform)?.label || 'Platforms'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-background z-[105]">
                {platformOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadSelect>
            {/* Order By Dropdown */}
            <ShadSelect value={orderBy} onValueChange={setOrderBy}>
              <SelectTrigger className="w-[190px] bg-muted">
                <SelectValue>
                  {`Order by: ${orderOptions.find(opt => opt.id === orderBy)?.label || "Relevance"}`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-background z-[105]">
                {orderOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
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
