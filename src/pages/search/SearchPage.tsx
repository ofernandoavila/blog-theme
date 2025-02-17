import { useParams } from "react-router-dom";
import { BasicView } from "../../components/basic-view/BasicView";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { SearchAside } from "./SearchAside";
import { Text } from "avilalab-elements";
import { useState } from "react";
import { QuickSearchForm } from "../../components/quick-search/QuickSearch";

export function SearchPage() {
    const params = useParams();

    const [search, setSearch] = useState('');

    return (
        <BasicView>
            <div className="container">
                <div className="search-header">
                    <div className="search-header-container">
                        <h2>Search results for: "{ params.search }"</h2>
                        <QuickSearchForm />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <SearchAside />
                    </div>
                    <div className="col-9">
                    </div>
                </div>
            </div>
        </BasicView>
    );
}