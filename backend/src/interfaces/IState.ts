import { CreateStateDTO } from '../dtos/State/CreateStateDTO';
import { State } from '../typeorm/entities/State';

export interface IState {
    
  /**
   * Cria state
   * @param data Dados para criar state
   */
  create(data: CreateStateDTO): Promise<State>;

  /**
   * Lista todos os states
   */
     listAll(
    ): Promise<State[]>;
  
  /**
   * Busca State pelo ID
   * @param id ID de State
   */
  listOne(id: number): Promise<State>;

    /**
   * Atualiza State
   * @param expense State a ser atualizado
   */
     save(expense: State): Promise<State>;

  /**
   *  Deleta um state
   * @param id ID de state a ser deletado
   */
  remove(
    id: number,
  ): Promise<void>;
}
