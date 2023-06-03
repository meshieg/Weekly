import "./MyProfile.css";
import { useNavigate } from "react-router-dom";
import ProfileActionsList from "../../components/ProfileActionsList/ProfileActionsList";
import { navActions, logout as logoutActions } from "./MyProfileActions";
import { useEffect } from "react";
import useToolbar from "../../customHooks/useToolbar";
import { signOut } from "../../helpers/functions";

const MyProfile = () => {
    const navigation = useNavigate();
    const { setToolbar } = useToolbar();

    useEffect(() => {
        setToolbar("My Profile", false);
      }, []);

    const itemNavigation = (id: number) => {
        const currAction = navActions.find(action => {
            return action.id === id;
        });

        currAction?.route ? navigation(currAction.route) : navigation("/");
    }

    const logout = () => {
        signOut();
    }
    
    return (
        <div className="my-profile">
            <ProfileActionsList actions={navActions} onItemClick={itemNavigation} />
            <ProfileActionsList actions={[logoutActions]} onItemClick={logout} color={"var(--primary-color)"} />
            {/* <div className="app-version">{process.env.REACT_APP_VERSION}</div> */}
        </div>
    );
};

export default MyProfile;
