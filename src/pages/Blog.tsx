import { useEffect, useState } from "react";
import { BasicView } from "../components/basic-view/BasicView";
import { WPService } from "../services/WPService";
import { Link, useNavigate } from "react-router-dom";
import { Post } from "../models/Post";

export function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        const service = new WPService();

        service.get_all_posts().then(data => setPosts(data));
    }, []);
    
    return (
        <BasicView active="Blog">
            <div className="container">
                <div className="row row-cols-lg-4">
                { posts.map( (post) => (
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