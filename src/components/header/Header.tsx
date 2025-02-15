import { useGlobal } from "../../hooks/useGlobal";
import { Header as HeaderElement } from 'avilalab-elements';
import { MainMenu } from "../main-menu/MainMenu";

export function Header({ active }: { active: string; }) {
    const { site } = useGlobal();

    if(!site) return <HeaderSkeleton />;

    return (
        <HeaderElement>
            <h2>{ site.title }</h2>
            <MainMenu active={ active } />
        </HeaderElement>
    );
}

function HeaderSkeleton() {
    return (
        <HeaderElement className="loading">
            <div className="logo-placeholder"></div>
            <MainMenu />
        </HeaderElement>
    );
}