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

export function isValidDate(date: Date) {
    return (date instanceof Date && !isNaN(date.getTime()))
}

export function validateTaskInputs(task: ITask) {
    if (isNaN(task.estTime) || task.estTime % 1 !== 0) {
        return "Estimated time is not valid"
    }

    if (!isValidDate(task.dueDate)) {
        return "Due date is not valid"
    }

    if (task.dueDate < new Date()) {
        return "Past due date is not allowed"
    }

    if (task.assignment) {
        if (!isValidDate(task.assignment)) {
            return "Assignment is not valid"
        }

        let endAssignment = new Date(task.assignment);
        endAssignment.setHours(endAssignment.getHours() + task.estTime);

        if (endAssignment > task.dueDate) {
            return "Assignment can't be after due date"
        }
    }

}

export function validateEventInputs(event: IEvent) {
    if (!isValidDate(event.startTime)) {
        return "Start date is not valid"
    }

    if (!isValidDate(event.endTime)) {
        return "End date is not valid"
    }

    if (event.startTime < new Date()) {
        return "Past start time is not allowed"
    }

    if (event.endTime <= event.startTime) {
        return "End time must be after start time"
    }

}


if (user.confirmPassword && (user.password !== user.confirmPassword)) {
    return "Please confirm your password correctly"
}
}