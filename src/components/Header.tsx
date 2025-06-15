
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.300');

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
      <Flex align="center" justify="space-between" width="100%">
        {/* Logo on the left */}
        <Box
          p={0}
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr={4}
          bg="transparent"
          minW="44px"
          minH="44px"
        >
          <img
            src="/lovable-uploads/f1181a47-72bb-4da3-8279-c18e44de76b5.png"
            alt="Logo"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              objectFit: 'cover',
              background: 'white'
            }}
          />
        </Box>

        {/* Search Bar fills the space between logo and dark mode toggle */}
        <InputGroup maxW="1000px" flex="1" mx={6}>
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

        {/* Dark Mode Toggle on the right */}
        <HStack spacing={2} minW="150px" justify="flex-end">
          <Text color={textColor} fontSize="sm">Dark Mode</Text>
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            colorScheme="purple"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;

