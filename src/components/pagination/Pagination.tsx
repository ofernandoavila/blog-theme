import { useEffect, useState } from "react";

interface PaginationProps {
    current: number;
    onSelectPage: (page: number) => void;
    total: number;
}

export function Pagination({
    current,
    onSelectPage,
    total
}: PaginationProps) {
    const [items, setItems] = useState<JSX.Element[]>([]);
    
    useEffect(() => {RenderItems()}, []);

    useEffect(() => {
        RenderItems();
    },[current]);

    const NavigateTo = (pageNumber: number) => {
        return onSelectPage(pageNumber);
    }

    const RenderItems = () => {
        const tmp: JSX.Element[] = [];

        for(let i = 1; i <= total; i++) {
            tmp.push(<li className="page-item" onClick={() => NavigateTo(i)}><a className={`page-link ${i === current ? 'active': '' }`}>{ i }</a></li>)    
        }

        setItems(tmp);
    }

    return (
        <nav aria-label="Search navigation">
            <ul className="pagination">
                <li className="page-item" onClick={() => NavigateTo(current - 1 < 0 ? 1 : current - 1)}><a className="page-link" href="#">Previous</a></li>
                { items.map(item => item) }
                <li className="page-item" onClick={() => NavigateTo(current + 1 > total ? current : current + 1)}><a className="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    );
}