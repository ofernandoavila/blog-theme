import { Button, useAppTheme, useModal } from "avilalab-elements";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "../../contexts/GlobalContext";

export interface MainMenuContentProps {
    menu: MenuItem[];
    active: string;
}

export function MainMenuContent({ menu, active }: MainMenuContentProps) {
    const navigate = useNavigate();
    const { appTheme, setTheme } = useAppTheme();
    const { HandleCloseModal } = useModal();

    const HandleNavigate = (rota: string) => {
        navigate(rota);
        HandleCloseModal();
    }

    return (
        <div className="main-menu-content">
            <Button color="primary" onClick={() => setTheme(appTheme === 'dark' ? 'light' : 'dark')}><i className={`mx-2 fa ${ appTheme === 'dark' ? 'fa-sun' : 'fa-moon' }`}></i>Toggle Theme</Button>
            <div className="btn-fechar" onClick={HandleCloseModal}><i className="fa fa-times"></i></div>
            <nav className="main-menu-nav">
                <ul className="nav">
                    { menu.map( item => (
                        <li className={`nav-item${ active === item.title ? 'active' : '' }`} onClick={ () =>  HandleNavigate(item.url)}>{ item.title }</li>
                    ) ) }
                </ul>
            </nav>
            <button className="btn btn-primary">Subscribe</button>
        </div>
    );
}