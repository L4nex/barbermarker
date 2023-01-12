import { CreateAddressDTO } from '../dtos/Address/CreateAddressDTO';
import { Address } from '../typeorm/entities/Address';

export interface IAddress {
    
  /**
   * Cria address
   * @param data Dados para criar address
   */
  create(data: CreateAddressDTO): Promise<Address>;

  /**
   * Lista todos os addresss
   */
     listAll(
    ): Promise<Address[]>;
  
  /**
   * Busca Address pelo ID
   * @param id ID de Address
   */
  listOne(id: number): Promise<Address>;

    /**
   * Atualiza Address
   * @param expense Address a ser atualizado
   */
     save(expense: Address): Promise<Address>;

  /**
   *  Deleta um address
   * @param id ID de address a ser deletado
   */
  remove(
    id: number,
  ): Promise<void>;
}
