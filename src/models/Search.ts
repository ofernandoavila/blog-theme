export interface Search<T> {
    /**
     * Items quantity per page
     */
    perPage: number;

    /**
     * Current page
     */
    page: number;

    /**
     * Array of objects returned from search
     * @template T Type of object returned from search
     */
    data: T[];

    /**
     * Amount of objects returned from search
     */
    totalItems: number;

    /**
     * Amount of pages of search
     */
    totalPages: number;
}