import { AxiosInstance } from "../config/axios";

const eventPrefix = `${process.env.REACT_APP_BACKEND_URL}/event`;
export class EventService {
  static getEventById = async (eventId: number): Promise<IEvent | void> => {
    const url = `${eventPrefix}/${eventId}`;
    return AxiosInstance.get(url)
      .then((res) => {
        return {
          ...res.data,
          startTime: new Date(res.data.startTime),
          endTime: new Date(res.data.endTime),
        } as IEvent;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static updateEvent = async (updatedEvent: IEvent): Promise<IEvent | void> => {
    const url = `${eventPrefix}/${updatedEvent.id}`;
    return AxiosInstance.put(url, {
      event: updatedEvent,
    })
      .then((res) => {
        return {
          ...res.data,
          startTime: new Date(res.data.startTime),
          endTime: new Date(res.data.endTime),
        } as IEvent;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static deleteEvent = async (eventId: number) => {
    const url = `${eventPrefix}/delete/${eventId}`;
    return AxiosInstance.put(url)
      .then((res) => {
        if (res.data) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
}
