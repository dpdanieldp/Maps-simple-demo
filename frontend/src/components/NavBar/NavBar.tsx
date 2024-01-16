import React from 'react';
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
    Menu, MenuButton, MenuList, MenuItem, IconButton, Divider,
    useColorModeValue,
    useMediaQuery,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'
import { Outlet, useNavigate } from 'react-router-dom';
import ThemeToggler from '../Theme/ThemeToggler';

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');

    return (
        <Box minHeight="100vh">
            <Flex
                as="header"
                w="100%"
                alignItems="center"
                position="fixed"
                top="0"
                justifyContent="space-between"
                wrap="wrap"
                p={4}
                bg={useColorModeValue('blue.300', 'blue.600')}
                color="white"
                marginBottom="20px"
                zIndex={99999}
            >
                <Text as="h2" fontSize={24} fontWeight="bold" align="right">
                    Your Maps
                </Text>

                {isSmallerThan700 ? (
                    <Stack direction="row" align="center" spacing={4}>
                        <ThemeToggler size="md" alignItems="center" />
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<HamburgerIcon />}
                                variant='outline'
                            />
                            <MenuList>
                                <MenuItem >
                                    <Button onClick={() => { navigate("/") }} colorScheme="blue" variant="link" size="md">
                                        My points
                                    </Button>
                                </MenuItem>
                                <Divider />
                                <MenuItem >
                                    <Button onClick={() => { navigate("/directions") }} colorScheme="blue" variant="link" size="md">
                                        Directions
                                    </Button>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                ) : (
                    <Stack direction="row" align="center" spacing={4}>
                        <ThemeToggler size="md" alignItems="center" />
                        <Button onClick={() => { navigate("/") }} colorScheme="blue" size="sm">
                            My Points
                        </Button>
                        <Button onClick={() => { navigate("/directions") }} colorScheme="blue" size="sm">
                            Directions
                        </Button>
                    </Stack>
                )}
            </Flex>
            <Box paddingTop="60px">
                <Outlet />
            </Box>
        </Box>
    );
};

export default NavBar;
