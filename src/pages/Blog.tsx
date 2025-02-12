import { BasicView } from "../components/basic-view/BasicView";
import { get_posts } from "../services/WPService";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function Blog() {
    const { data, status } = useQuery({
        queryKey: ['posts'],
        queryFn: get_posts
    });

    if(status === 'pending') return <h5>Carregando...</h5>

    if(status === 'error') return <h5>Error</h5>
    
    return (
        <BasicView active="Blog">
            <div className="container">
                <div className="row row-cols-lg-4">
                { data.map( (post) => (
                    <div className="col">
                        <Link key={ post.id } to={'/posts/' + post.slug}>
                            { post.title }
                        </Link>
                    </div>
                ) ) }
                </div>
            </div>
        </BasicView>
    );
}