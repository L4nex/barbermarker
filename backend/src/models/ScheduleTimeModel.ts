import { inject, injectable } from 'tsyringe';
import { CreateScheduleTimeDTO } from '../dtos/ScheduleTime/CreateScheduleTimeDTO';
import { IScheduleTime } from '../interfaces/IScheduleTime';
import { UpdateScheduleTimeDTO } from '../dtos/ScheduleTime/UpdateScheduleTimeDTO';
import { ScheduleTime } from '../typeorm/entities/ScheduleTime';
import { FindByDateAndBarberIdDTO } from '../dtos/ScheduleTime/FindByDateAndBarberIdDTO';

// Model para ScheduleTime
@injectable()
export class ScheduleTimeModel {

  /**
   * Construtor
   * @param scheduleTimeRepository Repositorio de ScheduleTime
   */

  constructor(
    @inject('ScheduleTimeRepository')
    private scheduleTimeRepository: IScheduleTime,
  ) { }

  /**
   * Cria ScheduleTime
   * @returns ScheduleTime
   */
  async create(data: CreateScheduleTimeDTO): Promise<ScheduleTime> {
    // Cria ScheduleTime
    const scheduleTime = await this.scheduleTimeRepository.create(data);

    return scheduleTime;
  }

  /**
   * Cria vários ScheduleTime
   * @returns ScheduleTime
   */
   async createAll(data: CreateScheduleTimeDTO[]): Promise<ScheduleTime[]> {
    // Cria ScheduleTime    
    const scheduleTime = await this.scheduleTimeRepository.createAll(data);

    return scheduleTime;
  }

    /**
   * Lista todos os scheduleTimes
   * @returns ScheduleTimes
   */

  async listAll(): Promise<ScheduleTime[]> {
    // Lista ScheduleTimes
    const scheduleTimes = await this.scheduleTimeRepository.listAll();

    return scheduleTimes;
  }

    async listOne(id: number): Promise<ScheduleTime> {
    // Lista ScheduleTimes
    const scheduleTime = await this.scheduleTimeRepository.listOne(id);

    return scheduleTime;
  }

    /**
   * Altera ScheduleTime
   * @returns ScheduleTime
   */
     async update(data: UpdateScheduleTimeDTO, id: number): Promise<ScheduleTime> {

    // Busca ScheduleTime pelo id
    const scheduleTimeFound =
      await this.scheduleTimeRepository.listOne(
        id,
      );

    // Atualiza ScheduleTime
    scheduleTimeFound.date = data.date;
    scheduleTimeFound.hour = data.hour;
    scheduleTimeFound.active = data.active;
    scheduleTimeFound.barber_id = data.barber_id;

    await this.scheduleTimeRepository.save(scheduleTimeFound);

    return scheduleTimeFound;
    }

    async remove(id: number): Promise<Boolean> {
      // Busca ScheduleTimes
      await this.scheduleTimeRepository.remove(id);
      
      return true;
    }

    async delete(id: number): Promise<Boolean> {
      // Busca ScheduleTimes
      await this.scheduleTimeRepository.delete(id);
      
      return true;
    }

    async findByDateAndBarberId(data: FindByDateAndBarberIdDTO): Promise<ScheduleTime[]> {
      // Busca scheduleTime com base na localização do user
      const scheduleTime = await this.scheduleTimeRepository.findByDateAndBarberId(data);
  
      return scheduleTime
    }
}