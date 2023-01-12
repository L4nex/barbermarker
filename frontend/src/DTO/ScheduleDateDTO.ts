import moment from "moment";

export interface ScheduleDateDTO {
  id: number;
  date: string;
  hour: moment.Moment;
  active: boolean;
  barber_id: number;
}
