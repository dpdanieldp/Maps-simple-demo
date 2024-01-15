import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const API_PATH = process.env.API_HOST || 'http://127.0.0.1'
const API_PORT = process.env.API_PORT || '8080'
const API_BASE_URL = `${API_PATH}:${API_PORT}`

const API_MAPPOINT_PATH = '/mappoints'

export interface Geometry {
    type: string;
    coordinates: [number, number];
}

export interface Properties {
    name: string;
    description: string;
}

export interface MapPointRequest {
    type: "Feature";
    geometry: Geometry;
    properties: Properties;
}

export interface MapPointRequest {
    type: "Feature";
    geometry: Geometry;
    properties: Properties;
}

export interface MapPointResponse extends MapPointRequest {
    _id: string;
}

const fetchMapPoints = async () => {
    const response = await axios.get(`${API_BASE_URL}${API_MAPPOINT_PATH}`);
    return response.data;
};

export const useGetMapPoints = () => {
    return useQuery<MapPointResponse[], Error>('allMapPoints', fetchMapPoints);
};


const createNewMapPoint = async (mapPoint: MapPointRequest) => {
    const response = await axios.post(`${API_BASE_URL}${API_MAPPOINT_PATH}`, mapPoint);
    return response.data;
};

export const useCreateNewMapPoint = () => {
    const queryClient = useQueryClient();

    return useMutation<MapPointResponse, Error, MapPointRequest>(
        (newMapPoint) => createNewMapPoint(newMapPoint),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('allMapPoints');
            },
        }
    );
};


const updateMapPoint = async ({ id, updatedMapPoint }: { id: string, updatedMapPoint: MapPointRequest }) => {
    const response = await axios.put(`${API_BASE_URL}${API_MAPPOINT_PATH}/${id}`, updatedMapPoint);
    return response.data;
};

export const useUpdateMapPoint = () => {
    const queryClient = useQueryClient();

    return useMutation<MapPointResponse, Error, { id: string, updatedMapPoint: MapPointRequest }>(
        ({ id, updatedMapPoint }) => updateMapPoint({ id, updatedMapPoint }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('allMapPoints');
            },
        }
    );
};


const deleteMapPoint = async (id: string) => {
    await axios.delete(`${API_BASE_URL}${API_MAPPOINT_PATH}/${id}`);
};

export const useDeleteMapPoint = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>(
        (id) => deleteMapPoint(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('allMapPoints');
            },
        }
    );
};
