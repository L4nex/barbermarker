import BarberDTO from "./BarberDTO";

export default interface ScheduleTime {
    id: number,
    active: boolean,
    date: Date,
    hour: Date,
    barber: BarberDTO
}