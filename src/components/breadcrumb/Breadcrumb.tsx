import { Link } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobal";

export function Breadcrumb() {
    const { breadcrumb } = useGlobal();

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                { breadcrumb.map( item => <li key={ item.label } className={`breadcrumb-item ${ item.active ? 'active' : '' }`}><Link to={ item.link }>{ item.label }</Link></li> ) }
            </ol>
        </nav>
    );
}