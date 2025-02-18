import { Card, Checkbox } from "@avilalab/elements";
import { Category } from "../../models/Category";
import { useState, useEffect } from "react";

interface SearchPostCategoryFilterProps {
    categories: Category[];
    onSelectCategory: (categories: Category[]) => void;
}

export function SearchPostCategoryFilter({
    categories,
    onSelectCategory
}: SearchPostCategoryFilterProps) {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const allSelected = selectedCategories.length === categories.length;

    const HandleSelectCategory = (category: Category) => {
        setSelectedCategories((current) =>
            current.includes(category) ? current.filter((i) => i !== category) : [...current, category]
        );
    }

    useEffect(() => {
        onSelectCategory(selectedCategories);
    }, [selectedCategories]);

    useEffect(() => {
        setSelectedCategories(categories);
    }, [categories]);
    
    return (
        <Card className="filter-categories" title="Categories">
            <ul>
                <li>
                    <Checkbox
                        value={ allSelected }
                        setValue={() => {
                            if(allSelected) {
                                setSelectedCategories([]);
                            } else {
                                setSelectedCategories(categories);
                            }
                        }}
                        label="Select all"
                    />
                </li>
                { categories.map( 
                    category => (
                        <li key={category.slug}>
                            <Checkbox
                                setValue={() => HandleSelectCategory(category)}
                                label={ category.name }
                                value={ selectedCategories.includes(category) }
                            />
                        </li>
                    )) 
                }
            </ul>
        </Card>
    );
}