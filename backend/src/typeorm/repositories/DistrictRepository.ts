import { Repository } from 'typeorm';
import { CreateDistrictDTO } from '../../dtos/District/CreateDistrictDTO';
import { District } from '../../typeorm/entities/District';
import { IDistrict } from '../../interfaces/IDistrict';
import { AppDataSource } from '../../data-source';

export class DistrictRepository
    implements IDistrict {
    private repository: Repository<District>;

    constructor() {
        this.repository = AppDataSource.getRepository(District);
    }

    // Cria registro de district
    async create(data: CreateDistrictDTO): Promise<District> {
        const district = this.repository.create(data);
        await this.repository.save(district);
        return district;
    }

    // Lista todos os registros de districts
    async listAll(
    ): Promise<District[]> {

        // Executa query
        const districts = this.repository.find();

        // Retorna districts
        return districts;
    }

    /**
     * Busca District pelo ID
     * @param id ID de District
     */
    async listOne(id: number): Promise<District> {
        const district = await this.repository.findOne({
            where: { id },
        });

        return district;
    }

    /**
     * Atualiza District
     * @param district District a ser atualizado
     * @returns District Atualizado
     */
    async save(district: District): Promise<District> {
        const districtSaved = await this.repository.save({
            ...district
        });

        return districtSaved;
    }

    /**
   *  Deleta district
   * @param id ID de district a ser deletado
   */
    async remove(
        id: number
    ): Promise<void> {
        // Busca district
        const district = await this.repository.findOne({
            where: { id },
        });

        // Delete District
        await this.repository.delete({
            ...district
        });
    }
}
