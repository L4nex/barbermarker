import BarberDTO from "./BarberDTO";
import { BarberShopDTO } from "./BarberShopDTO";
import BarbershopServiceDTO from "./BarbershopServiceDTO";
import { ScheduleDateDTO } from "./ScheduleDateDTO";

export default interface ScheduleDTO {
    uuid?: string,
    userId?: number,
    service: BarbershopServiceDTO,
    barbershop: BarberShopDTO,
    barber?: BarberDTO,
    scheduleDate?: ScheduleDateDTO,
    active?: boolean;
}

export interface ScheduleShow {
    barbershop: BarberShopDTO
}