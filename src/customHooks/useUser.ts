import { useState } from "react";
import { getUserFromStorage } from "../helpers/functions";
import { IUser } from "../utils/types";

const useUser = () => {

    const [user, setUser] = useState(getUserFromStorage());

    const saveUser = (user: IUser) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const clearUser = () => {
        localStorage.removeItem("user");
        setUser(undefined)
    }

    return {
        setUser: saveUser,
        user,
        clearUser
    }
}

export default useUser;
