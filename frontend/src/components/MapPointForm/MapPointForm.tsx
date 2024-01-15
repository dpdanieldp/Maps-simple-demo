import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    FormControl,
    Input,
    Button,
    Stack,
    useColorModeValue,
    Tooltip,
    IconButton
} from '@chakra-ui/react';
import { NotAllowedIcon } from '@chakra-ui/icons';
import { MapPointRequest } from '../../api/maps';

import { MapPointFormProps } from './types';


const MapPointForm: React.FC<MapPointFormProps> = ({ onSubmit, onClear, newMarker }) => {
    const [formState, setFormState] = useState({
        latitude: NaN,
        longitude: NaN,
        name: '',
        description: '',
    });

    useEffect(() => {
        if (newMarker && Array.isArray(newMarker) && newMarker.length === 2) {
            setFormState((prevState) => ({
                ...prevState,
                latitude: newMarker[0],
                longitude: newMarker[1],
            }));
        }
    }, [newMarker]);

    const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, latitude: parseFloat(e.target.value) || 0 });
    };

    const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, longitude: parseFloat(e.target.value) || 0 });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, name: e.target.value });
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormState({ ...formState, description: e.target.value });
    };

    const isButtonDisabled = !(!Number.isNaN(formState.latitude) && !Number.isNaN(formState.longitude) && formState.name !== '');

    const handleSubmit = () => {
        const mapPointRequest: MapPointRequest = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [formState.latitude, formState.longitude]
            },
            properties: {
                name: formState.name,
                description: formState.description
            }
        };
        onSubmit(mapPointRequest);
        // Reset the form
        setFormState({
            latitude: NaN,
            longitude: NaN,
            name: '',
            description: '',
        });
    };
    const handleClear = () => {
        onClear();
        setFormState({
            latitude: NaN,
            longitude: NaN,
            name: '',
            description: '',
        });
    }

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" background={useColorModeValue('gray.100', 'gray.700')} maxWidth={400}>
            <Flex direction="column" alignItems="center" >
                <Stack spacing={1} mb={1} direction={"row"}>
                    <FormControl isRequired>

                        {/* <FormLabel fontSize='sm'>Latitude</FormLabel> */}
                        <Tooltip label='Latitude: Click on the map to enter the coordinates'>
                            <Input
                                placeholder='Latitude'
                                type="number"
                                value={formState.latitude}
                                onChange={handleLatitudeChange}
                                size='sm'
                            />
                        </Tooltip>
                    </FormControl>
                    <FormControl isRequired>
                        {/* <FormLabel fontSize='sm'>Longitude</FormLabel> */}
                        <Tooltip label='Longitude: Click on the map to enter the coordinates'>
                            <Input
                                type="number"
                                placeholder='Longitude'
                                value={formState.longitude}
                                onChange={handleLongitudeChange}
                                size='sm'
                            />
                        </Tooltip>
                    </FormControl>
                </Stack>
                <Stack spacing={1} mb={4} direction={"row"}>
                    <FormControl isRequired>
                        {/* <FormLabel fontSize='sm'>Name</FormLabel> */}
                        <Tooltip label='Name has to be unique'>
                            <Input type="text" value={formState.name} onChange={handleNameChange} size='sm' placeholder='Name*' />
                        </Tooltip>
                    </FormControl>
                    <FormControl>
                        {/* <FormLabel fontSize='sm'>Description</FormLabel> */}
                        <Input type="text"
                            value={formState.description}
                            onChange={handleDescriptionChange}
                            placeholder='Description'
                            size='sm'
                        />
                    </FormControl>

                </Stack>
                <Stack spacing={40} mb={1} direction={"row"}>
                    <Button colorScheme="blue" onClick={handleSubmit} size="sm" isDisabled={isButtonDisabled}>
                        Create New Point
                    </Button>
                    <Tooltip label='Clear'>
                        <IconButton
                            aria-label='Clear'
                            icon={<NotAllowedIcon />}
                            color="black"
                            isRound
                            size="sm"
                            onClick={handleClear}
                        />
                    </Tooltip>
                </Stack>
            </Flex>
        </Box >
    );
};

export default MapPointForm;
