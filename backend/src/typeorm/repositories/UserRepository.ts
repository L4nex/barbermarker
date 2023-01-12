import { Repository } from 'typeorm';
import { CreateUserDTO } from '../../dtos/User/CreateUserDTO';
import { User } from '../../typeorm/entities/User';
import { IUser } from '../../interfaces/IUser';
import { AppDataSource } from '../../data-source';

export class UserRepository
    implements IUser {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    // Cria registro de user
    async create(data: CreateUserDTO): Promise<User> {
        const user = this.repository.create(data);
        await this.repository.save(user);
        return user;
    }

    // Lista todos os registros de users
    async listAll(
    ): Promise<User[]> {

        // Executa query
        const users = this.repository.find();

        // Retorna users
        return users;
    }

    /**
     * Busca User pelo ID
     * @param id ID de User
     */
    async listOne(id: number): Promise<User> {
        const user = await this.repository.findOne({
            where: { id },
        });

        return user;
    }

    /**
     * Atualiza User
     * @param user User a ser atualizado
     * @returns User Atualizado
     */
    async save(user: User): Promise<User> {
        const userSaved = await this.repository.save({
            ...user
        });

        return userSaved;
    }

    /**
   *  Deleta user
   * @param id ID de user a ser deletado
   */
    async remove(
        id: number
    ): Promise<void> {
        // Busca user
        const user = await this.repository.findOne({
            where: { id },
        });

        // Delete User
        await this.repository.delete({
            ...user
        });
    }

    /**
     * Busca User pelo email
     * @param email email de user
     */
    async findUserByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where: { email: email },
        });

        return user;
    }
}
