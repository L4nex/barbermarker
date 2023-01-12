import { BarberShopDTO } from "./BarberShopDTO";
import BarbershopServiceDTO from "./BarbershopServiceDTO";
import { ScheduleDateDTO } from "./ScheduleDateDTO";

export default interface LastScheduleDTO {
  id: number;
  active: boolean;
  barberShop: BarberShopDTO;
  service: BarbershopServiceDTO;
  scheduleTime: ScheduleDateDTO;
}
