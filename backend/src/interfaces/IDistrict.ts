import { CreateDistrictDTO } from '../dtos/District/CreateDistrictDTO';
import { District } from '../typeorm/entities/District';

export interface IDistrict {
    
  /**
   * Cria district
   * @param data Dados para criar district
   */
  create(data: CreateDistrictDTO): Promise<District>;

  /**
   * Lista todos os districts
   */
     listAll(
    ): Promise<District[]>;
  
  /**
   * Busca District pelo ID
   * @param id ID de District
   */
  listOne(id: number): Promise<District>;

    /**
   * Atualiza District
   * @param expense District a ser atualizado
   */
     save(expense: District): Promise<District>;

  /**
   *  Deleta um district
   * @param id ID de district a ser deletado
   */
  remove(
    id: number,
  ): Promise<void>;
}
