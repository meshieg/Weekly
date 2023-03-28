interface IOption {
    id: string;
    label: string;
}
interface IField {
    label: string;
    type: fieldsTypes;
    options?: IOption[];
    required?: boolean = false;
    placeholder?: string;
}