import axios from "axios";

const eventPrefix = `${process.env.REACT_APP_BACKEND_URL}/event`;

export class EventService {
  static getEventById = async (eventId: number): Promise<IEvent | void> => {
    const url = `${eventPrefix}/${eventId}`;
    return axios
      .get(url)
      .then((res) => {
        return res.data as IEvent;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static updateEvent = async (updatedEvent: IEvent): Promise<IEvent | void> => {
    const url = `${eventPrefix}/${updatedEvent.id}`;
    return axios
      .put(url, {
        event: updatedEvent,
      })
      .then((res) => {
        return res.data as IEvent;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static deleteEvent = async (eventId: number) => {
    const url = `${eventPrefix}/delete/${eventId}`;
    return axios
      .put(url)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };
}
