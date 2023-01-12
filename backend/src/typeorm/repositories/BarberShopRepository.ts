import { Repository } from 'typeorm';
import { CreateBarberShopDTO } from '../../dtos/BarberShop/CreateBarberShopDTO';
import { BarberShop } from '../../typeorm/entities/BarberShop';
import { IBarberShop } from '../../interfaces/IBarberShop';
import { AppDataSource } from '../../data-source';
import { FindByNameBarberShopDTO } from '../../dtos/BarberShop/FindByNameBarberShopDTO';
import { FindNearlyBarberShopDTO } from '../../dtos/BarberShop/FindNearlyBarberShopDTO';

export class BarberShopRepository
    implements IBarberShop {
    private repository: Repository<BarberShop>;

    constructor() {
        this.repository = AppDataSource.getRepository(BarberShop);
    }

    // Cria registro de barberShop
    async create(data: CreateBarberShopDTO): Promise<BarberShop> {
        const barberShop = this.repository.create(data);
        await this.repository.save(barberShop);
        return barberShop;
    }

    // Lista todos os registros de barberShops
    async listAll(
    ): Promise<BarberShop[]> {

        // Executa query
        const barberShops = this.repository.find();

        // Retorna barberShops
        return barberShops;
    }

    /**
     * Busca BarberShop pelo ID
     * @param id ID de BarberShop
     */
    async listOne(id: number): Promise<BarberShop> {
        const barberShop = await this.repository.findOne({
            where: { id },
            relations: {
                services: true,
                barberShopImages: true,
            },
        });

        return barberShop;
    }

    /**
     * Atualiza BarberShop
     * @param barberShop BarberShop a ser atualizado
     * @returns BarberShop Atualizado
     */
    async save(barberShop: BarberShop): Promise<BarberShop> {
        const barberShopSaved = await this.repository.save({
            ...barberShop
        });

        return barberShopSaved;
    }

    /**
   *  Deleta barberShop
   * @param id ID de barberShop a ser deletado
   */
    async remove(
        id: number
    ): Promise<void> {
        // Busca barberShop
        const barberShop = await this.repository.findOne({
            where: { id },
        });

        // Delete BarberShop
        await this.repository.delete({
            ...barberShop
        });
    }

    async findByName(data: FindByNameBarberShopDTO): Promise<BarberShop[]> {

        const barberShops = await this.repository
            .createQueryBuilder("barberShop")
            .where("barberShop.name like :name", { name: `%${data.name}%` })
            .getMany();

        return barberShops;
    }

    async findNearlyBarberShop(data: FindNearlyBarberShopDTO): Promise<BarberShop[]> {

        const barberShops = await this.repository.query(`call getNearlyBarbershops (${data.latitude}, ${data.longitude})`);

        return barberShops;
    }

    /**
 * Busca Barbearia pelo email
 * @param email email da barbearia
 */
    async findBarberShopByEmail(email: string): Promise<BarberShop> {
        const barberShop = await this.repository.findOne({
            where: { email: email },
        });

        return barberShop;
    }
}