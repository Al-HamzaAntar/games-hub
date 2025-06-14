
import {
  Box,
  Image,
  Text,
  Badge,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Game } from '../types/game';

interface GameCardProps {
  game: Game;
}

// Platform icon mapping with sleek monochrome style
const getPlatformIcon = (platformId: string) => {
  const iconMap: Record<string, string> = {
    'pc': '⬜', // Windows-like square
    'ps': '🔳', // PlayStation symbol approximation
    'ps4': '🔳',
    'ps5': '🔳',
    'xbox': '⬛', // Xbox symbol approximation
    'switch': '🔲', // Nintendo symbol approximation
    'mobile': '📱', // Mobile/iOS/Android
  };
  return iconMap[platformId] || '🎮';
};

const GameCard = ({ game }: GameCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const shadowColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)');

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return 'green';
    if (rating >= 80) return 'yellow';
    if (rating >= 70) return 'orange';
    return 'red';
  };

  // Determine which image to show: game's image or placeholder if missing
  const displayImage = game.image && !game.image.includes('unsplash.com/photo-1542751371-adc38448a05e')
    ? game.image
    : '/lovable-uploads/c98b932a-2df8-4fa7-a833-b57a5955c277.png';

  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-4px)',
        bg: cardHoverBg,
        boxShadow: `0 10px 25px ${shadowColor}`,
      }}
      position="relative"
      border="1px"
      borderColor={useColorModeValue('gray.200', 'transparent')}
    >
      <Box position="relative">
        <Image
          src={displayImage}
          alt={game.title}
          w="100%"
          h="200px"
          objectFit="cover"
        />
        
        {/* Rating Badge */}
        <Badge
          position="absolute"
          top={3}
          right={3}
          colorScheme={getRatingColor(game.rating)}
          fontSize="sm"
          fontWeight="bold"
          px={2}
          py={1}
          borderRadius="md"
        >
          {game.rating}
        </Badge>

        {/* Target and Recommendation Badges */}
        {(game.isTargeted || game.isRecommended) && (
          <HStack position="absolute" bottom={3} left={3} spacing={1}>
            {game.isTargeted && (
              <Box bg="red.500" p={1} borderRadius="full">
                <Text fontSize="xs" color="white">🎯</Text>
              </Box>
            )}
            {game.isRecommended && (
              <Box bg="orange.500" p={1} borderRadius="full">
                <Text fontSize="xs" color="white">👍</Text>
              </Box>
            )}
          </HStack>
        )}
      </Box>

      <VStack p={4} align="start" spacing={3}>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={textColor}
          noOfLines={2}
          minH="3rem"
        >
          {game.title}
        </Text>

        {/* Platform Icons */}
        <HStack spacing={2} flexWrap="wrap">
          {game.platforms.map((platform) => (
            <Box
              key={platform.id}
              bg={useColorModeValue('gray.200', 'gray.600')}
              color={useColorModeValue('gray.700', 'gray.300')}
              p={2}
              borderRadius="md"
              title={platform.name}
              minW="32px"
              minH="32px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="sm" fontWeight="bold">
                {getPlatformIcon(platform.id)}
              </Text>
            </Box>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default GameCard;
