import { useEffect } from "react";
import { Post as PostModel } from "../../models/Post";
import Prism from 'prismjs';

import 'prismjs/themes/prism-tomorrow.min.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-vim';
import 'prismjs/components/prism-scss';
import { DateToString } from "../../helpers/DateHelper";

export interface PostProps {
    post?: PostModel;
}

export function Post({
    post
}: PostProps) {
    useEffect(() => {
        Prism.highlightAll();
    }, [post]);

    if(!post) return <PostSkeleton />

    return (
        <div className="post">
            <div className="post-header">
                <div className="post-title"><h1>{ post.title }</h1></div>
                <div className="post-publish-date"><i className="fa fa-calendar"></i>{ DateToString(post.date) }</div>
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
    );
}

function PostSkeleton() {
    return (
        <div className="post loading">
            <div className="post-header">
                <div className="post-title"><div></div></div>
                <div className="post-publish-date"><div></div></div>
            </div>
            <div className="post-content">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}