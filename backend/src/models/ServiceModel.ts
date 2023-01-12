import { inject, injectable } from 'tsyringe';
import { CreateServiceDTO } from '../dtos/Service/CreateServiceDTO';
import { IService } from '../interfaces/IService';
import { UpdateServiceDTO } from '../dtos/Service/UpdateServiceDTO';
import { Service } from '../typeorm/entities/Service';

// Model para Service
@injectable()
export class ServiceModel {

  /**
   * Construtor
   * @param serviceRepository Repositorio de Service
   */

  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IService,
  ) { }

  /**
   * Cria Service
   * @returns Service
   */
  async create(data: CreateServiceDTO): Promise<Service> {
    // Cria Service
    const service = await this.serviceRepository.create(data);

    return service;
  }

    /**
   * Lista todos os services
   * @returns Services
   */

  async listAll(): Promise<Service[]> {
    // Lista Services
    const services = await this.serviceRepository.listAll();

    return services;
  }

    async listOne(id: number): Promise<Service> {
    // Lista Services
    const service = await this.serviceRepository.listOne(id);

    return service;
  }

    /**
   * Altera Service
   * @returns Service
   */
     async update(data: UpdateServiceDTO, id: number): Promise<Service> {

    // Busca Service pelo id
    const serviceFound =
      await this.serviceRepository.listOne(
        id,
      );

    // Atualiza Service
    serviceFound.name = data.name;
    serviceFound.description = data.description;
    serviceFound.price = data.price;
    serviceFound.barberShop_id = data.barberShop_id;

    await this.serviceRepository.save(serviceFound);

    return serviceFound;
    }

    async remove(id: number): Promise<Boolean> {
      // Lista Services
      await this.serviceRepository.remove(id);
      
      return true;
    }

    async findByBarberShop(idBarberShop: number): Promise<Service[]> {
      // Busca services com base no id da barbearia
      const services = await this.serviceRepository.findByBarberShop(idBarberShop);
  
      return services;
    }
}