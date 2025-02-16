import { Button, useModal } from "avilalab-elements";
import { QuickSearchModal } from "./QuickSearchModal";

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