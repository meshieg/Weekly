import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    let userToken;
    if (tokenString && tokenString !== "undefined") {
      userToken = JSON.parse(tokenString);
    }
    return userToken ? userToken : null
  };

  const [token, setToken] = useState(getToken());

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
