import { AxiosResponse } from "axios";
import axiosConfig from "../axiosConfig";
import BarberDTO from "../DTO/BarberDTO";


export function findBarbersByBarbershop(barbershopId: number, serviceId: number) {
  return new Promise<BarberDTO[]>((resolve, reject) => {
    axiosConfig
      .get(`/findBarber/${barbershopId}/service/${serviceId}`)
      .then((response: AxiosResponse<any>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}
