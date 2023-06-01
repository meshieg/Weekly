import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";

import { AppointmentModel } from "../../utils/types";
import { ScheduleService } from "../../services/schedule.service";
import { useNavigate } from "react-router-dom";

const WeeklySchedule = () => {
  const [scheduleData, setScheduleData] = useState<AppointmentModel[]>([]);
  const [currDate, setCurrDate] = useState(new Date());
  const [dayHours, setDayHours] = useState({ beginDayHour: 0, endDayHour: 24 });
  const navigate = useNavigate();

  // TODO: Add on click - open the task/event to display and edit
  const Appointment = ({
    children,
    onClick,
    data,
    ...restProps
  }: Appointments.AppointmentProps) => {
    return (
      <Appointments.Appointment
        {...restProps}
        onClick={onClick}
        data={data}
        style={{
          backgroundColor: data.color || "undefined",
          borderRadius: "4px",
          // width: "auto",
        }}
      >
        {children}
      </Appointments.Appointment>
    );
  };

  // TODO: specify the date in the day display
  const DayScaleCell = ({ ...restProps }: WeekView.DayScaleCellProps) => {
    return (
      <WeekView.DayScaleCell {...restProps} onClick={() => navigate("/day")} />
    );
  };

  useEffect(() => {
    const userString = sessionStorage.getItem("user");

    if (userString) {
      const userObj = JSON.parse(userString);

      // Set to a restricted display when the user's day takes place within the 24 hours.
      // When the user's day takes place within two different days - the display won't be rectricted.
      if (userObj?.endDayHour === 0) {
        setDayHours({ beginDayHour: userObj?.beginDayHour, endDayHour: 24 });
      } else if (userObj?.beginDayHour <= userObj?.endDayHour) {
        setDayHours({
          beginDayHour: userObj?.beginDayHour,
          endDayHour: userObj?.endDayHour,
        });
      }
    }

    ScheduleService.getSchedule(
      new Date("2023-01-01 00:00:00"),
      new Date("2050-12-31 00:00:00")
    ).then((data) => {
      const dataDisplay = data?.map((scheduleEntity) => {
        return {
          title: scheduleEntity.title,
          startDate: scheduleEntity.startTime,
          endDate: scheduleEntity.endTime,
          color: scheduleEntity.tag?.color,
        };
      });
      setScheduleData(dataDisplay);
    });
  }, []);

  return (
    <Paper>
      <Scheduler data={scheduleData}>
        <ViewState
          defaultCurrentDate={currDate}
          defaultCurrentViewName="Week"
        />

        <DayView
          startDayHour={dayHours.beginDayHour}
          endDayHour={dayHours.endDayHour}
        />
        <WeekView
          startDayHour={dayHours.beginDayHour}
          endDayHour={dayHours.endDayHour}
          dayScaleCellComponent={DayScaleCell}
        />

        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <Appointments appointmentComponent={Appointment} />
      </Scheduler>
    </Paper>
  );
};

export default WeeklySchedule;
