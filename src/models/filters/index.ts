export type DIRECTION_ORDER_TYPE = 'asc' | 'desc';

export interface Filters<T> {
   page: number;
   size: number;
   direction: DIRECTION_ORDER_TYPE;
   orderBy: keyof T;
}
