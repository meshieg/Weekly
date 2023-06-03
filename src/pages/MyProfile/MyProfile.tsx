import "./MyProfile.css";
import { useNavigate } from "react-router-dom";
import ProfileActionsList from "../../components/ProfileActionsList/ProfileActionsList";
import { actions, logout as logoutActions } from "./MyProfileActions";
import { useEffect } from "react";
import useToolbar from "../../customHooks/useToolbar";

const MyProfile = () => {
    const navigation = useNavigate();
    const { setToolbar } = useToolbar();

    useEffect(() => {
        setToolbar("My Profile", false);
      }, []);

    const itemNavigation = (route: string) => {
        navigation(route);
    }

    const clickTest = () => {
        console.log("click");
    }

    const logout = () => {
        console.log("logout");
    }
    
    return (
        <div className="my-profile">
            {/* <div> */}
                <ProfileActionsList actions={actions} onItemClick={clickTest} />
                <ProfileActionsList actions={[logoutActions]} onItemClick={logout} color={"var(--primary-color)"} />
            {/* </div> */}
            <div className="app-version">{process.env.REACT_APP_VERSION}</div>
        </div>
    );
};

export default MyProfile;
