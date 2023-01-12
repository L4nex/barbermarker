import { CreateScheduleDTO } from "../dtos/Schedule/CreateScheduleDTO";
import { ScheduleAvaliationDTO } from "../dtos/Schedule/ScheduleAvaliationDTO";
import { Schedule } from "../typeorm/entities/Schedule";

export interface ISchedule {
  /**
   * Cria schedule
   * @param data Dados para criar schedule
   */
  create(data: CreateScheduleDTO): Promise<Schedule>;

  /**
   * Lista todos os schedules
   */
  listAll(): Promise<Schedule[]>;

  /**
   * Busca Schedule pelo ID
   * @param id ID de Schedule
   */
  listOne(id: number): Promise<Schedule>;

  /**
   * Atualiza Schedule
   * @param expense Schedule a ser atualizado
   */
  save(expense: Schedule): Promise<Schedule>;

  /**
   *  Deleta um schedule
   * @param id ID de schedule a ser deletado
   */
  remove(id: number): Promise<void>;

  /**
   * Buscas as ultimas 3 barbearias com base no id de user
   * @param idUser id de user
   * @param limit limite da busca
   */
  findUserLatestBarberShops(idUser: number, limit: number): Promise<Schedule[]>;

  /**
   * Buscas os schedules com base no barberId
   * @param idBarber id de barber
   */
  findSchedulesByBarberId(idBarber: number): Promise<Schedule[]>;
}
