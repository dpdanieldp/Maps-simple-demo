import express from 'express';

// import authentication from './authentication';
// import users from './users';
import mapPoints from './map-points';


const router = express.Router();

export default (): express.Router => {
    mapPoints(router);


    // Not implemented on FE:

    // authentication(router);
    // users(router);

    return router;
};