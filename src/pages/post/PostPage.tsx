import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WPService } from "../../services/WPService";
import { BasicView } from "../../components/basic-view/BasicView";
import { Post as PostModel } from "../../models/Post";
import { Post } from "../../components/post/Post";

import './_Post.scss';

export function PostPage() {
    const [post, setPost] = useState<PostModel | null>(null);
    const [postTopics, setPostTopics] = useState<{title: string; anchor: string;}[]>([]);
    const [postLoaded, setPostLoaded] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        if(slug) {
            const service = new WPService();
            service.get_post(slug)
                    .then( post => setPost(post))
                    .then( () => setPostLoaded(true));
        }
    }, [slug]);

    useEffect(() => {
        const topics: { title: string; anchor: string; }[] = [];
        const data = document.querySelectorAll('.wp-block-heading');

        if(data) {
            data.forEach( row => {
                topics.push({
                    anchor: row.getAttribute("id")!,
                    title: row.textContent!
                })
            } );
            
            setPostTopics(topics);
        }

    }, [postLoaded]);

    if(!post) return <BasicView active=""></BasicView>;

    return (
        <BasicView active="">
            <div className="post-container container">
                <div className="row">
                    <div className="col-4">
                    </div>
                    <div className="col-8">
                        <Post post={ post } />
                    </div>
                </div>
            </div>
        </BasicView>
    )
}