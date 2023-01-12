import { CreateCityDTO } from '../dtos/City/CreateCityDTO';
import { City } from '../typeorm/entities/City';

export interface ICity {
    
  /**
   * Cria city
   * @param data Dados para criar city
   */
  create(data: CreateCityDTO): Promise<City>;

  /**
   * Lista todos os cities
   */
     listAll(
    ): Promise<City[]>;
  
  /**
   * Busca City pelo ID
   * @param id ID de City
   */
  listOne(id: number): Promise<City>;

    /**
   * Atualiza City
   * @param expense City a ser atualizado
   */
     save(expense: City): Promise<City>;

  /**
   *  Deleta um city
   * @param id ID de city a ser deletado
   */
  remove(
    id: number,
  ): Promise<void>;
}
