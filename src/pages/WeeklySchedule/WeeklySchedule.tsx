import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentModel } from "../../utils/types";
import { ScheduleService } from "../../services/schedule.service";

const WeeklySchedule = () => {
  const [scheduleData, setScheduleData] = useState<AppointmentModel[]>();

  useEffect(() => {
    ScheduleService.getSchedule(
      new Date("2023-04-16 00:00:00"),
      new Date("2023-04-22 00:00:00")
    ).then((data) => {
      const dataDisplay = data?.map((scheduleEntity) => {
        return {
          title: scheduleEntity.title,
          startDate: scheduleEntity.startTime,
          endDate: scheduleEntity.endTime,
        };
      });
      setScheduleData(dataDisplay);
    });
  }, []);

  return (
    <Paper>
      <Scheduler data={scheduleData} height={660}>
        <ViewState
          defaultCurrentDate="2023-04-19"
          defaultCurrentViewName="Week"
        />

        <DayView startDayHour={9} endDayHour={18} />
        <WeekView startDayHour={9} endDayHour={18} />

        <Toolbar />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default WeeklySchedule;
