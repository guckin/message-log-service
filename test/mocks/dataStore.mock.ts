export class DataStoreMock {
    returnGetValue: any[] = [];

    key = jest.fn();

    get = jest.fn(() => {
       return Promise.resolve(this.returnGetValue);
    });
}
