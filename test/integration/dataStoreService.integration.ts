import {GCloudDataStoreService} from '../../src/services/dataStore.service';
import {Datastore, PathType} from '@google-cloud/datastore';
import {Key} from '../../src/interfaces/key.interface';
import {Entity} from '@google-cloud/datastore/build/src/entity';


describe(GCloudDataStoreService, () => {

    let dataStoreService: GCloudDataStoreService;
    const dataStore = new Datastore({
        projectId: 'project-test',
        apiEndpoint: 'https://localhost:8081'
    });

    beforeEach(() => {
        dataStoreService = new GCloudDataStoreService(dataStore);
    });


    it('gets a single Message', async () => {
        await saveMessageDirectlyToDataStore(
           ['Message', '123'],
           {
               content: 'content',
               author: 'author',
               date: 'date'
           }
        );
        const key = ['Message', '123'];
        const item = await dataStoreService.getItem(key);
        expect(item).toEqual({
            data: {
                content: 'content',
                author: 'author',
                date: 'date'
            },
            key: ['Message', '123']
        });
    });

    it('gets a Message that is a Parent of a Room', async () => {
        await saveMessageDirectlyToDataStore(
            ['Room', 'foo', 'Message', 123],
            {
                content: 'something',
                author: 'different',
                date: 'this time'
            }
        );
        const key = ['Room', 'foo', 'Message', 123];
        const item = await dataStoreService.getItem(key);
        expect(item).toEqual({
            data: {
                content: 'something',
                author: 'different',
                date: 'this time'
            },
            key: ['Room', 'foo', 'Message', 123]
        });
    });

    it('stores and item', async () => {
        const key = ['Room', 'foo', 'Message', '123'];
        const message = {
            content: 'something',
            author: 'different',
            date: 'this time'
        };
        await deleteItem(key);
        await dataStoreService.storeItem(key, message);
        const item = await getMessageDirectlyToDataStore(key);
        expectItemsEqualsMessage(item[0], message);
    });

    function expectItemsEqualsMessage(item: any, message: any) {
        Object.keys(item).forEach((key) => {
            expect(item[key]).toEqual(message[key]);
        });
    }

    async function saveMessageDirectlyToDataStore(keyPath: PathType[], message: any) {
        const saveKey = dataStore.key(keyPath);
        await dataStore.save({
            key: saveKey,
            data: message
        });
    }

    async function deleteItem(key: Key) {
        const keyPath = keyToKeyPath(key);
        const dsKey = dataStore.key(keyPath);
        return await dataStore.delete(dsKey);
    }

    function keyToKeyPath(key: Key): PathType[] {
        return key;
    }

    async function getMessageDirectlyToDataStore(key: Key): Promise<Entity> {
        const keyPath = keyToKeyPath(key);
        const dsKey = dataStore.key(keyPath);
        return await dataStore.get(dsKey);
    }
});
