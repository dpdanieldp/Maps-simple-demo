import {
    Box,
    Flex,
    SkeletonText
} from '@chakra-ui/react';
import { center } from '../../const/const';

import {
    useJsApiLoader,
    GoogleMap,
    // Marker,
    DirectionsRenderer,
} from '@react-google-maps/api';
import DirectionsFormBox from '../DirectionsFormBox/DirectionsFormBox';
import { useRef, useState } from 'react';


function DirectionsMap(): JSX.Element {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
        libraries: ['places'],
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [mapKey, setMapKey] = useState<number>(0);

    const originRef = useRef<HTMLInputElement>(null);
    const destinationRef = useRef<HTMLInputElement>(null);


    if (!isLoaded) {
        return <SkeletonText />;
    }

    async function calculateRoute() {
        if (!originRef.current || !destinationRef.current || originRef.current.value === '' || destinationRef.current.value === '') {
            return;
        }

        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING,
        });

        // Add type assertions to indicate that certain properties are not null/undefined.
        setDirectionsResponse(results!);

        if (results && results.routes && results.routes.length > 0 && results.routes[0].legs && results.routes[0].legs.length > 0) {
            setDistance(results.routes[0].legs[0].distance!.text!);
            setDuration(results.routes[0].legs[0].duration!.text!);
        } else {
            // Handle the case where the response does not contain valid routes or legs.
            console.error("Invalid response format:", results);
        }
    }

    function clearRoute() {
        setDirectionsResponse(null);
        setDistance('');
        setDuration('');
        if (originRef.current) originRef.current.value = '';
        if (destinationRef.current) destinationRef.current.value = '';
        setMapKey(prevKey => prevKey + 1);
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
                {/* Google Map Box */}
                <GoogleMap
                    center={center}
                    key={mapKey}
                    zoom={13}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: true,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    {directionsResponse && (
                        <>
                            {/* <Marker position={center} /> */}
                            <DirectionsRenderer directions={directionsResponse} />
                        </>)}
                </GoogleMap>
            </Box>
            <DirectionsFormBox
                originRef={originRef}
                destinationRef={destinationRef}
                distance={distance}
                duration={duration}
                calculateRoute={calculateRoute}
                clearRoute={clearRoute}
                map={map}
                center={center}
            />

        </Flex >
    );
}

export default DirectionsMap;
