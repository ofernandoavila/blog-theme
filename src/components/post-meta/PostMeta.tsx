import { Link } from "react-router-dom";
import { Post } from "../../models/Post";
import { DateToString } from "../../helpers/DateHelper";
import { Card, CardSkeleton } from "../card/Card";

export interface PostMetaProps {
    post?: Post;
}

export function PostMeta({ post }: PostMetaProps) {
    if(!post) return <PostMetaSkeleton />

    return (
        <Card className="post-meta" title="Article Information">
            <div className="post-meta-author"><i className="fa fa-user"></i><b>Author:</b><span>{ post.author.name }</span></div>
            <div className="post-meta-updated"><i className="fa fa-user"></i><b>Updated:</b><span>{ DateToString(post.date) }</span></div>
            <div className="post-meta-categories"><i className="fa fa-tag"></i><b>Categories:</b><ul>{ post.categories.map( category => <li key={category.slug}><Link to={`/category/${category.slug}`}>{ category.name }</Link></li> ) }</ul></div>
        </Card>
    );
}

function PostMetaSkeleton() {
    return (
        <CardSkeleton className="post-meta">
            <div className="post-meta-author"><div></div></div>
            <div className="post-meta-updated"><div></div></div>
            <div className="post-meta-categories"><div></div></div>
        </CardSkeleton>
    );
}