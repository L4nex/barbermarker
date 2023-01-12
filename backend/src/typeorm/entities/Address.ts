import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BarberShop } from "./BarberShop";
import { User } from "./User";

@Index("fk_address_district1_idx", ["district_id"], {})
@Entity("address", { schema: "bm_dev" })
export class Address {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "street", length: 45 })
  street: string;

  @Column("varchar", {
    name: "number",
    nullable: true,
    comment: "Número do imóvel",
    length: 5,
  })
  number: string | null;

  @Column("varchar", {
    name: "complement",
    nullable: true,
    comment:
      "Informações adversas ao endereço,\nex: Número do apto;\nPonto de referencia.",
    length: 45,
  })
  complement: string | null;

  @Column("int", { name: "district_id" })
  district_id: number;

  @OneToMany(() => BarberShop, (barberShop) => barberShop.address)
  barberShops: BarberShop[];

  @OneToMany(() => User, (user) => user.address)
  users: User[];
}
