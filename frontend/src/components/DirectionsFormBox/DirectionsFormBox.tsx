
import React from 'react';
import {
    Box,
    HStack,
    Input,
    Text,
    Button,
    IconButton,
    ButtonGroup,
    useColorModeValue
} from '@chakra-ui/react';
import {
    Autocomplete,
} from '@react-google-maps/api';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';

interface DirectionsFormBoxProps {
    originRef: React.RefObject<HTMLInputElement>;
    destinationRef: React.RefObject<HTMLInputElement>;
    distance: string;
    duration: string;
    calculateRoute: () => void;
    clearRoute: () => void;
    map: google.maps.Map | null;
    center: { lat: number; lng: number };
}

const DirectionsFormBox: React.FC<DirectionsFormBoxProps> = ({
    originRef,
    destinationRef,
    distance,
    duration,
    calculateRoute,
    clearRoute,
    map,
    center,
}) => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');

    return (
        <Box p={4} borderRadius='lg' m={4} background={bgColor} zIndex='1'>
            <HStack spacing={2} justifyContent='space-between'>
                <Box flexGrow={1}>
                    <Autocomplete>
                        <Input type='text' placeholder='Origin' ref={originRef} size='sm' />
                    </Autocomplete>
                </Box>
                <Box flexGrow={1}>
                    <Autocomplete>
                        <Input
                            type='text'
                            placeholder='Destination'
                            ref={destinationRef}
                            size='sm'
                        />
                    </Autocomplete>
                </Box>
            </HStack>
            {distance && duration && (
                <HStack spacing={2} mt={2} justifyContent='space-between'>
                    <Text fontSize='sm'>Distance: {distance} </Text>
                    <Text fontSize='sm'>Duration: {duration} </Text>
                </HStack>
            )}
            <HStack spacing={2} mt={2} justifyContent='space-between'>
                <Button
                    colorScheme='blue'
                    type='submit'
                    onClick={calculateRoute}
                    size='sm'
                >
                    Calculate Route
                </Button>
                <ButtonGroup alignContent='center'>
                    <IconButton
                        aria-label='center back'
                        icon={<FaLocationArrow />}
                        isRound
                        size='sm'
                        onClick={() => {
                            if (map) {
                                map.panTo(center);
                                map.setZoom(13);
                            }
                        }}
                    />
                    <IconButton
                        aria-label='center back'
                        icon={<FaTimes />}
                        size='sm'
                        onClick={clearRoute}
                    />
                </ButtonGroup>
            </HStack>
        </Box>
    );
};

export default DirectionsFormBox;
