import { Button, Text, useModal } from "@avilalab/elements";
import { QuickSearchModal } from "./QuickSearchModal";
import { useState } from "react";

export function QuickSearch() {
    const { HandleOpenModal } = useModal();

    return (
        <Button
            className="quick-search"
            onClick={() => HandleOpenModal(<QuickSearchModal/>)}
        >
            <i className="fa fa-search"></i>
            <span>Quick search</span>
        </Button>
    );
}

interface QuickSearchFormProps {
    callback?: (term: string) => void;
}

export function QuickSearchForm({
    callback
}: QuickSearchFormProps) {
    const [search, setSearch] = useState<string>('');

    const HandleSearch = (e: any) => {
        e.preventDefault();

        if(search == '') return;

        if(callback) return callback(search);
    };

    return (
        <div className="quick-seach-form">
            <Text
                placeholder="Insert here your search"
                value={ search }
                setValue={ setSearch }
            />
            <Button 
                className="quick-search"
                color="primary"
                onClick={ HandleSearch }
            >
                <i className="fa fa-search"></i>
                <span>Search</span>
            </Button>
        </div>
    );
}