import { Box, VStack, Text, HStack, Badge, useColorModeValue, Spinner, Image } from '@chakra-ui/react';
import { Genre } from '../types/game';
interface SidebarProps {
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
  genres: Genre[];
  isLoading: boolean;
}
const Sidebar = ({
  selectedGenre,
  onGenreSelect,
  genres,
  isLoading
}: SidebarProps) => {
  const sidebarBg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const itemHoverBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.300');
  const titleColor = useColorModeValue('gray.600', 'gray.300');
  const getGenreImage = (genre: Genre) => {
    if (genre.id && genre.name !== "All Games" && (genre as any).image_background) {
      return (genre as any).image_background;
    }
    return undefined;
  };
  return <Box w="280px" h="calc(100vh - 80px)" bg={sidebarBg} borderRight="1px" borderColor={borderColor} p={4} overflowY="auto" position="sticky" top="80px">
      <Text fontSize="xl" fontWeight="bold" mb={6} color={titleColor}>
        Genres
      </Text>
      {isLoading ? <Box display="flex" justifyContent="center" mt={8}>
          <Spinner color="purple.500" />
        </Box> : <VStack spacing={2} align="stretch">
          {genres.map(genre => <HStack key={genre.id ?? genre.name} p={3} borderRadius="lg" cursor="pointer" bg={selectedGenre === genre.id ? 'purple.600' : 'transparent'} _hover={{
        bg: selectedGenre === genre.id ? 'purple.600' : itemHoverBg
      }} onClick={() => onGenreSelect(genre.id)} transition="all 0.2s" spacing={3}>
              {getGenreImage(genre) ? <Image src={getGenreImage(genre)} alt={genre.name} boxSize="36px" borderRadius="md" objectFit="cover" /> : <Box w="36px" h="36px" borderRadius="md" bg={itemHoverBg} />}
              <Text flex={1} color={selectedGenre === genre.id ? 'white' : textColor} fontWeight={selectedGenre === genre.id ? 'semibold' : 'normal'} fontSize="lg">
                {genre.name}
              </Text>
              {genre.count && genre.count > 0}
            </HStack>)}
        </VStack>}
    </Box>;
};
export default Sidebar;