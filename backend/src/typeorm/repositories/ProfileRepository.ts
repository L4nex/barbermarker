import { Repository } from 'typeorm';
import { CreateProfileDTO } from '../../dtos/Profile/CreateProfileDTO';
import { Profile } from '../../typeorm/entities/Profile';
import { IProfile } from '../../interfaces/IProfile';
import { AppDataSource } from '../../data-source';

export class ProfileRepository
    implements IProfile {
    private repository: Repository<Profile>;

    constructor() {
        this.repository = AppDataSource.getRepository(Profile);
    }

    // Cria registro de profile
    async create(data: CreateProfileDTO): Promise<Profile> {
        const profile = this.repository.create(data);
        await this.repository.save(profile);
        return profile;
    }

    // Lista todos os registros de profiles
    async listAll(
    ): Promise<Profile[]> {

        // Executa query
        const profiles = this.repository.find();

        // Retorna profiles
        return profiles;
    }

    /**
     * Busca Profile pelo ID
     * @param id ID de Profile
     */
    async listOne(id: number): Promise<Profile> {
        const profile = await this.repository.findOne({
            where: { id },
        });

        return profile;
    }

    /**
     * Atualiza Profile
     * @param profile Profile a ser atualizado
     * @returns Profile Atualizado
     */
    async save(profile: Profile): Promise<Profile> {
        const profileSaved = await this.repository.save({
            ...profile
        });

        return profileSaved;
    }

    /**
   *  Deleta profile
   * @param id ID de profile a ser deletado
   */
    async remove(
        id: number
    ): Promise<void> {
        // Busca profile
        const profile = await this.repository.findOne({
            where: { id },
        });

        // Delete Profile
        await this.repository.delete({
            ...profile
        });
    }
}
