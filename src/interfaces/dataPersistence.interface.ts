import {Key} from './key.interface';

export interface DataPersistence {
    getItem<T>(itemKey: Key<T>): Promise<T>;
}
