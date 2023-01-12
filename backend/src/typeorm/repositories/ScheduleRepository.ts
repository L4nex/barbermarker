import { Repository } from "typeorm";
import { CreateScheduleDTO } from "../../dtos/Schedule/CreateScheduleDTO";
import { Schedule } from "../../typeorm/entities/Schedule";
import { ISchedule } from "../../interfaces/ISchedule";
import { AppDataSource } from "../../data-source";

export class ScheduleRepository implements ISchedule {
  private repository: Repository<Schedule>;

  constructor() {
    this.repository = AppDataSource.getRepository(Schedule);
  }

  // Cria registro de schedule
  async create(data: CreateScheduleDTO): Promise<Schedule> {
    const scheduleToCreate = {
      user_id: data.user_id,
      barberShop_id: data.barberShop_id,
      service_id: data.service_id,
      scheduleTime_id: data.scheduleTime_id,
      active: data.active,
    };
    const schedule = this.repository.create(scheduleToCreate);
    await this.repository.save(schedule);
    return schedule;
  }

  // Lista todos os registros de schedules
  async listAll(): Promise<Schedule[]> {
    // Executa query
    const schedules = this.repository.find();

    // Retorna schedules
    return schedules;
  }

  /**
   * Busca Schedule pelo ID
   * @param id ID de Schedule
   */
  async listOne(id: number): Promise<Schedule> {
    const schedule = await this.repository.findOne({
      where: { id },
    });

    return schedule;
  }

  /**
   * Atualiza Schedule
   * @param schedule Schedule a ser atualizado
   * @returns Schedule Atualizado
   */
  async save(schedule: Schedule): Promise<Schedule> {
    const scheduleSaved = await this.repository.save({
      ...schedule,
    });

    return scheduleSaved;
  }

  /**
   *  Deleta schedule
   * @param id ID de schedule a ser deletado
   */
  async remove(id: number): Promise<void> {
    // Busca schedule
    const schedule = await this.repository.findOne({
      where: { id },
    });

    // Delete Schedule
    await this.repository.delete({
      ...schedule,
    });
  }

  async findUserLatestBarberShops(
    idUser: number,
    limit: number
  ): Promise<Schedule[]> {
    const lastBarberShops = await this.repository.find({
      where: { user_id: idUser },
      relations: {
        barberShop: true,
        service: true,
        scheduleTime: true,
      },
      take: limit,
      order: {
        id: "DESC",
      },
    });

    return lastBarberShops;
  }

  async findSchedulesByBarberId(idBarber: number): Promise<Schedule[]> {
    const schedules = await this.repository
      .createQueryBuilder("schedule")
      .innerJoinAndSelect("schedule.user", "user")
      .innerJoinAndSelect("schedule.service", "service")
      .innerJoinAndSelect("schedule.scheduleTime", "scheduleTime")
      .where("scheduleTime.barber_id = :barberId", { barberId: idBarber })
      .getMany();

    return schedules;
  }
}
