export interface Key<T> {
    parent?: Key<any>;
    Item: new (data: T) => T;
    id: string | number;
}
