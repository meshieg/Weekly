import React, { useContext, useEffect, useState } from "react";
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
import useUser from "../../customHooks/useUser";
import MessageDialog from "../../components/MessageDialog/MessageDialog";
import { useAppContext } from "../../contexts/AppContext";
import Loading from "../../components/Loading/Loading";

const WeeklySchedule = () => {
  const [scheduleData, setScheduleData] = useState<AppointmentModel[]>([]);
  const [currDate, setCurrDate] = useState(new Date());
  const [dayHours, setDayHours] = useState({ beginDayHour: 0, endDayHour: 24 });
  const navigate = useNavigate();
  const { user } = useUser();
  const { popupMessage, setPopupMessage } = useAppContext();
  const [dataLoading, setDataLoading] = useState(false);

  const onAppointmentClick = (id: number, isTask: boolean) => {
    if (isTask) {
      navigate("/display-task", {
        state: {
          taskId: id,
          isFromDB: true,
        },
      });
    } else {
      navigate("/display-event", {
        state: {
          eventId: id,
          isFromDB: true,
        },
      });
    }
  };

  const Appointment = ({
    children,
    data,
    ...restProps
  }: Appointments.AppointmentProps) => {
    return (
      <Appointments.Appointment
        {...restProps}
        onClick={() => onAppointmentClick(data?.id as number, data?.isTask)}
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
      <WeekView.DayScaleCell
        {...restProps}
        onClick={(event: any) => navigate("/day")}
      />
    );
  };

  useEffect(() => {
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

    setDataLoading(true);
    ScheduleService.getSchedule(
      new Date("2023-01-01 00:00:00"),
      new Date("2050-12-31 00:00:00")
    )
      .then((data) => {
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
      })
      .finally(() => setDataLoading(false));
  }, []);

  if (dataLoading) {
    return <Loading />;
  }

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

      <MessageDialog
        open={popupMessage !== undefined}
        onClose={() => {
          setPopupMessage(undefined);
        }}
        title={popupMessage?.title}
        message={popupMessage?.message}
        extraMessage={popupMessage?.extraMessage}
        primaryButtonText={popupMessage?.primaryButtonText}
        icon={popupMessage?.icon}
        primaryButtonAction={() => setPopupMessage(undefined)}
      />
    </Paper>
  );
};

export default WeeklySchedule;
