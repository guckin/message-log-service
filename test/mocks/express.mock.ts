import {mockThatReturnsThis} from './helpers';

export class RouterMock {
    get = jest.fn();
}

export class ResponseMock {
    status = mockThatReturnsThis();
    send = mockThatReturnsThis();
    redirect = mockThatReturnsThis();
}

export class RequestMock {

}
