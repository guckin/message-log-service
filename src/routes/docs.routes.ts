import {Router} from 'express';
import config from '../config';

export default (app: Router) => {
    app.get('/docs', (req: any, res: any, next: any) => {
        res.status(301).redirect(config.docsUrl);
    });
};
