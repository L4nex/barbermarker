import { Repository } from 'typeorm';
import { CreateAddressDTO } from '../../dtos/Address/CreateAddressDTO';
import { Address } from '../../typeorm/entities/Address';
import { IAddress } from '../../interfaces/IAddress';
import { AppDataSource } from '../../data-source';

export class AddressRepository
    implements IAddress {
    private repository: Repository<Address>;

    constructor() {
        this.repository = AppDataSource.getRepository(Address);
    }

    // Cria registro de address
    async create(data: CreateAddressDTO): Promise<Address> {
        const address = this.repository.create(data);
        await this.repository.save(address);
        return address;
    }

    // Lista todos os registros de addresses
    async listAll(
    ): Promise<Address[]> {

        // Executa query
        const addresses = this.repository.find();

        // Retorna addresses
        return addresses;
    }

    /**
     * Busca Address pelo ID
     * @param id ID de Address
     */
    async listOne(id: number): Promise<Address> {
        const address = await this.repository.findOne({
            where: { id },
        });

        return address;
    }

    /**
     * Atualiza Address
     * @param address Address a ser atualizado
     * @returns Address Atualizado
     */
    async save(address: Address): Promise<Address> {
        const addressSaved = await this.repository.save({
            ...address
        });

        return addressSaved;
    }

    /**
   *  Deleta address
   * @param id ID de address a ser deletado
   */
    async remove(
        id: number
    ): Promise<void> {
        // Busca address
        const address = await this.repository.findOne({
            where: { id },
        });

        // Delete Address
        await this.repository.delete({
            ...address
        });
    }
}
