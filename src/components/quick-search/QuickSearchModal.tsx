import { useModal, Text, Button } from "avilalab-elements";
import { useEffect } from "react";

export function QuickSearchModal() {
    const { HandleCloseModal } = useModal();

    useEffect(() => {
        document.querySelector('.modal-container .background')?.addEventListener('click', HandleCloseModal);
        window.addEventListener('keydown', (e: any) => {
            if(e.key === 'Escape') return HandleCloseModal();
        });
    }, []);

    return (
        <div className="quick-search-modal">
            <h3>Press 'ESC' to quit</h3>
            <div className="quick-seach-wrapper">
                <Text
                    placeholder="Insert here your seach"
                />
                <Button 
                    className="quick-search"
                    color="primary"
                >
                    <i className="fa fa-search"></i>
                    <span>Search</span>
                </Button>
            </div>
        </div>
    );
} 