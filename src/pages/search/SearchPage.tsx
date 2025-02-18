import { useLocation } from "react-router-dom";
import { BasicView } from "../../components/basic-view/BasicView";
import { SearchAside } from "./SearchAside";
import { QuickSearchForm } from "../../components/quick-search/QuickSearch";
import { useQuery } from "@tanstack/react-query";
import { search_posts } from "../../services/WPService";
import { PostCard } from "../../components/post-card/PostCard";
import { Post } from "../../models/Post";
import { useEffect, useState } from "react";
import { Category } from "../../models/Category";
import { Pagination } from "../../components/pagination/Pagination";

export function SearchPage() {
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const term = decodeURIComponent(params.get('q') || '');

        setSearch(term);
    }, []);

    const { data } = useQuery({
        queryKey: ['search', search, page],
        queryFn: () => {
            if(search !== '') return search_posts(search, 1, page);

            return {
                data: [],
                page,
                perPage: 1,
                totalItems: 0,
                totalPages: 0
            };
        },
        initialData: {
            data: [],
            page,
            perPage: 1,
            totalItems: 0,
            totalPages: 0
        }
    });

    const ExtractCategories = (posts: Post[]) => {
        const tmp:Category[] = [];

        posts.map( post => {
            post.categories.map( category => {
                if(tmp.filter( c => c.name === category.name ).length === 0) {
                    tmp.push(category);
                }
            });
        });

        setCategories(tmp);
    }
    
    useEffect(() => {
        if(data.data.length > 0) {
            ExtractCategories(data.data);
        }
    }, [data.data]);

    return (
        <BasicView>
            <div className="container">
                <div className="search-header">
                    <div className="search-header-container">
                        <h2>{ search !== '' ? `Search results for: "${ search }"` : "Start your search here" }</h2>
                        <QuickSearchForm
                            callback={(term) => {
                                setSearch(term);
                            }}
                        />
                    </div>
                </div>
                { data.data.length > 0 ? (
                    <div className="row">
                        <div className="col-3">
                            <SearchAside categories={categories} />
                        </div>
                        <div className="col-9">
                            <div className="search-pagination">
                                <Pagination
                                    current={ page }
                                    total={ data.totalPages }
                                    onSelectPage={(pageNumber) => {
                                        setPage(pageNumber);
                                    }}
                                />
                            </div>
                            <div className="search-results">
                                { data.data.map( post => <PostCard key={post.slug} post={post} /> ) }
                            </div>
                        </div>
                    </div>
                ) : '' }
            </div>
        </BasicView>
    );
}