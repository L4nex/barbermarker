import { IDistrict } from './../../interfaces/IDistrict';
import { Repository } from 'typeorm';
import { CreateBarberDTO } from '../../dtos/Barber/CreateBarberDTO';
import { Barber } from '../../typeorm/entities/Barber';
import { IBarber } from '../../interfaces/IBarber';
import { AppDataSource } from '../../data-source';

export class BarberRepository
    implements IBarber {
    private repository: Repository<Barber>;

    constructor() {
        this.repository = AppDataSource.getRepository(Barber);
    }

    // Cria registro de barber
    async create(data: CreateBarberDTO): Promise<Barber> {
        const barber = this.repository.create(data);
        await this.repository.save(barber);
        return barber;
    }

    // Lista todos os registros de barbers
    async listAll(
    ): Promise<Barber[]> {

        // Executa query
        const barbers = this.repository.find();

        // Retorna barbers
        return barbers;
    }

    /**
     * Busca Barber pelo ID
     * @param id ID de Barber
     */
    async listOne(id: number): Promise<Barber> {
        const barber = await this.repository.findOne({
            where: { id },
        });

        return barber;
    }

    /**
     * Atualiza Barber
     * @param barber Barber a ser atualizado
     * @returns Barber Atualizado
     */
    async save(barber: Barber): Promise<Barber> {
        const barberSaved = await this.repository.save({
            ...barber
        });

        return barberSaved;
    }

    /**
   *  Deleta barber
   * @param id ID de barber a ser deletado
   */
    async remove(
        id: number
    ): Promise<void> {
        // Busca barber
        const barber = await this.repository.findOne({
            where: { id },
        });

        // Delete Barber
        await this.repository.delete({
            ...barber
        });
    }

    async findBarber(idBarberShop: number, idService: number): Promise<Barber[]> {

        const barbers = await this.repository.find({
            where: { barberShop_id: idBarberShop, service_id: idService },
            relations: { 
                user: true,
            }
        });

        return barbers;
    }

    async findBarberByBarberShop(idBarberShop: number): Promise<Barber[]> {

        const barbers = await this.repository
            .createQueryBuilder("barber")
            .innerJoinAndSelect("barber.user", "user")
            .where("barber.barberShop.id like :barberShop_id", { barberShop_id: `%${idBarberShop}%` })
            .groupBy("barber.user_id")
            .getMany();

        return barbers;
    }
}
