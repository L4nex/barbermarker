import { CreateScheduleTimeDTO } from "../dtos/ScheduleTime/CreateScheduleTimeDTO";
import { FindByDateAndBarberIdDTO } from "../dtos/ScheduleTime/FindByDateAndBarberIdDTO";
import { ScheduleTime } from "../typeorm/entities/ScheduleTime";

export interface IScheduleTime {
  /**
   * Cria scheduleTime
   * @param data Dados para criar scheduleTime
   */
  create(data: CreateScheduleTimeDTO): Promise<ScheduleTime>;

  /**
   * Cria todos scheduleTime
   * @param data Dados para criar scheduleTime
   */
  createAll(data: CreateScheduleTimeDTO[]): Promise<ScheduleTime[]>;

  /**
   * Lista todos os scheduleTimes
   */
  listAll(): Promise<ScheduleTime[]>;

  /**
   * Busca ScheduleTime pelo ID
   * @param id ID de ScheduleTime
   */
  listOne(id: number): Promise<ScheduleTime>;

  /**
   * Atualiza ScheduleTime
   * @param expense ScheduleTime a ser atualizado
   */
  save(expense: ScheduleTime): Promise<ScheduleTime>;

  /**
   *  Inativa um scheduleTime
   * @param id ID de scheduleTime a ser deletado
   */
  remove(id: number): Promise<void>;

  /**
   *  Deleta um scheduleTime
   * @param id ID de scheduleTime a ser deletado
   */
  delete(id: number): Promise<void>;

  /**
   * Busca scheduleTime com base na data e id do barber
   * @param data data e barber_id
   */
  findByDateAndBarberId(
    data: FindByDateAndBarberIdDTO
  ): Promise<ScheduleTime[]>;

  /**
   * Busca scheduleTime com base no id e id do barber
   * @param id id
   * @param barber_id barber_id
   */
  findByIdAndBarberId(id: number, barber_id: number): Promise<ScheduleTime>;
}
