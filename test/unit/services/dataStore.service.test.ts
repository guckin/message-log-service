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
        const key = ['foo', 'bar'];

        const data = await dataStoreService.getItem(key);
        expectKeyPassedToBe(key);

        expect(data).toEqual({some: 'data'});
    });

    it('stores an item in the data store', async () => {
        const key = ['foo', 'bar'];
        const item = {baz: 'quz'};
        await dataStoreService.storeItem(key, item);
        expectKeyPassedToBe(key);

        expectDataStoredToBe(item);
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

    function expectDataStoredToBe(data: any) {
        expect(dataStore.save).toBeCalledWith({key: undefined, data});
    }
});
