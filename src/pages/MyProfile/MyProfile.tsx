import { useEffect, useContext } from "react";
import "./MyProfile.css";
import { useNavigate } from "react-router-dom";
import ProfileActionsList from "../../components/ProfileActionsList/ProfileActionsList";
import { navActions, logout as logoutActions } from "./MyProfileActions";
import useToolbar from "../../customHooks/useToolbar";
import useToken from "../../customHooks/useToken";
import useUser from "../../customHooks/useUser";

const MyProfile = () => {
  const navigation = useNavigate();
  const { setToolbar } = useToolbar();
  const { clearUser } = useUser();
  const { clearToken } = useToken();

  useEffect(() => {
    setToolbar("My Profile", false);
  }, []);

  const itemNavigation = (id: number) => {
    const currAction = navActions.find((action) => {
      return action.id === id;
    });

    currAction?.route ? navigation(currAction.route) : navigation("/");
  };

  const logout = () => {
    clearUser();
    clearToken();
    navigation("/login");
  };

  return (
    <div className="my-profile">
      <ProfileActionsList actions={navActions} onItemClick={itemNavigation} />
      <ProfileActionsList
        actions={[logoutActions]}
        onItemClick={logout}
        color={"var(--primary-color)"}
      />
      {/* <div className="app-version">{process.env.REACT_APP_VERSION}</div> */}
    </div>
  );
};

export default MyProfile;
