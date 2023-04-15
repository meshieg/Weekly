import { Priority } from "./constants";

export interface ITagEntity {
  id?: string;
  name: string;
  color: string;
}

export interface ITaskEntity {
  id?: number;
  title: string;
  location?: string;
  estTime: number;
  dueDate: Date;
  description?: string;
  priority?: Priority;
  tag?: ITagEntity;
  assignment?: Date;
}

export type TTypePriority = {
  [key in Priority] : string
}

export type IScheduleEntity = {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  tagId?: number;
}

export type AppointementModel = {
  title: string;
  startDate: Date;
  endDate: Date;
}
