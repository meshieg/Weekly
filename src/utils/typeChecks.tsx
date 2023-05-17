export function instanceOfTask(object: any): object is ITask {
    // return true;
    return 'estTime' in object;
}

export function instanceOfEvent(object: any): object is IEvent {
    // return true;
    return 'startTime' in object;
}