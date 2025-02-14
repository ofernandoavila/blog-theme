import { Link } from "react-router-dom";
import { Post } from "../../models/Post";
import { ApiStatus } from "../post-widgets/PostWidgets";

export interface PostMetaProps {
    post: Post;
    status: ApiStatus;
}

export function PostMeta({ post, status }: PostMetaProps) {
    return (
        <div className={`post-meta ${ status === 'pending' ? 'loading' : '' }`}>
            <h3><i className="fa-solid fa-bolt"></i>Article Information</h3>
            <div className="post-meta-container">
                <div className="post-meta-author"><i className="fa fa-user"></i><b>Author:</b><span>{ post.author.name }</span></div>
                <div className="post-meta-updated"><i className="fa fa-user"></i><b>Updated:</b><span>{ post.date }</span></div>
                <div className="post-meta-categories"><i className="fa fa-tag"></i><b>Categories:</b><ul>{ post.categories.map( category => <li key={category.slug}><Link to={`/category/${category.slug}`}>{ category.name }</Link></li> ) }</ul></div>
            </div>
        </div>
    );
}