import { useLocation } from "react-router-dom";
import { BasicView } from "../components/basic-view/BasicView";
import { NotFound } from "./NotFound";
import { useQuery } from "@tanstack/react-query";
import { get_page } from "../services/WPService";
import { Breadcrumb } from "../components/breadcrumb/Breadcrumb";

export function Page() {
    const { pathname } = useLocation();

    const { data, status } = useQuery({
        queryKey: ['page', pathname],
        queryFn: () => get_page(pathname),
        enabled: !!pathname
    });

    if(status === 'error') return <PageNotFound />;

    if(status === 'pending') return <PageSkeleton />;

    return (
        <BasicView active={ pathname.slice(1, pathname.length) }>
            <div className="container"><Breadcrumb /></div>
            <div className="container" dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </BasicView>
    );
}

function PageSkeleton() {
    return (
        <BasicView>
            <div className="container"><Breadcrumb /></div>
        </BasicView>
    );
}

function PageNotFound() {
    return (
        <BasicView>
            <div className="container"><Breadcrumb /></div>
            <NotFound />
        </BasicView>
    );
}