import { SiteSettings } from "../contexts/GlobalContext";
import axios, { AxiosInstance } from "axios";
import { MapPost, MapPosts, Post, PostDTO } from "../models/Post";
import { MapPage, Page, PageDTO } from "../models/Page";

export interface WordpressAPIConfig {
    axios: AxiosInstance;
}

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_WP_BASE_URL
});

export const get_posts = (): Promise<Post[]> => api.get<PostDTO[]>('/wp/v2/posts', { params: { _embed: "wp:featuredmedia,author,wp:term" } }).then( response => response.data ? MapPosts(response.data) : []);
export const get_post = (slug:string): Promise<Post> => api.get<PostDTO[]>('/wp/v2/posts', { params: { slug: slug, _embed: "wp:featuredmedia,author,wp:term" } }).then( response => MapPost(response.data[0]) );
export const get_page = (slug:string): Promise<Page> => api.get<PageDTO>('/wp/v2/pages', { params: { slug: slug } }).then( response => MapPage(response.data) );
export const get_settings = (): Promise<SiteSettings> => api.get<SiteSettings>('/blog-theme/v1/info').then( response =>response.data );