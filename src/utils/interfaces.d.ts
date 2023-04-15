interface IOption {
    id: number;
    label: string;
}
interface IField {
    label: string;
    type: fieldsTypes;
    options?: IOption[];
    required?: boolean = false;
    placeholder?: string;
}