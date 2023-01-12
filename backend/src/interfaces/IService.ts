import { CreateServiceDTO } from "../dtos/Service/CreateServiceDTO";
import { Service } from "../typeorm/entities/Service";

export interface IService {
  /**
   * Cria service
   * @param data Dados para criar service
   */
  create(data: CreateServiceDTO): Promise<Service>;

  /**
   * Lista todos os services
   */
  listAll(): Promise<Service[]>;

  /**
   * Busca Service pelo ID
   * @param id ID de Service
   */
  listOne(id: number): Promise<Service>;

  /**
   * Atualiza Service
   * @param expense Service a ser atualizado
   */
  save(expense: Service): Promise<Service>;

  /**
   *  Deleta um service
   * @param id ID de service a ser deletado
   */
  remove(id: number): Promise<void>;

  /**
   * Busca service com base no id da barbearia
   * @param idBarberShop id da barbearia
   */
  findByBarberShop(idBarberShop: number): Promise<Service[]>;
}
