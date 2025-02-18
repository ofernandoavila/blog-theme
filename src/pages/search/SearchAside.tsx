import { Checkbox } from "@avilalab/elements";
import { Card } from "../../components/card/Card";
import { Category } from "../../models/Category";
import { useState } from "react";

interface SearchAsideProps {
    categories: Category[];
}

export function SearchAside({
    categories
}: SearchAsideProps) {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const HandleSelectCategory = (category: Category) => {
        setSelectedCategories((current: Category[]) => {
            const tmp = current;

            if(tmp.filter( c => c.slug === category.slug).length === 0) {
                tmp.push(category);
                console.log("categoria adicionada ao filtro");
            }

            return tmp;
        });
    }

    return (
        <aside className="search-aside">
            <Card className="filter-categories" title="Categories">
                <ul>
                    <li>
                        <Checkbox
                            setValue={() => {
                                if(categories.length === selectedCategories.length) {
                                    setSelectedCategories([]);
                                    document.querySelectorAll<HTMLInputElement>('.filter-categories input[type="checkbox"]').forEach( (item) => {
                                        item.checked = false;
                                        return false;
                                    } );
                                } else {
                                    document.querySelectorAll('.filter-categories input[type="checkbox"]').forEach( item => {
                                        const element: HTMLInputElement = item as HTMLInputElement;
                                        element.checked = true;
                                    } );
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
                                />
                            </li>
                        )) 
                    }
                </ul>
            </Card>
        </aside>
    );
}