import {Key} from './key.interface';

export interface DataPersistence {
    getItem(itemKey: Key): Promise<any>;
}
