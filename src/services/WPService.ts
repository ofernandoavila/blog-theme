import { SiteSettings } from "../contexts/GlobalContext";
import axios, { AxiosInstance } from "axios";
import { MapPost, MapPosts, Post } from "../models/Post";
import { MapPage, Page } from "../models/Page";

export class WPService {
    private __axios!: AxiosInstance;
    private __embed: string = "wp:featuredmedia,author";
    
    constructor() {
        this.__axios = axios.create({
            baseURL: import.meta.env.VITE_APP_WP_BASE_URL
        });
    }

    get_post = (slug: string):Promise<Post> => this.__axios.get('/wp/v2/posts', { params: { slug: slug, _embed: this.__embed } }).then( response => MapPost(response.data[0]) );
    get_all_posts = ():Promise<Post[]> => this.__axios.get('/wp/v2/posts', { params: { _embed: this.__embed } }).then( (response) => MapPosts(response.data));
    get_settings = ():Promise<SiteSettings> => this.__axios.get('/blog-theme/v1/info').then( response => response.data );
    get_page = (slug: string): Promise<Page> => this.__axios.get('/wp/v2/pages', { params: { slug: slug } }).then( response => MapPage(response.data[0]) );
}