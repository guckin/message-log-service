import healthCheck from '../../../src/routes/healthCheck.routes';
import {Handler, Response, Request, Router} from 'express';
import {RequestMock, ResponseMock, RouterMock} from '../../mocks/express.mock';

describe('/healthCheck', () => {
    let mockRouter: Router;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        jest.resetAllMocks();
        mockRouter = new RouterMock() as any;
        req = new RequestMock() as any;
        res = new ResponseMock() as any;
    });

    it('return a 200 response code', () => {
        registerHealthCheck();
        expectResponseStatusEquals(200);
    });


    it('Its body contains a health status', () => {
        registerHealthCheck();
        expectResponseBodyToEqual(200);
    });

    function registerHealthCheck() {
        healthCheck(mockRouter);
    }

    function expectResponseBodyToEqual(number: number) {
        const handlerFunction = getRouteHandlerFor('get', '/healthCheck');
        handlerFunction(req, res, null);
        expect(res.send).toBeCalledWith({healthCheck: 'OK'});
    }

    function getRouteHandlerFor(verb: string, route: string): Handler {
        const callsForVerb = (mockRouter as any)[verb].mock.calls;
        const verbMapping = new Map<string, Handler>(callsForVerb);
        return verbMapping.get(route);
    }

    function expectResponseStatusEquals(status: number) {
        const handlerFunction = getRouteHandlerFor('get', '/healthCheck');
        handlerFunction(req, res, null);
        expect(res.status).toBeCalledWith(status);
    }
});
