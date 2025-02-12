import { useLocation } from "react-router-dom";
import { BasicView } from "../components/basic-view/BasicView";
import { NotFound } from "./NotFound";
import { useQuery } from "@tanstack/react-query";
import { get_page } from "../services/WPService";

export function Page() {
    const { pathname } = useLocation();

    const { data, status } = useQuery({
        queryKey: ['page', pathname],
        queryFn: () => get_page(pathname),
        enabled: !!pathname
    });

    if(status === 'error') return <BasicView><NotFound /></BasicView>;

    if(status === 'pending') return <BasicView></BasicView>;

    return (
        <BasicView active={ pathname.slice(1, pathname.length) }>
            <div className="container" dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </BasicView>
    );
}