import {Router} from 'express';

export default (app: Router) => {
    app.get('/healthCheck', (req: any, res: any, next: any) => {
        res.json({health: 'ok'});
    });
};

