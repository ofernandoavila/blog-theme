import { useParams } from "react-router-dom";
import { BasicView } from "../../components/basic-view/BasicView";
import { Post } from "../../components/post/Post";
import { useQuery } from "@tanstack/react-query";
import { get_post } from "../../services/WPService";
import { PostWidgets } from "../../components/post-widgets/PostWidgets";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { useGlobal } from "../../hooks/useGlobal";
import { useEffect } from "react";

import './_Post.scss';

export function PostPage() {
    const { defineBreadcrumb } = useGlobal();
    const { slug } = useParams();
    const { data, status } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => get_post(slug!),
        enabled: !!slug,
        initialData: undefined
    });

    useEffect(() => {
        if(status === 'success') defineBreadcrumb(data.title);
    }, [data]);

    return (
        <BasicView>
            <div className="container">
                <Breadcrumb />
            </div>
            <div className="post-container container">
                <div className="row">
                    <div className="col-4">
                        <PostWidgets post={data} />
                    </div>
                    <div className="col-8">
                        <Post post={ data } />
                    </div>
                </div>
            </div>
        </BasicView>
    )
}