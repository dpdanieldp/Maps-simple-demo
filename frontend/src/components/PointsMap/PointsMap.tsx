import React, { useState } from 'react';
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon, divIcon, LatLngExpression, point, DivIconOptions } from 'leaflet';
import { center } from '../../const/const';
import {
    useGetMapPoints,
    useUpdateMapPoint,
    useDeleteMapPoint,
    useCreateNewMapPoint,
    MapPointResponse,
    MapPointRequest
} from '../../api/maps';
import PopupTile from '../PopupTile/PopupTile';
import {
    Box,
    Flex,
    useToast
} from '@chakra-ui/react';
import { useMapEvents } from 'react-leaflet'
import MapPointForm from '../MapPointForm/MapPointForm';


const customMarkerIcon = new Icon({
    iconUrl: require('../../assets/icons/placeholder.png'),
    iconSize: [38, 38],
});

const customNewPointIcon = new Icon({
    iconUrl: require('../../assets/icons/green-placeholder.png'),
    iconSize: [38, 38],
});

// custom cluster icon
const createClusterCustomIcon = function (cluster: any) {
    const options: DivIconOptions = {
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: 'custom-marker-cluster',
        iconSize: point(33, 33, true),
    };

    return new (divIcon as any)(options);
};



const PointsMap: React.FC = () => {
    const { data: markers, isLoading, isError, refetch } = useGetMapPoints();
    const updateMapPointMutation = useUpdateMapPoint();
    const deleteMapPointMutation = useDeleteMapPoint();
    const createNewMapPointMutation = useCreateNewMapPoint();
    const toast = useToast();
    const [newMarker, setNewMarker] = useState<LatLngExpression | null>(null);

    function MyComponent() {
        const map = useMapEvents({

            click: (event) => {
                setNewMarker([event.latlng.lat, event.latlng.lng]);
                console.log(newMarker)
            },
        });

        return null;
    }

    const handleCreateNewMapPoint = (mapPointRequest: MapPointRequest) => {
        createNewMapPointMutation.mutate(mapPointRequest, {
            onSuccess: () => {
                toast({
                    title: 'Map point created successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                refetch();
            },
            onError: (error) => {
                toast({
                    title: 'Error creating map point',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            },
        });
        setNewMarker(null);
    };

    const handleSaveButtonClick = (modifiedMapPoint: MapPointResponse) => {
        updateMapPointMutation.mutate({ id: modifiedMapPoint._id, updatedMapPoint: modifiedMapPoint }, {
            onSuccess: () => {
                toast({
                    title: 'Map point updated successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            },
            onError: (error) => {
                toast({
                    title: 'Error updating map point',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            },
        });
        setNewMarker(null);
    };

    const handleDeleteButtonClick = (mapPointId: string) => {
        deleteMapPointMutation.mutate(mapPointId, {
            onSuccess: () => {
                toast({
                    title: 'Map point deleted successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            },
            onError: (error) => {
                toast({
                    title: 'Error deleting map point',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            },
        });
        setNewMarker(null);
    };


    if (isLoading) {
        return (
            <Flex height="100vh" justify="center" align="center">
                <div>Loading...</div>
            </Flex>
        );
    }

    if (isError) {
        return (
            <Flex height="100vh" justify="center" align="center">
                <div>Error fetching map points</div>
            </Flex>
        );
    }


    if (isLoading) {
        return (<>
            <Flex height="100vh" justify="center" align="center">
                <div>Loading...</div>
            </Flex>
        </>);
    }

    if (isError) {
        return (<>
            <Flex height="100vh" justify="center" align="center">
                <div>Error fetching map points</div>
            </Flex>
        </>);
    }




    return (
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='94vh'
            w='100vw'
        >
            <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                <MapContainer center={center} zoom={13} zoomControl={false}>
                    <MyComponent />
                    {/* OPEN STREEN MAPS TILES */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
                        {/* Mapping through the markers */}
                        {markers?.map((marker, index) => (
                            <Marker key={index} position={marker.geometry.coordinates} icon={customMarkerIcon}>
                                <Popup>
                                    <PopupTile
                                        mapPoint={marker}
                                        onDeleteButtonClick={handleDeleteButtonClick}
                                        onSaveButtonClick={handleSaveButtonClick}
                                    />
                                </Popup>
                            </Marker>
                        ))}
                        {newMarker && Array.isArray(newMarker) && newMarker.length === 2 && (
                            <Marker position={newMarker} icon={customNewPointIcon} />
                        )}


                    </MarkerClusterGroup>
                    <ZoomControl position="bottomright" />
                </MapContainer>
            </Box>
            <Box
                borderRadius='lg'
                m={4}
                zIndex='900'
            >
                <MapPointForm onSubmit={handleCreateNewMapPoint} newMarker={newMarker} onClear={() => { setNewMarker(null) }} />
            </Box>
        </Flex>

    );
};

export default PointsMap;
