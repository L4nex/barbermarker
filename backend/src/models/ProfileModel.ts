import { inject, injectable } from 'tsyringe';
import { CreateProfileDTO } from '../dtos/Profile/CreateProfileDTO';
import { IProfile } from '../interfaces/IProfile';
import { UpdateProfileDTO } from '../dtos/Profile/UpdateProfileDTO';
import { Profile } from '../typeorm/entities/Profile';

// Model para Profile
@injectable()
export class ProfileModel {

  /**
   * Construtor
   * @param profileRepository Repositorio de Profile
   */

  constructor(
    @inject('ProfileRepository')
    private profileRepository: IProfile,
  ) { }

  /**
   * Cria Profile
   * @returns Profile
   */
  async create(data: CreateProfileDTO): Promise<Profile> {
    // Cria Profile
    const profile = await this.profileRepository.create(data);

    return profile;
  }

    /**
   * Lista todos os profiles
   * @returns Profiles
   */

  async listAll(): Promise<Profile[]> {
    // Lista Profiles
    const profiles = await this.profileRepository.listAll();

    return profiles;
  }

    async listOne(id: number): Promise<Profile> {
    // Lista Profiles
    const profile = await this.profileRepository.listOne(id);

    return profile;
  }

    /**
   * Altera Profile
   * @returns Profile
   */
     async update(data: UpdateProfileDTO, id: number): Promise<Profile> {

    // Busca Profile pelo id
    const profileFound =
      await this.profileRepository.listOne(
        id,
      );

    // Atualiza Profile
    profileFound.name = data.name;
    profileFound.description = data.description;

    await this.profileRepository.save(profileFound);

    return profileFound;
    }

    async remove(id: number): Promise<Boolean> {
      // Lista Profiles
      await this.profileRepository.remove(id);
      
      return true;
    }
}