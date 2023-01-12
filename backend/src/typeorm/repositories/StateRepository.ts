import { Repository } from 'typeorm';
import { CreateStateDTO } from '../../dtos/State/CreateStateDTO';
import { State } from '../../typeorm/entities/State';
import { IState } from '../../interfaces/IState';
import { AppDataSource } from '../../data-source';

export class StateRepository
    implements IState {
    private repository: Repository<State>;

    constructor() {
        this.repository = AppDataSource.getRepository(State);
    }

    // Cria registro de state
    async create(data: CreateStateDTO): Promise<State> {
        const state = this.repository.create(data);
        await this.repository.save(state);
        return state;
    }

    // Lista todos os registros de states
    async listAll(
    ): Promise<State[]> {

        // Executa query
        const states = this.repository.find();

        // Retorna states
        return states;
    }

    /**
     * Busca State pelo ID
     * @param id ID de State
     */
    async listOne(id: number): Promise<State> {
        const state = await this.repository.findOne({
            where: { id },
        });

        return state;
    }

    /**
     * Atualiza State
     * @param state State a ser atualizado
     * @returns State Atualizado
     */
    async save(state: State): Promise<State> {
        const stateSaved = await this.repository.save({
            ...state
        });

        return stateSaved;
    }

    /**
   *  Deleta state
   * @param id ID de state a ser deletado
   */
    async remove(
        id: number
    ): Promise<void> {
        // Busca state
        const state = await this.repository.findOne({
            where: { id },
        });

        // Delete State
        await this.repository.delete({
            ...state
        });
    }
}
