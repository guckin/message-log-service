import {Router} from 'express';

export default (app: Router) => {
    app.get('/healthCheck', (req: any, res: any, next: any) => {
        console.log('hey');
        res.status(200).send({healthCheck: 'OK'});
    });
};

