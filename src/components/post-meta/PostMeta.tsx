import { Link } from "react-router-dom";
import { Post } from "../../models/Post";
import { DateToString } from "../../helpers/DateHelper";

export interface PostMetaProps {
    post?: Post;
}

export function PostMeta({ post }: PostMetaProps) {
    if(!post) return <PostMetaSkeleton />

    return (
        <div className={`post-meta`}>
            <h3><i className="fa-solid fa-bolt"></i>Article Information</h3>
            <div className="post-meta-container">
                <div className="post-meta-author"><i className="fa fa-user"></i><b>Author:</b><span>{ post.author.name }</span></div>
                <div className="post-meta-updated"><i className="fa fa-user"></i><b>Updated:</b><span>{ DateToString(post.date) }</span></div>
                <div className="post-meta-categories"><i className="fa fa-tag"></i><b>Categories:</b><ul>{ post.categories.map( category => <li key={category.slug}><Link to={`/category/${category.slug}`}>{ category.name }</Link></li> ) }</ul></div>
            </div>
        </div>
    );
}

function PostMetaSkeleton() {
    return (
        <div className={`post-meta loading`}>
            <h3><i className="fa-solid fa-bolt"></i>Article Information</h3>
            <div className="post-meta-container">
                <div className="post-meta-author"><div></div></div>
                <div className="post-meta-updated"><div></div></div>
                <div className="post-meta-categories"><div></div></div>
            </div>
        </div>
    );
}