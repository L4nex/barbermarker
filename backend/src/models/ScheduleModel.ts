import { inject, injectable } from "tsyringe";
import { CreateScheduleDTO } from "../dtos/Schedule/CreateScheduleDTO";
import { ISchedule } from "../interfaces/ISchedule";
import { UpdateScheduleDTO } from "../dtos/Schedule/UpdateScheduleDTO";
import { Schedule } from "../typeorm/entities/Schedule";
import { BarberShop } from "../typeorm/entities/BarberShop";
import { IScheduleTime } from "../interfaces/IScheduleTime";
import { ScheduleAvaliationDTO } from "../dtos/Schedule/ScheduleAvaliationDTO";
import { IBarberShop } from "../interfaces/IBarberShop";

// Model para Schedule
@injectable()
export class ScheduleModel {
  /**
   * Construtor
   * @param scheduleRepository Repositorio de Schedule
   */

  constructor(
    @inject("ScheduleRepository")
    private scheduleRepository: ISchedule,
    @inject("ScheduleTimeRepository")
    private scheduleTimeRepository: IScheduleTime,
    @inject("BarberShopRepository")
    private barberShopRepository: IBarberShop
  ) {}

  /**
   * Cria Schedule
   * @returns Schedule
   */
  async create(data: CreateScheduleDTO): Promise<Schedule | String> {
    const scheduleTime = await this.scheduleTimeRepository.findByIdAndBarberId(
      data.scheduleTime_id,
      data.barber_id
    );

    if (!scheduleTime) {
      return "O barbeiro não possui este horário.";
    }

    if (!scheduleTime.active) {
      return "O horário selecionado não está mais disponível";
    }

    // Cria Schedule
    const schedule = await this.scheduleRepository.create(data);

    let turnActiveToFalse = scheduleTime;
    turnActiveToFalse.active = false;

    await this.scheduleTimeRepository.save(turnActiveToFalse);

    return schedule;
  }

  /**
   * Lista todos os schedules
   * @returns Schedules
   */

  async listAll(): Promise<Schedule[]> {
    // Lista Schedules
    const schedules = await this.scheduleRepository.listAll();

    return schedules;
  }

  async listOne(id: number): Promise<Schedule> {
    // Lista Schedules
    const schedule = await this.scheduleRepository.listOne(id);

    return schedule;
  }

  /**
   * Altera Schedule
   * @returns Schedule
   */
  async update(data: UpdateScheduleDTO, id: number): Promise<Schedule> {
    // Busca Schedule pelo id
    const scheduleFound = await this.scheduleRepository.listOne(id);

    // Atualiza Schedule
    scheduleFound.user_id = data.user_id;
    scheduleFound.barberShop_id = data.barberShop_id;
    scheduleFound.service_id = data.service_id;
    scheduleFound.scheduleTime_id = data.scheduleTime_id;
    scheduleFound.active = data.active;

    await this.scheduleRepository.save(scheduleFound);

    return scheduleFound;
  }

  async remove(id: number): Promise<Boolean> {
    // Remove Schedule
    const schedule = await this.scheduleRepository.listOne(id);

    const scheduleTime = await this.scheduleTimeRepository.listOne(
      schedule.scheduleTime_id
    );

    let turnActiveToTrue = scheduleTime;
    turnActiveToTrue.active = true;

    await this.scheduleTimeRepository.save(turnActiveToTrue);

    await this.scheduleRepository.remove(id);

    return true;
  }

  async findUserLatestBarberShops(
    idUser: number,
    limit: number
  ): Promise<BarberShop[]> {
    // Buscas as ultimas 3 barbearias com base no id de user
    const lastBarberShops =
      await this.scheduleRepository.findUserLatestBarberShops(idUser, limit);
    const barbershops = lastBarberShops.map((schedule) => schedule.barberShop);
    return barbershops;
  }

  async findUserSchedules(idUser: number, limit: number): Promise<Schedule[]> {
    // Buscas as ultimas 3 barbearias com base no id de user
    const lastSchedules =
      await this.scheduleRepository.findUserLatestBarberShops(idUser, limit);

    return lastSchedules;
  }

  async scheduleAvaliation(data: ScheduleAvaliationDTO): Promise<Number> {
    // Faz a avaliação do corte
    const schedule = await this.scheduleRepository.listOne(data.scheduleId);
    const barberShop = await this.barberShopRepository.listOne(
      schedule.barberShop_id
    );

    let rating = barberShop.rating;
    let totalVotes = barberShop.totalVotes;

    let ratingVotes = rating * totalVotes;
    let avaliation = ratingVotes + data.avaliation;

    totalVotes = totalVotes + 1;

    let finalAvaliation = avaliation / totalVotes;

    barberShop.totalVotes = totalVotes;
    barberShop.rating = Number(finalAvaliation.toFixed(2));
    schedule.active = false;

    await this.barberShopRepository.save(barberShop);
    await this.scheduleRepository.save(schedule);

    return finalAvaliation;
  }

  async findSchedulesByBarberId(
    idBarber: number
  ): Promise<Schedule[]> {
    // Busca os schedules com base no barberId
    const schedules =
      await this.scheduleRepository.findSchedulesByBarberId(idBarber);

    return schedules;
  }
}
