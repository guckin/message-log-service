import {DataStoreService} from '../../src/services/dataStore.service';
import {Datastore, PathType} from '@google-cloud/datastore';
import {Room} from '../../src/models/room';
import {Message} from '../../src/models/message';


describe(DataStoreService, () => {

    let dataStoreService: DataStoreService;
    const dataStore = new Datastore({
        projectId: 'project-test',
        apiEndpoint: 'https://localhost:8081'
    });

    beforeEach(() => {
        dataStoreService = new DataStoreService(dataStore);
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
        const key = {
            Item: Message,
            id: '123'
        };
        const item = await dataStoreService.getItem(key);
        expect(item).toEqual({
            content: 'content',
            author: 'author',
            date: 'date'
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
        const key = {
            parent: {
                Item: Room,
                id: 'foo'
            },
            Item: Message,
            id: 123
        };
        const item = await dataStoreService.getItem(key);
        expect(item).toEqual({
            content: 'something',
            author: 'different',
            date: 'this time'
        });
    });

    async function saveMessageDirectlyToDataStore(keyPath: PathType[], message: Message) {
        const saveKey = dataStore.key(keyPath);
        await dataStore.save({
            key: saveKey,
            data: message
        });
    }
});
