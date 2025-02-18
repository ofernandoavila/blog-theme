import { useModal } from "@avilalab/elements";
import { useEffect, useState } from "react";
import { QuickSearchForm } from "./QuickSearch";
import { useNavigate } from "react-router-dom";

export function QuickSearchModal() {
    const { HandleCloseModal } = useModal();
    const navigate = useNavigate();

    useEffect(() => {
        document.querySelector('.modal-container .background')?.addEventListener('click', HandleCloseModal);
        window.addEventListener('keydown', (e: any) => {
            if(e.key === 'Escape') return HandleCloseModal();
        });
    }, []);

    const HandleSearch = (term: string) => {
        HandleCloseModal();

        const q = encodeURIComponent(term);

        return navigate('/search?q=' + q);
    }

    return (
        <div className="quick-search-modal">
            <h3>Press 'ESC' to quit</h3>
            <QuickSearchForm callback={ HandleSearch } />
        </div>
    );
} 