import React, { useEffect, useState } from "react";
import "./WeeklySchedule.css";
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
  CurrentTimeIndicator,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";

import { AppointmentModel } from "../../utils/types";
import { ScheduleService } from "../../services/schedule.service";
import { useNavigate } from "react-router-dom";
import useUser from "../../customHooks/useUser";
import MessageDialog from "../../components/MessageDialog/MessageDialog";
import { useAppContext } from "../../contexts/AppContext";
import Loading from "../../components/Loading/Loading";
import { DEFAULT_TAG } from "../../utils/constants";
import useAlert from "../../customHooks/useAlert";

const WeeklySchedule = () => {
  const [scheduleData, setScheduleData] = useState<AppointmentModel[]>([]);
  const [currDate, setCurrDate] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useUser();
  const { popupMessage, setPopupMessage } = useAppContext();
  const [dataLoading, setDataLoading] = useState(false);
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

  const DayScaleCell = ({ ...restProps }: WeekView.DayScaleCellProps) => {
    return (
      <WeekView.DayScaleCell
        {...restProps}
        onClick={() =>
          navigate("/day", {
            state: {
              date: restProps?.startDate,
            },
          })
        }
      />
    );
  };

  const colorCell = (time: Date | undefined) => {
    if (!time) {
      return false;
    }

    if (user.beginDayHour === user.endDayHour) {
      return true;
    }

    if (user.beginDayHour < user.endDayHour) {
      return (
        time.getHours() >= user.beginDayHour &&
        time.getHours() <= user.endDayHour
      );
    }

    if (user.beginDayHour > user.endDayHour) {
      return (
        time.getHours() >= user.beginDayHour ||
        time.getHours() <= user.endDayHour
      );
    }
  };

  const TimeScaleLabel = ({ ...restProps }: WeekView.TimeScaleLabelProps) => {
    return (
      <WeekView.TimeScaleLabel
        {...restProps}
        style={{
          backgroundColor: colorCell(restProps.time)
            ? "var( --secondary-color)"
            : "white",
        }}
      />
    );
  };

  useEffect(() => {
    setDataLoading(true);
    ScheduleService.getSchedule()
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
      })
      .finally(() => setDataLoading(false));
  }, []);

  if (dataLoading) {
    return <Loading />;
  }

  return (
    <Paper style={{ height: "100%" }}>
      <Scheduler data={scheduleData} height={"auto"}>
        <ViewState
          defaultCurrentDate={currDate}
          defaultCurrentViewName="Week"
        />

        <DayView
          startDayHour={0}
          endDayHour={24}
          timeScaleLabelComponent={TimeScaleLabel}
          cellDuration={60}
        />
        <WeekView
          startDayHour={0}
          endDayHour={24}
          dayScaleCellComponent={DayScaleCell}
          timeScaleLabelComponent={TimeScaleLabel}
          cellDuration={60}
        />

        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <Appointments appointmentComponent={Appointment} />
        <CurrentTimeIndicator />
        <AllDayPanel />
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
