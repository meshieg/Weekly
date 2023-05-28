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
  description?: string;
  estTime: number;
  dueDate: Date;
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
