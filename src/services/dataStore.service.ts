import {Datastore, PathType} from '@google-cloud/datastore';
import {entity} from '@google-cloud/datastore/build/src/entity';
import {DataPersistence} from '../interfaces/dataPersistence.interface';
import {Key} from '../interfaces/key.interface';

export class DataStoreService implements DataPersistence {

    constructor(
        private readonly gcloudDataStore: Datastore
    ) {}

    async getItem<T>(itemKey: Key<T>): Promise<T> {
        const key = this.keyToDataStoreKey(itemKey);
        const item = await this.gcloudDataStore.get(key);
        return new itemKey.Item(item[0]);
    }

    private keyToDataStoreKey<T>(key: Key<T>): entity.Key {
        const path = this.keyToDataStorePath(key);
        return this.gcloudDataStore.key(path);
    }

    private keyToDataStorePath<T>(key: Key<T>): PathType[] {
        if (key.parent) {
            return [...this.keyToDataStorePath(key.parent), key.Item.name, key.id];
        } else {
            return [key.Item.name, key.id];
        }
    }
}
