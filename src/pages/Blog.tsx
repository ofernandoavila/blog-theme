import { BasicView } from "../components/basic-view/BasicView";
import { get_posts } from "../services/WPService";
import { useQuery } from "@tanstack/react-query";
import { PostCard } from "../components/post-card/PostCard";
import { Breadcrumb } from "../components/breadcrumb/Breadcrumb";

export function Blog() {
    const { data } = useQuery({
        queryKey: ['posts'],
        queryFn: get_posts,
        initialData: [null, null, null]
    });

    return (
        <BasicView active="Blog">
            <div className="container">
                <Breadcrumb />
                <div className="posts-container">
                    { data.map( (post) => <PostCard post={post} />) }
                </div>
            </div>
        </BasicView>
    );
}