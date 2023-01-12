import { Repository } from "typeorm";
import { CreateServiceDTO } from "../../dtos/Service/CreateServiceDTO";
import { Service } from "../../typeorm/entities/Service";
import { IService } from "../../interfaces/IService";
import { AppDataSource } from "../../data-source";

export class ServiceRepository implements IService {
  private repository: Repository<Service>;

  constructor() {
    this.repository = AppDataSource.getRepository(Service);
  }

  // Cria registro de service
  async create(data: CreateServiceDTO): Promise<Service> {
    const service = this.repository.create(data);
    await this.repository.save(service);
    return service;
  }

  // Lista todos os registros de services
  async listAll(): Promise<Service[]> {
    // Executa query
    const services = this.repository.find();

    // Retorna services
    return services;
  }

  /**
   * Busca Service pelo ID
   * @param id ID de Service
   */
  async listOne(id: number): Promise<Service> {
    const service = await this.repository.findOne({
      where: { id },
    });

    return service;
  }

  /**
   * Atualiza Service
   * @param service Service a ser atualizado
   * @returns Service Atualizado
   */
  async save(service: Service): Promise<Service> {
    const serviceSaved = await this.repository.save({
      ...service,
    });

    return serviceSaved;
  }

  /**
   *  Deleta service
   * @param id ID de service a ser deletado
   */
  async remove(id: number): Promise<void> {
    // Busca service
    const service = await this.repository.findOne({
      where: { id },
    });

    // Delete Service
    await this.repository.delete({
      ...service,
    });
  }

  async findByBarberShop(idBarberShop: number): Promise<Service[]> {
    const services = await this.repository.find({
      where: { barberShop_id: idBarberShop },
      relations: {
        barberShop: true,
      },
    });

    return services;
  }
}
