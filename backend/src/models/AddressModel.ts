import { inject, injectable } from 'tsyringe';
import { CreateAddressDTO } from '../dtos/Address/CreateAddressDTO';
import { IAddress } from '../interfaces/IAddress';
import { UpdateAddressDTO } from '../dtos/Address/UpdateAddressDTO';
import { Address } from '../typeorm/entities/Address';

// Model para Address
@injectable()
export class AddressModel {

  /**
   * Construtor
   * @param addressRepository Repositorio de Address
   */

  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddress,
  ) { }

  /**
   * Cria Address
   * @returns Address
   */
  async create(data: CreateAddressDTO): Promise<Address> {
    // Cria Address
    const address = await this.addressRepository.create(data);

    return address;
  }

    /**
   * Lista todos os addresses
   * @returns Addresses
   */

  async listAll(): Promise<Address[]> {
    // Lista Addresses
    const addresses = await this.addressRepository.listAll();

    return addresses;
  }

    async listOne(id: number): Promise<Address> {
    // Lista Addresses
    const address = await this.addressRepository.listOne(id);

    return address;
  }

    /**
   * Altera Address
   * @returns Address
   */
     async update(data: UpdateAddressDTO, id: number): Promise<Address> {

    // Busca Address pelo id
    const addressFound =
      await this.addressRepository.listOne(
        id,
      );

    // Atualiza Address
    addressFound.street = data.street;
    addressFound.number = data.number;
    addressFound.complement = data.complement;
    addressFound.district_id = data.district_id;

    await this.addressRepository.save(addressFound);

    return addressFound;
    }

    async remove(id: number): Promise<Boolean> {
      // Lista Addresses
      await this.addressRepository.remove(id);
      
      return true;
    }
}