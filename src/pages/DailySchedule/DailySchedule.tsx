import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentModel } from "../../utils/types";
import { ScheduleService } from "../../services/schedule.service";
import useToolbar from "../../customHooks/useToolbar";

interface IDailyScheduleProps {
  date: Date;
}

const DailySchedule = ({ date }: IDailyScheduleProps) => {
  const [scheduleData, setScheduleData] = useState<AppointmentModel[]>();
  const [dayHours, setDayHours] = useState({ beginDayHour: 0, endDayHour: 24 });
  const { setToolbar } = useToolbar();

  useEffect(() => {
    setToolbar("", true);

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

    // TODO: arrange the dates according to the clicked date
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
        <ViewState currentDate={date} />
        <DayView
          startDayHour={dayHours.beginDayHour}
          endDayHour={dayHours.endDayHour}
        />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default DailySchedule;
