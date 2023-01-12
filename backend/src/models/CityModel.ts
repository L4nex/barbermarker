import { inject, injectable } from 'tsyringe';
import { CreateCityDTO } from '../dtos/City/CreateCityDTO';
import { ICity } from '../interfaces/ICity';
import { UpdateCityDTO } from '../dtos/City/UpdateCityDTO';
import { City } from '../typeorm/entities/City';

// Model para City
@injectable()
export class CityModel {

  /**
   * Construtor
   * @param cityRepository Repositorio de City
   */

  constructor(
    @inject('CityRepository')
    private cityRepository: ICity,
  ) { }

  /**
   * Cria City
   * @returns City
   */
  async create(data: CreateCityDTO): Promise<City> {
    // Cria City
    const city = await this.cityRepository.create(data);

    return city;
  }

    /**
   * Lista todos os cities
   * @returns Cities
   */

  async listAll(): Promise<City[]> {
    // Lista Cities
    const cities = await this.cityRepository.listAll();

    return cities;
  }

    async listOne(id: number): Promise<City> {
    // Lista Cities
    const city = await this.cityRepository.listOne(id);

    return city;
  }

    /**
   * Altera City
   * @returns City
   */
     async update(data: UpdateCityDTO, id: number): Promise<City> {

    // Busca City pelo id
    const cityFound =
      await this.cityRepository.listOne(
        id,
      );

    // Atualiza City
    cityFound.name = data.name;
    cityFound.state_id = data.state_id;

    await this.cityRepository.save(cityFound);

    return cityFound;
    }

    async remove(id: number): Promise<Boolean> {
      // Lista Cities
      await this.cityRepository.remove(id);
      
      return true;
    }
}