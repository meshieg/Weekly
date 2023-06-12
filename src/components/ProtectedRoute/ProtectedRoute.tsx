import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { getUserFromStorage } from "../../helpers/functions";
import { defaultRoutes, UserState } from "../../utils/constants";
import Loading from "../Loading/Loading";

interface IProps {
  allowedUserState?: UserState;
  children: ReactElement;
}

const ProtectedRoute: React.FC<IProps> = (props) => {
  const user = getUserFromStorage();
  const userState: UserState = user ? UserState.SIGNED : UserState.NOT_SIGNED;
  const { loading } = useAppContext();

  if (loading) {
    return <Loading />;
  }

  if (
    props.allowedUserState !== undefined &&
    props.allowedUserState === userState
  ) {
    return props.children;
  } else {
    return <Navigate to={defaultRoutes[userState]} />;
  }
};

export default ProtectedRoute;
