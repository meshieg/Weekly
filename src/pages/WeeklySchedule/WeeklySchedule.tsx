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
import { AppointementModel } from "../../utils/types";
import { ScheduleService } from "../../services/schedule.service";

const WeeklySchedule = () => {
  const [scheduleData, setScheduleData] = useState<AppointementModel[]>();

  useEffect(() => {
    ScheduleService.getSchedule(
      new Date("2023-04-09 00:00:00"),
      new Date("2023-04-10 00:00:00")
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
          defaultCurrentDate="2023-04-10"
          defaultCurrentViewName="Week"
        />

        <DayView startDayHour={9} endDayHour={18} />
        <WeekView startDayHour={10} endDayHour={19} />

        <Toolbar />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default WeeklySchedule;
