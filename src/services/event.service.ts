import axios from "axios";

const eventPrefix = `${process.env.REACT_APP_BACKEND_URL}/event`;

export class EventService {
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
}
