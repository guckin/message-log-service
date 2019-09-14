import {GCloudDataStoreService} from '../../../src/services/dataStore.service';
import {Datastore, PathType} from '@google-cloud/datastore';
jest.mock('@google-cloud/datastore');

describe(GCloudDataStoreService, () => {

    let dataStoreService: GCloudDataStoreService;
    let dataStore: Datastore;

    beforeEach(() => {
        dataStore = new Datastore();
        dataStoreService = new GCloudDataStoreService(dataStore);
    });


    it('gets an item from the data store', async () => {
        setDataStoreReturnValue({some: 'data'});
        const data = await dataStoreService.getItem(['Room', 'MyRoom', 'Message', 1]);
        expectKeyPassedToBe(['Room', 'MyRoom', 'Message', 1]);

        expect(data).toEqual({some: 'data'});
    });


    function setDataStoreReturnValue(value: any) {
        replaceObjectMethodReturnValue(dataStore, 'get', value);
    }

    function expectKeyPassedToBe(key: PathType[]) {
        expect(dataStore.key).toBeCalledWith(key);
    }

    function replaceObjectMethodReturnValue(object: any, method: string, value: any) {
        object[method] = jest.fn().mockReturnValue(value);
    }

    function replaceObjectMethodWithMock(object: any, method: string) {
        object[method] = jest.fn();
    }
});
