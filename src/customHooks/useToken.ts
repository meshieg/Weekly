import { useState } from "react";
import { getTokenFromStorage } from "../helpers/functions";

const useToken = () => {

  const [token, setToken] = useState(getTokenFromStorage());

  const saveToken = (userToken: string) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    setToken(null)
  }

  return {
    setToken: saveToken,
    token,
    clearToken
  }
}

export default useToken;
