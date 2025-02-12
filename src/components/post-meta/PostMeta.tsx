import { Post } from "../../models/Post";

export interface PostMetaProps {
    post: Post;
}

export function PostMeta({ post }: PostMetaProps) {
    return (
        <div className="post-meta">
            <div className="post-meta-author"><b>Author:</b>{ post.author.name }</div>
            <div className="post-meta-categories"><b>Categories:</b>{ post.categories.map( category => <span key={category.slug}>{ category.name }</span> ) }</div>
        </div>
    );
}