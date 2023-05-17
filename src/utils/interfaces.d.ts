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

interface ITag {
  id?: number;
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

interface IAddEvent {
  title: string;
  location: string;
  startTime: number;
  endTime: number;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  description: string;
}

interface IEvent {
  id: number;
  title: string;
  location: string;
  startTime: number;
  endTime: number;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  tag?: ITag;
  description: string;
  isDone?: boolean;
}
