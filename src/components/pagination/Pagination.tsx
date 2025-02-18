interface PaginationProps {
    current: number;
    total: number;
    onSelectPage: (page: number) => void;
}

export function Pagination({
    current,
    onSelectPage,
    total
}: PaginationProps) {
    const NavigateTo = (pageNumber: number) => {
        return onSelectPage(pageNumber);
    }

    return (
        <nav aria-label="Search navigation">
            <ul className={`pagination`}>
                <li className="page-item" onClick={() => NavigateTo(current - 1 < 1 ? 1 : current - 1)}><a className="page-link">Previous</a></li>
                { Array.from({ length: total }, (x, index) => (
                    <li className="page-item" onClick={() => NavigateTo(index + 1)}>
                        <a className={`page-link ${(index + 1) === current ? 'active': '' }`}>{ index + 1 }</a>
                    </li>
                )) }
                <li className="page-item" onClick={() => NavigateTo(current + 1 > total ? current : current + 1)}><a className="page-link">Next</a></li>
            </ul>
        </nav>
    );
}