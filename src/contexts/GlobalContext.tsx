import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { get_settings } from "../services/WPService";

export interface MenuItem {
    title: string;
    url: string;
}

export interface BreadcrumbItem {
    label: string;
    link: string;
    active?: boolean;
}

export interface SiteSettings {
    title: string;
    url: string;
    description: string;
    menus: {
        primary: MenuItem[];
    }
}

export interface GlobalContextData {
    lastRoute: string | null;
    site: SiteSettings;
    breadcrumb: BreadcrumbItem[];
    defineBreadcrumb: (current?: string) => void;
}

export interface GlobalContextProps {
    children: ReactNode;
}

export const globalContext = createContext({} as GlobalContextData);

export default function GlobalContextProvider({ children }: GlobalContextProps) {
    const [site, setSite] = useState<SiteSettings | null>(null);
    const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([{ label: 'Home', link: '/' }]);
    const lastRoute = useRef<string | null>(null);

    const { pathname } = useLocation();

    
    useEffect(() => {
        lastRoute.current = pathname;
        defineBreadcrumb();
    }, [pathname]);
    
    useEffect(() => {
        get_settings().then( data => setSite(data) );
    }, []);

    const defineBreadcrumb = (current?: string) => {
        const routes = pathname.split('/');
        const data:BreadcrumbItem[] = [];

        routes.map( route => {
            switch(route) {
                case '':
                    data.push({
                        label: 'Home',
                        link: '/',
                        active: routes.length === 1
                    });
                    break;

                case 'posts':
                    data.push({
                        label: 'Blog',
                        link: '/blog',
                        active: routes.length === 2
                    });
                    break;
                
                case 'blog':
                    data.push({
                        label: 'Blog',
                        link: '/blog',
                        active: routes.length === 2
                    });
                    break;
                
                default:
                    data.push({
                        label: route,
                        link: '',
                        active: true
                    });
                    break;
            }
        })

        if(current) {
            data.pop();
            data.push({
                label: current,
                link: '',
                active: true
            });
        }

        setBreadcrumb(data);
    }

    if(!site) return <></>;

    return <globalContext.Provider value={{ lastRoute: lastRoute.current, site, breadcrumb, defineBreadcrumb }}>{ children }</globalContext.Provider>
}