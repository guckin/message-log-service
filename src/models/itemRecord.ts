import {Key} from '../interfaces/key.interface';

export interface ItemRecord<T> {
    data: T;
    key: Key;
}
