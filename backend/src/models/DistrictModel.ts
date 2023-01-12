import { inject, injectable } from 'tsyringe';
import { CreateDistrictDTO } from '../dtos/District/CreateDistrictDTO';
import { IDistrict } from '../interfaces/IDistrict';
import { UpdateDistrictDTO } from '../dtos/District/UpdateDistrictDTO';
import { District } from '../typeorm/entities/District';

// Model para District
@injectable()
export class DistrictModel {

  /**
   * Construtor
   * @param districtRepository Repositorio de District
   */

  constructor(
    @inject('DistrictRepository')
    private districtRepository: IDistrict,
  ) { }

  /**
   * Cria District
   * @returns District
   */
  async create(data: CreateDistrictDTO): Promise<District> {
    // Cria District
    const district = await this.districtRepository.create(data);

    return district;
  }

    /**
   * Lista todos os districts
   * @returns Districts
   */

  async listAll(): Promise<District[]> {
    // Lista Districts
    const districts = await this.districtRepository.listAll();

    return districts;
  }

    async listOne(id: number): Promise<District> {
    // Lista Districts
    const district = await this.districtRepository.listOne(id);

    return district;
  }

    /**
   * Altera District
   * @returns District
   */
     async update(data: UpdateDistrictDTO, id: number): Promise<District> {

    // Busca District pelo id
    const districtFound =
      await this.districtRepository.listOne(
        id,
      );

    // Atualiza District
    districtFound.name = data.name;
    districtFound.city_id = data.city_id;

    await this.districtRepository.save(districtFound);

    return districtFound;
    }

    async remove(id: number): Promise<Boolean> {
      // Lista Districts
      await this.districtRepository.remove(id);
      
      return true;
    }
}