import { useState } from "react";
import { getTokenFromStorage } from "../helpers/functions";

const useToken = () => {

  const [token, setToken] = useState(getTokenFromStorage());

  const saveToken = (userToken: string) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}

export default useToken;
