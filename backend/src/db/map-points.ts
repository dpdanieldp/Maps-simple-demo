import mongoose from 'mongoose';

// MapPoint Config
const mapPointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true,
        default: 'Feature',
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: (value: any) => {
                    // Validate that the coordinates are in the valid range
                    return (
                        Array.isArray(value) &&
                        value.length === 2 &&
                        typeof value[0] === 'number' &&
                        typeof value[1] === 'number' &&
                        value[0] >= -90 &&
                        value[0] <= 90 &&
                        value[1] >= -180 &&
                        value[1] <= 180
                    );
                },
                message: 'Invalid coordinates. Should be in the format [latitude, longitude].',
            },
        }
    },
    properties: {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String
        }
    },
}, { versionKey: false });

export const MapPointModel = mongoose.model('MapPoint', mapPointSchema);

// MapPoint Actions
export const getMapPoints = () => MapPointModel.find();
export const getMapPointById = (id: string) => MapPointModel.findById(id);
export const createMapPoint = (values: Record<string, any>) => new MapPointModel(values).save().then((mapPoint) => mapPoint.toObject());
export const deleteMapPointById = (id: string) => MapPointModel.findOneAndDelete({ _id: id });
export const updateMapPointById = (id: string, values: Record<string, any>) => MapPointModel.findByIdAndUpdate(id, values);