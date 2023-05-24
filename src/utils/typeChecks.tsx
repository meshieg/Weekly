export function instanceOfTask(object: any): object is ITask {
    return 'estTime' in object;
}

export function instanceOfEvent(object: any): object is IEvent {
    return 'startTime' in object;
}