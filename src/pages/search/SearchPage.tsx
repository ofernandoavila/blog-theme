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

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const [perPage, setPerPage] = useState<number>(1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [term, setTerm] = useState(() => {
        const params = new URLSearchParams(location.search);
        return decodeURIComponent(params.get('q') || '');
    });
    const { data, status } = useQuery({
        queryKey: ['search', term, page, perPage],
        queryFn: () => search_posts(term, perPage, page),
        placeholderData: (prev) => prev
    });

    useEffect(() => {
        setPage(1);
    }, [term]);

    useEffect(() => {
        setPosts(data?.data ?? []);
        ExtractCategories(data?.data ?? []);
    }, [data?.data]);

    useEffect(() => {
        if(status === 'success') {
            setTotalPages(data?.totalPages ?? 1);
        }
    }, [term, data?.totalPages]);    

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
    
    const HandleFilter = (filterCategories: Category[]) => {
        let tmp = HandleFilterByCategory(filterCategories);
        return setPosts(tmp);
    }

    const HandleFilterByCategory = (filterCategories: Category[]) => {
        const tmp:Post[] = [];
        filterCategories.map( category => {
            data?.data.map( post => {
                if(post.categories.includes(category) && !tmp.includes(post)) {
                    tmp.push(post);
                }
            });
        });

        tmp.sort( (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        if(tmp.length === 0) return data?.data ?? [];

        return tmp;
    }

    return (
        <BasicView>
            <div className="container">
                <div className="search-header">
                    <div className="search-header-container">
                        <h2>{ term !== '' ? `Search results for: "${ term }"` : "Start your search here" }</h2>
                        <QuickSearchForm
                            callback={(query) => setTerm(query)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        { term !== '' ? (
                            <SearchAside 
                                filter={ HandleFilter }
                                categories={ categories }
                            />
                        ) : '' }
                    </div>
                    <div className="col-9">
                        <div className="search-pagination">
                            { term !== '' ? (
                                <Pagination
                                    current={ page !== undefined ? page : 1 }
                                    total={ totalPages }
                                    onSelectPage={(pageNumber) => setPage(pageNumber)}
                                />
                            ) : '' }
                        </div>
                        <div className="search-results">
                            { term !== '' && posts.map( post => <PostCard key={post.slug} post={post} /> ) }
                        </div>
                    </div>
                </div>
            </div>
        </BasicView>
    );
}