
import React, { useState } from 'react';
import { PopupTileProps } from './types';
import { MapPointResponse } from '../../api/maps';

import {
    Button,
    Heading,
    Input,
    CardBody,
    Card, Stack, Text, CardFooter, ButtonGroup,
    IconButton,
    Tooltip,
    Textarea,
    AlertDialog,
    AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure

} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';

const PopupTile: React.FC<PopupTileProps> = ({
    mapPoint,
    onDeleteButtonClick,
    onSaveButtonClick
}) => {
    const [editedTitle, setEditedTitle] = useState(mapPoint.properties.name);
    const [editedText, setEditedText] = useState(mapPoint.properties.description);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef() as React.RefObject<HTMLButtonElement>; // Explicitly define type
    const handleSaveButtonClick = () => {
        const modifiedMapPoint: MapPointResponse = {
            ...mapPoint,
            properties: {
                name: editedTitle,
                description: editedText
            }
        };
        onSaveButtonClick(modifiedMapPoint);
    };

    return (
        <Card maxW='sm'>
            <CardBody>
                <Stack mt='2' spacing='1'>
                    <Heading size='sm'>
                        <Input
                            aria-label='Name'
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                    </Heading>
                    <Text>
                        <Textarea
                            aria-label="Description"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter alignItems='center' justifyContent='center'>
                <ButtonGroup spacing={16}>
                    <Tooltip label="Save">
                        <IconButton
                            aria-label='Save'
                            icon={<CheckIcon />}
                            color="green"
                            size="sm"
                            onClick={handleSaveButtonClick}
                        />
                    </Tooltip>
                    <Tooltip label="Delete">
                        <IconButton
                            aria-label='Delete'
                            icon={<DeleteIcon />}
                            color="red"
                            size="sm"
                            onClick={onOpen}
                        />
                    </Tooltip>
                </ButtonGroup>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete Point
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' aria-label='Confirm-delete' onClick={() => onDeleteButtonClick(mapPoint._id)} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
};

export default PopupTile;
