import { Repository } from 'typeorm';
import { CreateCityDTO } from '../../dtos/City/CreateCityDTO';
import { City } from '../../typeorm/entities/City';
import { ICity } from '../../interfaces/ICity';
import { AppDataSource } from '../../data-source';

export class CityRepository
    implements ICity {
    private repository: Repository<City>;

    constructor() {
        this.repository = AppDataSource.getRepository(City);
    }

    // Cria registro de city
    async create(data: CreateCityDTO): Promise<City> {
        const city = this.repository.create(data);
        await this.repository.save(city);
        return city;
    }

    // Lista todos os registros de cities
    async listAll(
    ): Promise<City[]> {

        // Executa query
        const cities = this.repository.find();

        // Retorna cities
        return cities;
    }

    /**
     * Busca City pelo ID
     * @param id ID de City
     */
    async listOne(id: number): Promise<City> {
        const city = await this.repository.findOne({
            where: { id },
        });

        return city;
    }

    /**
     * Atualiza City
     * @param city City a ser atualizado
     * @returns City Atualizado
     */
    async save(city: City): Promise<City> {
        const citySaved = await this.repository.save({
            ...city
        });

        return citySaved;
    }

    /**
   *  Deleta city
   * @param id ID de city a ser deletado
   */
    async remove(
        id: number
    ): Promise<void> {
        // Busca city
        const city = await this.repository.findOne({
            where: { id },
        });

        // Delete City
        await this.repository.delete({
            ...city
        });
    }
}
