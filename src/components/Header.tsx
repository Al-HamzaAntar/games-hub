
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
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Search, Menu } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMobileMenuToggle?: () => void;
}

const Header = ({ searchQuery, onSearchChange, onMobileMenuToggle }: HeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.300');
  
  // Show menu button only on mobile
  const showMobileMenu = useBreakpointValue({ base: true, lg: false });

  return (
    <Box
      bg={headerBg}
      borderBottom="1px"
      borderColor={borderColor}
      px={{ base: 4, md: 6 }}
      py={4}
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex align="center" justify="space-between" width="100%">
        {/* Mobile Menu Button and Logo */}
        <HStack spacing={2}>
          {showMobileMenu && (
            <IconButton
              aria-label="Open menu"
              icon={<Menu size={20} />}
              variant="ghost"
              size="sm"
              onClick={onMobileMenuToggle}
              color={textColor}
            />
          )}
          
          <Box
            p={0}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="transparent"
            minW={{ base: "36px", md: "44px" }}
            minH={{ base: "36px", md: "44px" }}
          >
            <img
              src="/lovable-uploads/f1181a47-72bb-4da3-8279-c18e44de76b5.png"
              alt="Logo"
              style={{
                width: window.innerWidth < 768 ? 32 : 40,
                height: window.innerWidth < 768 ? 32 : 40,
                borderRadius: 12,
                objectFit: 'cover',
                background: 'white'
              }}
            />
          </Box>
        </HStack>

        {/* Search Bar fills the space between logo and dark mode toggle */}
        <InputGroup maxW="1000px" flex="1" mx={4}>
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
            fontSize={{ base: "sm", md: "md" }}
          />
        </InputGroup>

        {/* Dark Mode Toggle on the right */}
        <HStack spacing={2} minW={{ base: "auto", md: "150px" }} justify="flex-end">
          <Text 
            color={textColor} 
            fontSize="sm" 
            display={{ base: "none", md: "block" }}
          >
            Dark Mode
          </Text>
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            colorScheme="purple"
            size={{ base: "sm", md: "md" }}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
