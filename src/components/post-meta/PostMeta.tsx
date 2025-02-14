import { Post } from "../../models/Post";
import { ApiStatus } from "../post-widgets/PostWidgets";

export interface PostMetaProps {
    post: Post;
    status: ApiStatus;
}

export function PostMeta({ post, status }: PostMetaProps) {
    return (
        <div className={`post-meta ${ status === 'pending' ? 'loading' : '' }`}>
            <div className="post-meta-author"><b>Author:</b><span>{ post.author.name }</span></div>
            <div className="post-meta-categories"><b>Categories:</b><ul>{ post.categories.map( category => <li key={category.slug}>{ category.name }</li> ) }</ul></div>
        </div>
    );
}