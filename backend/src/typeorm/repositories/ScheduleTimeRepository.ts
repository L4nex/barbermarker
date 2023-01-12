import { IDistrict } from "./../../interfaces/IDistrict";
import { Repository } from "typeorm";
import { CreateScheduleTimeDTO } from "../../dtos/ScheduleTime/CreateScheduleTimeDTO";
import { ScheduleTime } from "../../typeorm/entities/ScheduleTime";
import { IScheduleTime } from "../../interfaces/IScheduleTime";
import { AppDataSource } from "../../data-source";
import { FindByDateAndBarberIdDTO } from "../../dtos/ScheduleTime/FindByDateAndBarberIdDTO";
import { deflateRaw } from "zlib";

export class ScheduleTimeRepository implements IScheduleTime {
  private repository: Repository<ScheduleTime>;

  constructor() {
    this.repository = AppDataSource.getRepository(ScheduleTime);
  }

  // Cria registro de scheduleTime
  async create(data: CreateScheduleTimeDTO): Promise<ScheduleTime> {
    const scheduleTime = this.repository.create(data);
    await this.repository.save(scheduleTime);
    return scheduleTime;
  }

  // Cria registro de scheduleTime
  async createAll(data: CreateScheduleTimeDTO[]): Promise<ScheduleTime[]> {
    const scheduleTimes = this.repository.create(data);
    await this.repository.save(scheduleTimes);
    return scheduleTimes;
  }

  // Lista todos os registros de scheduleTimes
  async listAll(): Promise<ScheduleTime[]> {
    // Executa query
    const scheduleTimes = this.repository.find();

    // Retorna scheduleTimes
    return scheduleTimes;
  }

  /**
   * Busca ScheduleTime pelo ID
   * @param id ID de ScheduleTime
   */
  async listOne(id: number): Promise<ScheduleTime> {
    const scheduleTime = await this.repository.findOne({
      where: { id },
    });

    return scheduleTime;
  }

  /**
   * Atualiza ScheduleTime
   * @param scheduleTime ScheduleTime a ser atualizado
   * @returns ScheduleTime Atualizado
   */
  async save(scheduleTime: ScheduleTime): Promise<ScheduleTime> {
    const scheduleTimeSaved = await this.repository.save({
      ...scheduleTime,
    });

    return scheduleTimeSaved;
  }

  /**
   *  Inativa scheduleTime
   * @param id ID de scheduleTime a ser inativado
   */
  async remove(id: number): Promise<void> {
    // Busca scheduleTime
    const scheduleTime = await this.repository.findOne({
      where: { id },
    });

    // Delete ScheduleTime
    await this.repository.save({
      ...scheduleTime,
      active: false,
    });
  }

  /**
   *  Deleta scheduleTime
   * @param id ID de scheduleTime a ser deletado
   */
  async delete(id: number): Promise<void> {
    // Busca scheduleTime
    const scheduleTime = await this.repository.findOne({
      where: { id },
    });

    // Delete City
    await this.repository.delete({
      ...scheduleTime,
    });
  }

  async findByDateAndBarberId(
    data: FindByDateAndBarberIdDTO
  ): Promise<ScheduleTime[]> {
    const scheduleTimes = await this.repository.find({
      where: { date: data.date, barber_id: data.barber_id },
      order: { active: "DESC",  hour: "ASC"},
    });

    return scheduleTimes;
  }

  async findByIdAndBarberId(
    id: number,
    barber_id: number
  ): Promise<ScheduleTime> {
    const scheduleTime = await this.repository.findOne({
      where: { id: id, barber_id: barber_id },
    });

    return scheduleTime;
  }
}
