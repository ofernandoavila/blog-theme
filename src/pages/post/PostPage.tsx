import { Link, useParams } from "react-router-dom";
import { BasicView } from "../../components/basic-view/BasicView";
import { Post } from "../../components/post/Post";
import { useQuery } from "@tanstack/react-query";
import { get_post } from "../../services/WPService";
import { PostWidgets } from "../../components/post-widgets/PostWidgets";

import './_Post.scss';

export function PostPage() {
    const { slug } = useParams();
    const { data, status } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => get_post(slug!),
        enabled: !!slug
    });

    if(status === 'pending') return <BasicView active=""></BasicView>;

    if(status === 'error') return <BasicView active="">Erro ao carregar post</BasicView>;

    return (
        <BasicView active="">
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/blog">Blog</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{ data.title }</li>
                    </ol>
                </nav>
            </div>
            <div className="post-container container">
                <div className="row">
                    <div className="col-4">
                        <PostWidgets post={data} status={ status } />
                    </div>
                    <div className="col-8">
                        <Post post={ data } />
                    </div>
                </div>
            </div>
        </BasicView>
    )
}