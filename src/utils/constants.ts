import { TTypePriority } from "./types";

export enum fieldsTypes {
    TextField,
    Autocomplete,
    Checkbox,
    DatePicker,
    // FileUpload,
    Password
}

export enum Priority {
    HIGH = 1,
    MEDIUM,
    LOW
}

export const PriorityLabels: TTypePriority = {
    [Priority.HIGH]: "high",
    [Priority.MEDIUM]: "medium",
    [Priority.LOW]: "low"
}