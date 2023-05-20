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
  multiline?: boolean;
  width?: string
}

interface ITag {
  id: number;
  name: string;
  color: string;
}

interface ITask {
  id: number;
  title: string;
  location?: string;
  estTime: number;
  dueDate: Date;
  description?: string;
  priority?: number;
  tag?: ITag;
  assignment?: Date;
  isDone?: boolean;
}

interface IEvent {
  id: number;
  title: string;
  location?: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  tag?: ITag;
}
