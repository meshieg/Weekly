import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  CurrentTimeIndicator,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentModel } from "../../utils/types";
import { ScheduleService } from "../../services/schedule.service";
import useToolbar from "../../customHooks/useToolbar";
import useUser from "../../customHooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_TAG } from "../../utils/constants";
import useAlert from "../../customHooks/useAlert";

const DailySchedule = () => {
  const [scheduleData, setScheduleData] = useState<AppointmentModel[]>();
  const [dayHours, setDayHours] = useState({ beginDayHour: 0, endDayHour: 24 });
  const { setToolbar } = useToolbar();
  const { user } = useUser();
  const navLocation = useLocation();
  const date = navLocation.state?.date;
  const navigate = useNavigate();
  const { setAlert } = useAlert();

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
          backgroundColor: data.color || DEFAULT_TAG.color,
          borderRadius: "4px",
        }}
      >
        {children}
      </Appointments.Appointment>
    );
  };

  const TimeScaleLabel = ({ ...restProps }: DayView.TimeScaleLabelProps) => {
    return (
      <DayView.TimeScaleLabel
        {...restProps}
        style={{
          backgroundColor:
            restProps.time &&
            restProps.time?.getHours() > dayHours.beginDayHour &&
            restProps.time?.getHours() < dayHours.endDayHour
              ? "var( --secondary-color)"
              : "white",
        }}
      />
    );
  };

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
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        dayHours?.beginDayHour,
        0,
        0
      ),
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        dayHours?.endDayHour,
        0,
        0
      )
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
      .catch((err) => {
        setAlert("error", "Something went wrong:( pleas try again later");
      });
  }, []);

  return (
    <Paper style={{ height: "100%" }}>
      <Scheduler data={scheduleData} height={"auto"}>
        <ViewState currentDate={date} />
        <DayView
          startDayHour={0}
          endDayHour={24}
          timeScaleLabelComponent={TimeScaleLabel}
        />
        <Appointments appointmentComponent={Appointment} />
        <CurrentTimeIndicator
          shadePreviousCells={true}
          shadePreviousAppointments={true}
        />
        <AllDayPanel />
      </Scheduler>
    </Paper>
  );
};

export default DailySchedule;
