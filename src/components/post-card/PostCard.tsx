import { Link } from "react-router-dom";
import { Post } from "../../models/Post";

export interface PostCardProps {
    post?: Post;
}

export function PostCard({ post }: PostCardProps) {
    
    if(!post) return <PostCardSkeleton />

    return (
        <Link className="post-card" to={ `/posts/` + post.slug }>
            <div className="post-title"><h5>{ post.title }</h5></div>
            <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
            <div className="post-author"><i className="fa-solid fa-user"></i>{ post.author.name }</div>
        </Link>
    );
}

function PostCardSkeleton() {
    return (
        <div className="post-card loading">
            <div className="post-title">
                <h5></h5>
            </div>
            <div className="post-excerpt">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="post-author">
                <i className="fa-solid fa-user"></i>
                <div></div>
            </div>
        </div>
    );
}