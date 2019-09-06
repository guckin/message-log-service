import {mockThatReturnsThis} from './helpers';

export class RouterMock {
    get = jest.fn();
}

export class ResponseMock {
    status = mockThatReturnsThis();
    send = mockThatReturnsThis();
}

export class RequestMock {

}
