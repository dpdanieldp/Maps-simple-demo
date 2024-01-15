import express from 'express';

import { getAllMapPoints, createNewMapPoint, updateMapPoint, deleteMapPoint } from '../controllers/map-points';

const mapPointPrefix = '/mappoints'

export default (router: express.Router) => {
    router.get(mapPointPrefix, getAllMapPoints)
    router.post(mapPointPrefix, createNewMapPoint);
    router.put(`${mapPointPrefix}/:id`, updateMapPoint);
    router.delete(`${mapPointPrefix}/:id`, deleteMapPoint);
};