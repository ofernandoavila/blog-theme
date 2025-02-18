import { Checkbox } from "@avilalab/elements";
import { Card } from "../../components/card/Card";
import { Category } from "../../models/Category";
import { useEffect, useState } from "react";
import { SearchPostCategoryFilter } from "../../components/search-post-filters/SearchPostCategoryFilter";

interface SearchAsideProps {
    categories: Category[];
    filter?: (filterCategories: Category[]) => void;
}

export function SearchAside({
    categories,
    filter
}: SearchAsideProps) {
    const HandleSelectCategory = (categories: Category[]) => {
        if(filter) {
            filter(categories);
        }
    }

    return (
        <aside className="search-aside">
            <SearchPostCategoryFilter
                categories={ categories }
                onSelectCategory={ HandleSelectCategory }
            />
        </aside>
    );
}