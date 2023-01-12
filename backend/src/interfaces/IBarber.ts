import { CreateBarberDTO } from "../dtos/Barber/CreateBarberDTO";
import { Barber } from "../typeorm/entities/Barber";

export interface IBarber {
  /**
   * Cria barber
   * @param data Dados para criar barber
   */
  create(data: CreateBarberDTO): Promise<Barber>;

  /**
   * Lista todos os barbers
   */
  listAll(): Promise<Barber[]>;

  /**
   * Busca Barber pelo ID
   * @param id ID de Barber
   */
  listOne(id: number): Promise<Barber>;

  /**
   * Atualiza Barber
   * @param expense Barber a ser atualizado
   */
  save(expense: Barber): Promise<Barber>;

  /**
   *  Deleta um barber
   * @param id ID de barber a ser deletado
   */
  remove(id: number): Promise<void>;

  /**
   * Busca barber com base no id da barbearia e id do service
   * @param idBarberShop id da barbearia
   * @param idService id do service
   */
  findBarber(idBarberShop: number, idService: number): Promise<Barber[]>;

  /**
   * Busca barber com base no id da barbearia
   * @param idBarberShop id da barbearia
   */
  findBarberByBarberShop(
    idBarberShop: number,
  ): Promise<Barber[]>;
}
