
import { MapPointResponse, MapPointRequest } from "../../api/maps";

export interface PopupTileProps {
    mapPoint: MapPointResponse;
    onDeleteButtonClick: (mapPointId: string) => void;
    onSaveButtonClick: (modifiedMapPoint: MapPointResponse) => void;
}