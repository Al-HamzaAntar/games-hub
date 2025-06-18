
import {
  VStack,
  Text,
  HStack,
  Image,
  Box,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { Genre } from '../types/game';
import { X } from 'lucide-react';

interface MobileGenresDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
  genres: Genre[];
  isLoading: boolean;
}

const MobileGenresDrawer = ({
  isOpen,
  onClose,
  selectedGenre,
  onGenreSelect,
  genres,
  isLoading
}: MobileGenresDrawerProps) => {
  const itemHoverBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.300');
  const titleColor = useColorModeValue('gray.600', 'gray.300');

  const getGenreImage = (genre: Genre) => {
    if (genre.id && genre.name !== "All Games" && (genre as any).image_background) {
      return (genre as any).image_background;
    }
    return undefined;
  };

  const handleGenreSelect = (genreId: string) => {
    onGenreSelect(genreId);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="flex items-center justify-between border-b">
          <DrawerTitle className="text-lg font-bold">Genres</DrawerTitle>
          <DrawerClose asChild>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              <X size={20} />
            </button>
          </DrawerClose>
        </DrawerHeader>
        
        <Box p={4} overflowY="auto" flex={1}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" mt={8}>
              <Spinner color="purple.500" />
            </Box>
          ) : (
            <VStack spacing={2} align="stretch">
              {genres.map(genre => (
                <HStack
                  key={genre.id ?? genre.name}
                  p={3}
                  borderRadius="lg"
                  cursor="pointer"
                  bg={selectedGenre === genre.id ? 'purple.600' : 'transparent'}
                  _hover={{
                    bg: selectedGenre === genre.id ? 'purple.600' : itemHoverBg
                  }}
                  onClick={() => handleGenreSelect(genre.id)}
                  transition="all 0.2s"
                  spacing={3}
                >
                  {getGenreImage(genre) ? (
                    <Image
                      src={getGenreImage(genre)}
                      alt={genre.name}
                      boxSize="36px"
                      borderRadius="md"
                      objectFit="cover"
                    />
                  ) : (
                    <Box w="36px" h="36px" borderRadius="md" bg={itemHoverBg} />
                  )}
                  <Text
                    flex={1}
                    color={selectedGenre === genre.id ? 'white' : textColor}
                    fontWeight={selectedGenre === genre.id ? 'semibold' : 'normal'}
                    fontSize="lg"
                  >
                    {genre.name}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileGenresDrawer;
