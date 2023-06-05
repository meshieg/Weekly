import { IUser } from "../utils/types";

export const getTokenFromStorage = () => {
    const tokenString = localStorage.getItem('token');
    let userToken;
    if (tokenString && tokenString !== "undefined") {
        userToken = JSON.parse(tokenString);
    }
    return userToken ? userToken : null
};

export const getUserFromStorage = () => {
    const userString = localStorage.getItem('user');
    let userObj;
    if (userString && userString !== "undefined") {
        userObj = JSON.parse(userString);
    }
    return userObj ? userObj : undefined
};

export function validateEmail(email: string) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return (email.match(validRegex))
}

export function validateUserInputs(user: IUser) {
    if (!validateEmail(user.email)) {
        return "Email address is not valid..."
    }

    if (user.confirmPassword && (user.password !== user.confirmPassword)) {
        return "Please confirm your password correctly"
    }
}