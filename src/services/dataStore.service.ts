import {Datastore, PathType} from '@google-cloud/datastore';
import {entity} from '@google-cloud/datastore/build/src/entity';
import {DataPersistence} from '../interfaces/dataPersistence.interface';
import {Key} from '../interfaces/key.interface';

export class GCloudDataStoreService implements DataPersistence {

    constructor(
        private readonly gcloudDataStore: Datastore
    ) {}

    async getItem(itemKey: Key): Promise<any> {
        const key = this.keyToGcloudKey(itemKey);
        return await this.gcloudDataStore.get(key);
    }

    async storeItem(itemKey: Key, item: any) {
        const key = this.keyToGcloudKey(itemKey);
        return await this.gcloudDataStore.save({key, data: item});
    }

    private keyToGcloudKey(itemKey: Key): entity.Key {
        const path = this.keyToGcloudPath(itemKey);
        return this.gcloudDataStore.key(path);
    }

    private keyToGcloudPath(key: Key): PathType[] {
        return key;
    }
}
