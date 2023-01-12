import { CreateProfileDTO } from '../dtos/Profile/CreateProfileDTO';
import { Profile } from '../typeorm/entities/Profile';

export interface IProfile {
    
  /**
   * Cria profile
   * @param data Dados para criar profile
   */
  create(data: CreateProfileDTO): Promise<Profile>;

  /**
   * Lista todos os profiles
   */
     listAll(
    ): Promise<Profile[]>;
  
  /**
   * Busca Profile pelo ID
   * @param id ID de Profile
   */
  listOne(id: number): Promise<Profile>;

    /**
   * Atualiza Profile
   * @param expense Profile a ser atualizado
   */
     save(expense: Profile): Promise<Profile>;

  /**
   *  Deleta um profile
   * @param id ID de profile a ser deletado
   */
  remove(
    id: number,
  ): Promise<void>;
}
