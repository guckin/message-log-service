import {DataStoreService} from '../../../src/services/dataStore.service';
import {Message} from '../../../src/models/message';
import {Room} from '../../../src/models/room';
import {Datastore} from '@google-cloud/datastore';
import {DataStoreMock} from '../../mocks/dataStore.mock';

describe(DataStoreService, () => {

    let dataStoreService: DataStoreService;
    let dataStoreMock: Datastore;

    beforeEach(() => {
        dataStoreMock = new DataStoreMock() as any;
        dataStoreService = new DataStoreService(dataStoreMock);
        (dataStoreMock as any).returnGetValue = [{
            content: 'content',
            author: 'author',
            date: 'date'
        }];
    });

    it('creates Paths', async () => {
        const key = {
            Item: Message,
            id: 123
        };

        await dataStoreService.getItem(key);

        expect(dataStoreMock.key).toBeCalledWith(
            ['Message', 123]
        );
    });

    it('creates Paths based on parent keys', async () => {
        const key = {
            parent: {
                Item: Room,
                id: 'test'
            },
            Item: Message,
            id: 123
        };
        await dataStoreService.getItem(key);

        expect(dataStoreMock.key).toBeCalledWith(
            ['Room', 'test', 'Message', 123]
        );
    });
});
