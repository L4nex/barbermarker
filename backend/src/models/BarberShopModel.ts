import { inject, injectable } from 'tsyringe';
import { CreateBarberShopDTO } from '../dtos/BarberShop/CreateBarberShopDTO';
import { IBarberShop } from '../interfaces/IBarberShop';
import { UpdateBarberShopDTO } from '../dtos/BarberShop/UpdateBarberShopDTO';
import { FindByNameBarberShopDTO } from '../dtos/BarberShop/FindByNameBarberShopDTO';
import { BarberShop } from '../typeorm/entities/BarberShop';
import { FindNearlyBarberShopDTO } from '../dtos/BarberShop/FindNearlyBarberShopDTO';

// Model para BarberShop
@injectable()
export class BarberShopModel {

  /**
   * Construtor
   * @param barberShopRepository Repositorio de BarberShop
   */

  constructor(
    @inject('BarberShopRepository')
    private barberShopRepository: IBarberShop,
  ) { }

  /**
   * Cria BarberShop
   * @returns BarberShop
   */
  async create(data: CreateBarberShopDTO): Promise<BarberShop> {
    // Cria BarberShop
    const barberShop = await this.barberShopRepository.create(data);

    return barberShop;
  }

  /**
 * Lista todos os barberShops
 * @returns BarberShops
 */

  async listAll(): Promise<BarberShop[]> {
    // Lista BarberShops
    const barberShops = await this.barberShopRepository.listAll();

    return barberShops;
  }

  async listOne(id: number): Promise<BarberShop> {
    // Lista BarberShops
    const barberShop = await this.barberShopRepository.listOne(id);

    return barberShop;
  }

  /**
 * Altera BarberShop
 * @returns BarberShop
 */
  async update(data: UpdateBarberShopDTO, id: number): Promise<BarberShop> {

    // Busca BarberShop pelo id
    const barberShopFound =
      await this.barberShopRepository.listOne(
        id,
      );

    // Atualiza BarberShop
    barberShopFound.name = data.name;
    barberShopFound.description = data.description;
    barberShopFound.address_id = data.address_id;
    barberShopFound.email = data.email;
    barberShopFound.phone = data.phone;
    barberShopFound.completeAddress = data.completeAddress;

    await this.barberShopRepository.save(barberShopFound);

    return barberShopFound;
  }

  async remove(id: number): Promise<Boolean> {
    // Lista BarberShops
    await this.barberShopRepository.remove(id);

    return true;
  }

  async findByName(data: FindByNameBarberShopDTO): Promise<BarberShop[]> {
    // Busca barberShop com base no nome
    const barberShop = await this.barberShopRepository.findByName(data);

    return barberShop
  }

  async findNearlyBarberShop(data: FindNearlyBarberShopDTO): Promise<BarberShop[]> {
    // Busca barberShop com base na localização do user
    const barberShop = await this.barberShopRepository.findNearlyBarberShop(data);

    return barberShop
  }

  async findBarberShopByEmail(email: string): Promise<BarberShop> {
    // Busca barbearia com base no email
    const barberShop = await this.barberShopRepository.findBarberShopByEmail(email);

    return barberShop;
  }
}