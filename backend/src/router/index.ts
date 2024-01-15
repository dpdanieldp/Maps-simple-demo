import express from 'express';

import authentication from './authentication';
import users from './users';
import mapPoints from './map-points';


const router = express.Router();

export default (): express.Router => {
    mapPoints(router);

    authentication(router);
    users(router);

    return router;
};