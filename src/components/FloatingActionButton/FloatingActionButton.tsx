import "./FloatingActionButton.css";
import { useEffect, useState } from "react";
import { Add } from '@mui/icons-material';
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../Routes";

const FloatingActionButton = () => { 
    const [display, setDisplay] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const route = routes.find((route) => route.path === location.pathname);
        setDisplay(
            route?.showFab !== undefined ? route?.showFab : false
            );
    }, [location.pathname]);

    const onButtonClick = (route: string) => {
        setIsOpen(false);
        navigate(route);
    };

    if(!display) {
        return <></>;
    }

    return (
        <div className={`fab ${isOpen ? "fab-open" : ""}`}>
            <button onClick={() => setIsOpen(!isOpen)}>
                <Add/>
            </button>
            <div className="menu">
                <button onClick={() => onButtonClick("./add-task")}>Task</button>
                <button onClick={() => onButtonClick("./add-event")}>Event</button>
            </div>
        </div>
    );
};

export default FloatingActionButton;