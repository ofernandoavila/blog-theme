import { Button, useModal } from "avilalab-elements";
import { MainMenuContent } from "./MainMenuContent";
import { useGlobal } from "../../hooks/useGlobal";

export interface MainMenuProps {
    active: string;
}

export function MainMenu({ active }: MainMenuProps) {
    const { HandleOpenModal } = useModal();
    const { site } = useGlobal();

    const OpenMenu = () => {
        HandleOpenModal(<MainMenuContent menu={ site.menus.primary } active={active} />)
    }

    return (
        <Button onClick={OpenMenu}><i className="fa fa-bars"></i></Button>
    );
}