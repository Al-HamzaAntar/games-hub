
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const headerBg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.300');
  const logoColor = useColorModeValue('purple.500', 'purple.500');

  return (
    <Box
      bg={headerBg}
      borderBottom="1px"
      borderColor={borderColor}
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex justify="space-between" align="center">
        <HStack spacing={4} flex="1">
          <Box
            bg={logoColor}
            p={2}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xl" color="white">🎮</Text>
          </Box>
          <InputGroup maxW="600px" flex="1">
            <InputLeftElement>
              <Search size={20} color="gray" />
            </InputLeftElement>
            <Input
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              bg={inputBg}
              border="none"
              _placeholder={{ color: 'gray.400' }}
              _focus={{ boxShadow: '0 0 0 2px purple.500' }}
            />
          </InputGroup>
        </HStack>
        {/* Removed the Dark Mode toggle */}
      </Flex>
    </Box>
  );
};

export default Header;
