import { useLocation } from "react-router-dom";
import { BasicView } from "../components/basic-view/BasicView";
import { useEffect, useState } from "react";
import { Page as PageType } from "../models/Page";
import { WPService } from "../services/WPService";
import { NotFound } from "./NotFound";

export function Page() {
    const [page, setPage] = useState<PageType | null>(null);
    const [notFound, setNotFound] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setNotFound(false);
        const service = new WPService();
        let slug = pathname.slice(1, pathname.length);

        service.get_page(slug)
                .then( data => setPage(data) )
                .catch(() => setNotFound(true));
    }, [pathname]);

    if(notFound) return <BasicView><NotFound /></BasicView>;

    if(!page) return <BasicView></BasicView>;

    return (
        <BasicView active={ pathname.slice(1, pathname.length) }>
            <div className="container" dangerouslySetInnerHTML={{ __html: page.content }}></div>
        </BasicView>
    );
}