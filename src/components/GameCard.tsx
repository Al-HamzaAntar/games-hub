
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

const GameCard = ({ game }: GameCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return 'green';
    if (rating >= 80) return 'yellow';
    if (rating >= 70) return 'orange';
    return 'red';
  };

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
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      }}
      position="relative"
    >
      <Box position="relative">
        <Image
          src={game.image}
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
          color="white"
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
              bg="gray.700"
              p={1}
              borderRadius="md"
              title={platform.name}
            >
              <Text fontSize="xs">{platform.icon}</Text>
            </Box>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default GameCard;
