export interface CategoryDTO {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
}

export const MapCategory = (dto: CategoryDTO): Category => {
    let data = {} as Category;

    data.id = dto.id;
    data.name = dto.name;
    data.slug = dto.slug;
    data.taxonomy = dto.taxonomy;

    return data;
}

export const MapCategories = (categoriesDTO: CategoryDTO[]): Category[] => {
    let data:Category[] = [];

    categoriesDTO.map( category => {
        data.push(MapCategory(category));
    } );

    return data;
}