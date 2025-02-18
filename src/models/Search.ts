export interface Search<T> {
    perPage: number;
    page: number;
    data: T;
    totalItems: number;
    totalPages: number;
}