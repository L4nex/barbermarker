import { findUserByEmail } from './../controllers/UserController';
import { CreateUserDTO } from '../dtos/User/CreateUserDTO';
import { User } from '../typeorm/entities/User';

export interface IUser {
    
  /**
   * Cria user
   * @param data Dados para criar user
   */
  create(data: CreateUserDTO): Promise<User>;

  /**
   * Lista todos os users
   */
     listAll(
    ): Promise<User[]>;
  
  /**
   * Busca User pelo ID
   * @param id ID de User
   */
  listOne(id: number): Promise<User>;

    /**
   * Atualiza User
   * @param expense User a ser atualizado
   */
     save(expense: User): Promise<User>;

  /**
   *  Deleta um user
   * @param id ID de user a ser deletado
   */
  remove(
    id: number,
  ): Promise<void>;

    /**
   * Busca User pelo email
   * @param email email de user
   */
     findUserByEmail(email: string): Promise<User>;
}
