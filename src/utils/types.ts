import { Priority } from "./constants";

export type TTypePriority = {
  [key in Priority]: string
}

export type IScheduleEntity = {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  tagId?: number;
}

export type AppointmentModel = {
  title: string;
  startDate: Date;
  endDate: Date;
}
