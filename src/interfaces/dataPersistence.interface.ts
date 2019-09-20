import {Key} from './key.interface';
import {ItemRecord} from '../models/itemRecord';

export interface DataPersistence {
    getItem<T>(itemKey: Key): Promise<ItemRecord<T>>;
    storeItem<T>(itemKey: Key, item: T): Promise<void>;
}
