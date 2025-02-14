import { Post } from "../../models/Post";
import { PostMeta } from "../post-meta/PostMeta";

export type ApiStatus = 'pending' | 'error' | 'success';

export interface PostWidgetsProps {
    post: Post;
    status: ApiStatus;
}

export function PostWidgets({
    post,
    status
}: PostWidgetsProps) {
    return (
        <div className={`post-widgets ${ status === 'pending' ? 'loading' : '' }`}>
            <PostMeta status={ status } post={post} />
        </div>
    );
}