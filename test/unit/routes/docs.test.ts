import docs from '../../../src/routes/docs.routes';
import config from '../../../src/config';
import {Handler, Response, Request, Router} from 'express';
import {RequestMock, ResponseMock, RouterMock} from '../../mocks/express.mock';

describe('/docs', () => {
    let mockRouter: Router;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        jest.resetAllMocks();
        mockRouter = new RouterMock() as any;
        req = new RequestMock() as any;
        res = new ResponseMock() as any;
    });

    it('responds with a 301 status', () => {
        registerDocs();
        expectResponseStatusEquals(301);
    });

    it(`redirects to ${config.docsUrl}`, () => {
        registerDocs();
        expectRedirectToUrl(config.docsUrl);
    });

    function registerDocs() {
        docs(mockRouter);
    }

    function expectResponseStatusEquals(status: number) {
        const handlerFunction = getRouteHandlerFor('get', '/docs');
        handlerFunction(req, res, null);
        expect(res.status).toBeCalledWith(status);
    }

    function expectRedirectToUrl(url: string) {
        const handlerFunction = getRouteHandlerFor('get', '/docs');
        handlerFunction(req, res, null);
        expect(res.redirect).toBeCalledWith(url);
    }

    function getRouteHandlerFor(verb: string, route: string): Handler {
        const callsForVerb = (mockRouter as any)[verb].mock.calls;
        const verbMapping = new Map<string, Handler>(callsForVerb);
        return verbMapping.get(route);
    }
});
