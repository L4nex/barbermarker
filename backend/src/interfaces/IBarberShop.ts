import { CreateBarberShopDTO } from '../dtos/BarberShop/CreateBarberShopDTO';
import { FindByNameBarberShopDTO } from '../dtos/BarberShop/FindByNameBarberShopDTO';
import { FindNearlyBarberShopDTO } from '../dtos/BarberShop/FindNearlyBarberShopDTO';
import { BarberShop } from '../typeorm/entities/BarberShop';

export interface IBarberShop {

  /**
   * Cria barberShop
   * @param data Dados para criar barberShop
   */
  create(data: CreateBarberShopDTO): Promise<BarberShop>;

  /**
   * Lista todos os barberShops
   */
  listAll(
  ): Promise<BarberShop[]>;

  /**
   * Busca BarberShop pelo ID
   * @param id ID de BarberShop
   */
  listOne(id: number): Promise<BarberShop>;

  /**
 * Atualiza BarberShop
 * @param expense BarberShop a ser atualizado
 */
  save(expense: BarberShop): Promise<BarberShop>;

  /**
   *  Deleta um barberShop
   * @param id ID de barberShop a ser deletado
   */
  remove(
    id: number,
  ): Promise<void>;

  /**
  * Busca barberShop com base no nome
  * @param data nome para buscar barberShop
  */
  findByName(data: FindByNameBarberShopDTO): Promise<BarberShop[]>;

  /**
* Busca barberShop com base na localização do user
* @param data latitude e longitude
*/
  findNearlyBarberShop(data: FindNearlyBarberShopDTO): Promise<BarberShop[]>;

  /**
* Busca barbearia pelo email
* @param email email da barbearia
*/
  findBarberShopByEmail(email: string): Promise<BarberShop>;
}
