import axiosConfig from "../axiosConfig";
import { AxiosResponse } from "axios";
import BarbershopDiscoveryDTO from "../DTO/BarbershopDiscoveryDTO";
import { BarberShopDTO } from "../DTO/BarberShopDTO";

export function findBarbershops(latitude: number, longitude: number) {
  return new Promise<BarbershopDiscoveryDTO[]>((resolve, reject) => {    
    axiosConfig
      .put(`/shopBarber/findNearlyBarberShop`, {
        latitude,
        longitude,
      })
      .then((response: AxiosResponse<any>) => {
        if (response.status > 300) reject();
        else resolve(response.data[0]);
      });
  });
}

export function findBarbershopById(barbershopId: number) {
  return new Promise<BarberShopDTO>((resolve, reject) => {
    axiosConfig
      .get(`/barberShop/${barbershopId}`)
      .then((response: AxiosResponse<BarberShopDTO>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}


export function findBarbershopsByName(barbershopName: number) {
  return new Promise<BarbershopDiscoveryDTO[]>((resolve, reject) => {
    axiosConfig
      .put(`/shopBarber/findByName`, {name: barbershopName})
      .then((response: AxiosResponse<BarbershopDiscoveryDTO[]>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}

export function findLastestBarbershops(idUser: number, limit = 10) {
  return new Promise<BarbershopDiscoveryDTO[]>((resolve, reject) => {
    axiosConfig
      .get(`/schedule/${idUser}/latestBarberShops?limit=${limit}`)
      .then((response: AxiosResponse<BarbershopDiscoveryDTO[]>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}

