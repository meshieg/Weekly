import useToken from "../customHooks/useToken";
import { IUser } from "../utils/types";

/**
 * A function that indicates if a user is logged in to the app.
 * Should be used in the router.
 * @returns if a user is logged in
 */
export function isLoggedInUser() {
    const { token } = useToken();
    return token;
}

export function signOut() {
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
}

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