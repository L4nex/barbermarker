import { findBarberByBarberShop } from './../controllers/BarberController';
import { inject, injectable } from 'tsyringe';
import { CreateBarberDTO } from '../dtos/Barber/CreateBarberDTO';
import { IBarber } from '../interfaces/IBarber';
import { UpdateBarberDTO } from '../dtos/Barber/UpdateBarberDTO';
import { Barber } from '../typeorm/entities/Barber';
import { FindBarberDTO } from '../dtos/Barber/FindBarberDTO';

// Model para Barber
@injectable()
export class BarberModel {

  /**
   * Construtor
   * @param barberRepository Repositorio de Barber
   */

  constructor(
    @inject('BarberRepository')
    private barberRepository: IBarber,
  ) { }

  /**
   * Cria Barber
   * @returns Barber
   */
  async create(data: CreateBarberDTO): Promise<Barber> {
    // Cria Barber
    const barber = await this.barberRepository.create(data);

    return barber;
  }

    /**
   * Lista todos os barbers
   * @returns Barbers
   */

  async listAll(): Promise<Barber[]> {
    // Lista Barbers
    const barbers = await this.barberRepository.listAll();

    return barbers;
  }

    async listOne(id: number): Promise<Barber> {
    // Lista Barbers
    const barber = await this.barberRepository.listOne(id);

    return barber;
  }

    /**
   * Altera Barber
   * @returns Barber
   */
     async update(data: UpdateBarberDTO, id: number): Promise<Barber> {

    // Busca Barber pelo id
    const barberFound =
      await this.barberRepository.listOne(
        id,
      );

    // Atualiza Barber
    barberFound.user_id = data.user_id;
    barberFound.barberShop_id = data.barberShop_id;
    barberFound.service_id = data.service_id;
    barberFound.observation = data.observation;

    await this.barberRepository.save(barberFound);

    return barberFound;
    }

    async remove(id: number): Promise<Boolean> {
      // Lista Barbers
      await this.barberRepository.remove(id);
      
      return true;
    }

    async findBarber(idBarberShop: number, idService: number): Promise<FindBarberDTO[]> {
      // Busca barber com base no id da barbearia e id do service
      const barbers = await this.barberRepository.findBarber(idBarberShop, idService);
  
      return barbers.map(barber=> {return {
        id: barber.id,
        name: barber.user.name,
        photo: barber.user.photo,
        observation: barber.observation
      }})
    }

    async findBarberByBarberShop(idBarberShop: number): Promise<Barber[]> {
      // Busca barber com base no id da barbearia
      const barbers = await this.barberRepository.findBarberByBarberShop(idBarberShop);
  
      return barbers;
    }
}