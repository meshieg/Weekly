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
import useUser from "../../customHooks/useUser";

interface IDailyScheduleProps {
  date: Date;
}

const DailySchedule = ({ date }: IDailyScheduleProps) => {
  const [scheduleData, setScheduleData] = useState<AppointmentModel[]>();
  const [dayHours, setDayHours] = useState({ beginDayHour: 0, endDayHour: 24 });
  const { setToolbar } = useToolbar();
  const { user } = useUser();

  useEffect(() => {
    setToolbar("", true);

    // Set to a restricted display when the user's day takes place within the 24 hours.
    // When the user's day takes place within two different days - the display won't be rectricted.
    if (user?.endDayHour === 0) {
      setDayHours({ beginDayHour: user?.beginDayHour, endDayHour: 24 });
    } else if (user?.beginDayHour <= user?.endDayHour) {
      setDayHours({
        beginDayHour: user?.beginDayHour,
        endDayHour: user?.endDayHour,
      });
    }

    // TODO: arrange the dates according to the clicked date
    ScheduleService.getSchedule(
      new Date("2023-01-01 00:00:00"),
      new Date("2050-12-31 00:00:00")
    ).then((data) => {
      const dataDisplay = data?.map((scheduleEntity) => {
        return {
          id: scheduleEntity.id,
          title: scheduleEntity.title,
          startDate: scheduleEntity.startTime,
          endDate: scheduleEntity.endTime,
          color: scheduleEntity.tag?.color,
          isTask: scheduleEntity.isTask,
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
