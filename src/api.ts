import {Router} from 'express';
import healthCheck from './routes/healthCheck.routes';

export default () => {
    const api = Router();
    healthCheck(api);
    return api;
};
