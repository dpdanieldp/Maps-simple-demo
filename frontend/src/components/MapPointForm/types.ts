import { LatLngExpression } from 'leaflet';
import { MapPointRequest } from '../../api/maps';

export interface MapPointFormProps {
    onSubmit: (data: MapPointRequest) => void;
    onClear: () => void;
    newMarker?: LatLngExpression | null;
}