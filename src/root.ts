import {Router} from 'express';
import docs from './routes/docs.routes';

export default () => {
    const root = Router();
    docs(root);
    return root;
};
