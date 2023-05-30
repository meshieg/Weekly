// import useToken from "../customHooks/useToken";
import { IUser } from "../utils/types";

/**
 * A function that indicates if a user is logged in to the app.
 * Should be used in the router.
 * @returns if a user is logged in
 */
// export function isLoggedInUser() {
//     const { token } = useToken();
//     return token;
// }

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

export function getListOfHours(intervalInMinutes: number) {
    const hourList: IOption[] = [];
    const intervalMilliseconds = intervalInMinutes * 60 * 1000;

    // Set the start and end time to cover a full day
    const start = new Date();
    start.setHours(0, 0, 0, 0); // Set the time to midnight

    const end = new Date();
    end.setHours(23, 59, 59, 999); // Set the time to 23:59:59.999

    let id = 0

    // Iterate over the time range
    let current = new Date(start);
    while (current <= end) {
        const hour = current.getHours();
        const minutes = current.getMinutes();

        // Format the hour and minutes with leading zeros
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const hourString = `${formattedHour}:${formattedMinutes}`;

        // Add the formatted hour to the list
        hourList.push({ id: id, label: hourString });

        // Move to the next interval
        current = new Date(current.getTime() + intervalMilliseconds);

        id += 1;
    }

    return hourList;
}