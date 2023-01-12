import { inject, injectable } from 'tsyringe';
import { CreateStateDTO } from '../dtos/State/CreateStateDTO';
import { IState } from '../interfaces/IState';
import { UpdateStateDTO } from '../dtos/State/UpdateStateDTO';
import { State } from '../typeorm/entities/State';

// Model para State
@injectable()
export class StateModel {

  /**
   * Construtor
   * @param stateRepository Repositorio de State
   */

  constructor(
    @inject('StateRepository')
    private stateRepository: IState,
  ) { }

  /**
   * Cria State
   * @returns State
   */
  async create(data: CreateStateDTO): Promise<State> {
    // Cria State
    const state = await this.stateRepository.create(data);

    return state;
  }

    /**
   * Lista todos os states
   * @returns States
   */

  async listAll(): Promise<State[]> {
    // Lista States
    const states = await this.stateRepository.listAll();

    return states;
  }

    async listOne(id: number): Promise<State> {
    // Lista States
    const state = await this.stateRepository.listOne(id);

    return state;
  }

    /**
   * Altera State
   * @returns State
   */
     async update(data: UpdateStateDTO, id: number): Promise<State> {

    // Busca State pelo id
    const stateFound =
      await this.stateRepository.listOne(
        id,
      );

    // Atualiza State
    stateFound.name = data.name;
    stateFound.uf = data.uf;

    await this.stateRepository.save(stateFound);

    return stateFound;
    }

    async remove(id: number): Promise<Boolean> {
      // Lista States
      await this.stateRepository.remove(id);
      
      return true;
    }
}