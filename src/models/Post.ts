import { Author } from "./Author";
import { Category, CategoryDTO, MapCategories, MapCategory } from "./Category";
import { FeaturedMedia } from "./FeaturedMedia";
import { RenderedField } from "./types";

export type PostStatus = "publish";
export type PostType = "post";
export type PostCommentStatus = "open";

export interface PostDTO {
    id: number;
    date: string;
    guid: RenderedField;
    slug: string;
    modified: string;
    type: PostType;
    link: string;
    title: RenderedField;
    content: RenderedField;
    excerpt: RenderedField;
    author: number;
    featured_media: number;
    comment_status: PostCommentStatus;
    tags: string[];
    categories: number[];
    "_links": [];
    "_embedded"?: {
        "wp:featuredmedia"?: FeaturedMedia[];
        "author"?: Author[];
        "wp:term"?: [ CategoryDTO[] ];
    };
}

export interface Post {
    id: number;
    date: Date;
    slug: string;
    modified: string;
    type: PostType;
    link: string;
    title: string;
    content: string;
    excerpt: string;
    author: Author;
    thumbnail_url?: string;
    comment_status: PostCommentStatus;
    tags: string[];
    categories: Category[];
}

export const MapPost = (data: PostDTO) : Post => {
    let post: Partial<Post> = {
        id: data.id,
        comment_status: data.comment_status,
        content: data.content.rendered,
        date: new Date(data.date),
        excerpt: data.excerpt.rendered,
        link: data.link,
        modified: data.modified,
        slug: data.slug,
        tags: data.tags,
        title: data.title.rendered,
        type: data.type,

    };

    if(data._embedded?.author) {
        post.author = {
            id: data._embedded!.author![0].id,
            name: data._embedded!.author![0].name,
            slug: data._embedded!.author![0].slug
        };
    }

    if(data._embedded?.["wp:featuredmedia"]) {
        post.thumbnail_url = data._embedded?.["wp:featuredmedia"][0].link;
    }

    if(data._embedded?.["wp:term"]) {
        post.categories = MapCategories(data._embedded?.["wp:term"][0]);
    }

    return post as Post;
}

export const MapPosts = (data: PostDTO[]) : Post[] => {
    const posts: Post[] = [];

    data.map( (item: PostDTO) => {
        posts.push(MapPost(item));
    });

    return posts;
}