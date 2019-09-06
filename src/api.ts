import {Router} from 'express';
import healthCheck from './routes/healthCheck';

export default () => {
    const api = Router();
    healthCheck(api);
    return api;
};
