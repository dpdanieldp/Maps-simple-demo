import express from 'express';
import mongoose from 'mongoose';
import { deleteMapPointById, getMapPoints, getMapPointById, createMapPoint } from '../db/map-points';

export const getAllMapPoints = async (req: express.Request, res: express.Response) => {
    try {
        const mapPoints = await getMapPoints();
        return res.status(200).json(mapPoints);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteMapPoint = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedMapPoint = await deleteMapPointById(id);
        return res.json(deletedMapPoint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateMapPoint = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { type, properties, geometry } = req.body;

        if (!type || !properties || !geometry) {
            return res.status(400).json({ error: 'Name, description, and geometry are required' });
        }

        const mapPoint = await getMapPointById(id);

        mapPoint.type = type;
        mapPoint.properties = properties
        mapPoint.geometry = geometry;

        // Save the updated mapPoint and handle validation errors
        try {
            await mapPoint.save();
        } catch (validationError: mongoose.Error | any) {
            if (validationError instanceof mongoose.Error.ValidationError) {
                // Handle validation errors
                return res.status(400).json({ error: 'Validation Error', details: validationError.errors });
            }
            // Handle other types of errors
            console.error(validationError);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json(mapPoint);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const createNewMapPoint = async (req: express.Request, res: express.Response) => {
    try {
        const { type, properties, geometry } = req.body;

        if (!type || !properties || !geometry) {
            return res.status(400).json({ error: 'Type, properties, and geometry are required' });
        }

        // Create a new mapPoint and handle duplicate key errors
        try {
            const mapPoint = await createMapPoint({
                type,
                properties,
                geometry
            });
            return res.status(201).json(mapPoint);
        } catch (error: mongoose.Error | any) {
            console.error(error);
            if (error.name === 'MongoServerError' && error.code === 11000) {
                // Duplicate key error (E11000)
                return res.status(400).json({ error: 'Duplicate key error', details: 'properties.name must be unique' });
            } else if (error instanceof mongoose.Error.ValidationError) {
                // Handle validation errors
                return res.status(400).json({ error: 'Validation Error', details: error.errors });
            } else {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
