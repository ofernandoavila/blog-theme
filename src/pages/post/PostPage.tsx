import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BasicView } from "../../components/basic-view/BasicView";
import { Post as PostModel } from "../../models/Post";
import { Post } from "../../components/post/Post";

import './_Post.scss';
import { PostMeta } from "../../components/post-meta/PostMeta";
import { useQuery } from "@tanstack/react-query";
import { get_post } from "../../services/WPService";

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
            <div className="post-container container">
                <div className="row">
                    <div className="col-4">
                        <PostMeta post={ data } />
                    </div>
                    <div className="col-8">
                        <Post post={ data } />
                    </div>
                </div>
            </div>
        </BasicView>
    )
}