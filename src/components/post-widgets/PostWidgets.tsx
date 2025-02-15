import { useEffect, useRef, useState } from "react";
import { Post } from "../../models/Post";
import { PostMeta } from "../post-meta/PostMeta";

export type ApiStatus = 'pending' | 'error' | 'success';

export interface PostWidgetsProps {
    post?: Post;
}

export function PostWidgets({
    post
}: PostWidgetsProps) {
    const widgets = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener('scroll', fixOnScroll);
    }, []);

    const fixOnScroll = () => {
        if(widgets.current) {
            if(window.scrollY > 100) {
                const width = widgets.current.clientWidth + 'px';
                widgets.current.classList.add('fixed');
                widgets.current.style.top = "104px";
                widgets.current.style.width = width;
            } else {
                widgets.current.style.width = 'auto';
                widgets.current.classList.remove('fixed');
            }
        }
    }

    return (
        <div ref={widgets} className={`post-widgets`}>
            <PostMeta post={post} />
        </div>
    );
}