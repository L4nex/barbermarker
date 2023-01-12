import { inject, injectable } from 'tsyringe';
import { CreateUserDTO } from '../dtos/User/CreateUserDTO';
import { IUser } from '../interfaces/IUser';
import { UpdateUserDTO } from '../dtos/User/UpdateUserDTO';
import { User } from '../typeorm/entities/User';

// Model para User
@injectable()
export class UserModel {

  /**
   * Construtor
   * @param userRepository Repositorio de User
   */

  constructor(
    @inject('UserRepository')
    private userRepository: IUser,
  ) { }

  /**
   * Cria User
   * @returns User
   */
  async create(data: CreateUserDTO): Promise<User> {
    // Cria User
    const user = await this.userRepository.create(data);

    return user;
  }

    /**
   * Lista todos os users
   * @returns Users
   */

  async listAll(): Promise<User[]> {
    // Lista Users
    const users = await this.userRepository.listAll();

    return users;
  }

    async listOne(id: number): Promise<User> {
    // Lista Users
    const user = await this.userRepository.listOne(id);

    return user;
  }

    /**
   * Altera User
   * @returns User
   */
     async update(data: UpdateUserDTO, id: number): Promise<User> {

    // Busca User pelo id
    const userFound =
      await this.userRepository.listOne(
        id,
      );

    // Atualiza User
    userFound.name = data.name;
    userFound.cpfCnpj = data.cpfCnpj;
    userFound.address_id = data.address_id;
    userFound.profile_id = data.profile_id;
    userFound.email = data.email;
    userFound.phone = data.phone;

    await this.userRepository.save(userFound);

    return userFound;
    }

    async remove(id: number): Promise<Boolean> {
      // Lista Users
      await this.userRepository.remove(id);
      
      return true;
    }

    async findUserByEmail(email: string): Promise<User> {
      // Busca user com base no email
      const user = await this.userRepository.findUserByEmail(email);
  
      return user;
    }
}