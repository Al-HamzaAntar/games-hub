
import {
  Box,
  VStack,
  Text,
  HStack,
  Badge,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { Genre } from '../types/game';

interface SidebarProps {
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
  genres: Genre[];
  isLoading: boolean;
}

const Sidebar = ({ selectedGenre, onGenreSelect, genres, isLoading }: SidebarProps) => {
  const sidebarBg = useColorModeValue('gray.50', 'gray.900');
  const itemHoverBg = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box
      w="280px"
      h="calc(100vh - 80px)"
      bg={sidebarBg}
      borderRight="1px"
      borderColor="gray.700"
      p={4}
      overflowY="auto"
      position="sticky"
      top="80px"
    >
      <Text fontSize="xl" fontWeight="bold" mb={6} color="gray.300">
        Genres
      </Text>
      
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={8}>
          <Spinner color="purple.500" />
        </Box>
      ) : (
        <VStack spacing={2} align="stretch">
          {genres.map((genre) => (
            <HStack
              key={genre.id}
              p={3}
              borderRadius="lg"
              cursor="pointer"
              bg={selectedGenre === genre.id ? 'purple.600' : 'transparent'}
              _hover={{ bg: selectedGenre === genre.id ? 'purple.600' : itemHoverBg }}
              onClick={() => onGenreSelect(genre.id)}
              transition="all 0.2s"
            >
              <Text fontSize="lg">{genre.icon}</Text>
              <Text
                flex={1}
                color={selectedGenre === genre.id ? 'white' : 'gray.300'}
                fontWeight={selectedGenre === genre.id ? 'semibold' : 'normal'}
              >
                {genre.name}
              </Text>
              {genre.count && genre.count > 0 && (
                <Badge
                  colorScheme={selectedGenre === genre.id ? 'purple' : 'gray'}
                  variant="subtle"
                  fontSize="xs"
                >
                  {genre.count > 1000 ? `${Math.floor(genre.count / 1000)}k` : genre.count}
                </Badge>
              )}
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Sidebar;
