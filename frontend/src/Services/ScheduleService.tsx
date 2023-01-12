import axiosConfig from "../axiosConfig";
import { AxiosResponse } from "axios";
import ScheduleDTO, { ScheduleShow } from "../DTO/ScheduleDTO";
import { ScheduleDateDTO } from "../DTO/ScheduleDateDTO";
import LastScheduleDTO from "../DTO/LastScheduleDTO";

export function findLastSchedules(idUser: number, limit = 10) {
  return new Promise<ScheduleShow[]>((resolve, reject) => {
    axiosConfig
      .get(`/schedule/${idUser}/latestBarberShops?limit=${limit}`)
      .then((response: AxiosResponse<ScheduleShow[]>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}

export function findBarberDates(idBarber: number, date: string) {
  return new Promise<ScheduleDateDTO[]>((resolve, reject) => {
    axiosConfig
      .put(`/findByDateAndBarberId`, {
        date,
        barber_id: idBarber,
      })
      .then((response: AxiosResponse<ScheduleDateDTO[]>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}

export function findLastestSchedules(idUser: number, limit = 10) {
  return new Promise<LastScheduleDTO[]>((resolve, reject) => {
    axiosConfig
      .get(`/schedules/${idUser}/lasts?limit=${limit}`)
      .then((response: AxiosResponse<LastScheduleDTO[]>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}

export function confirmarAgendamento(schedule: ScheduleDTO) {
  return new Promise<String[]>((resolve, reject) => {
    axiosConfig
      .post(`/schedule`, {
        schedule: {
          user_id: schedule.userId,
          barberShop_id: schedule.barbershop.id,
          service_id: schedule.service.id,
          scheduleTime_id: schedule.scheduleDate!.id,
          barber_id: schedule.barber!.id,
        },
      })
      .then((response: AxiosResponse<String[]>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}

export function finalizarAgendamento(scheduleId: number, avaliation: number) {
  return new Promise<Number>((resolve, reject) => {
    axiosConfig
      .put(`/scheduleAvaliation`, {
        scheduleId,
        avaliation,
      })
      .then((response: AxiosResponse<Number>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}

export function cancelarAgendamento(scheduleId: number) {
  return new Promise<Number>((resolve, reject) => {
    axiosConfig
      .delete(`/schedule/${scheduleId}`)
      .then((response: AxiosResponse<Number>) => {
        if (response.status > 300) reject();
        else resolve(response.data);
      });
  });
}