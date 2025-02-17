import { ReactNode } from "react";

interface CardProps {
    title?: string;
    children?: ReactNode;
    className?: string;
}

interface CardSkeletonProps {
    className?: string;
    children?: ReactNode;
}

export function Card({
    children,
    title,
    className
}: CardProps) {
    return (
        <div className={`card ${className}`}>
            { title ? <h3 className="card-title"><i className="fa-solid fa-bolt"></i>{ title }</h3> : '' }
            <div className="card-container">{ children }</div>
        </div>
    );
}

export function CardSkeleton({
    children,
    className
}: CardSkeletonProps) {
    return (
        <div className={`card ${className} loading`}>
            <div className="card-container">{ children }</div>
        </div>
    );
}

