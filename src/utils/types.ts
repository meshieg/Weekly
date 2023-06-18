import { ReactElement } from "react";
import { Priority } from "./constants";

export type TTypePriority = {
  [key in Priority]: string;
};

export type IScheduleEntity = {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  tag?: ITag;
  isTask: boolean;
};

export type AppointmentModel = {
  title: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  isTask: boolean;
};

export type IUser = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  beginDayHour?: number;
  endDayHour?: number;
  resetToken?: string;
};

export type IUserResponse = {
  token: string;
  user: IUser;
};

export interface IProfileAction {
  id: number;
  icon?: ReactElement;
  text: string;
  displayArrow?: boolean;
  route?: string;
}

export type UserMessage = {
  title?: string;
  message?: string | React.ReactNode;
  extraMessage?: string | React.ReactNode;
  primaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  icon?: JSX.Element;
}

export type UserMessages = {
  [key: string]: UserMessage
}

export type ServerError = {
  code: number;
  message: string;
  extraMessage?: string;
}