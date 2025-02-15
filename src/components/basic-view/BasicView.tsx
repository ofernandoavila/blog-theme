import { ReactNode } from "react";
import { Header } from "../header/Header";
import { Modal } from "avilalab-elements";

interface BasicViewProps {
    hideHeader?: boolean;
    children?: ReactNode;
    active?: string;
}

export function BasicView({ children, hideHeader, active }: BasicViewProps) {
    return (
        <div className={`vh-100 d-flex flex-column`}>
            <Modal />
            <div className="container-fluid">
                { hideHeader ? '' : <div className="container"><Header active={ active ?? '' } /></div> }
                <main>{ children }</main>
            </div>
        </div>
    );
}