import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";

@Index("fk_district_city1_idx", ["city_id"], {})
@Entity("district", { schema: "bm_dev" })
export class District {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", comment: "Nome do Bairro", length: 45 })
  name: string;

  @Column("int", { name: "city_id" })
  city_id: number;

  @ManyToOne(() => City, (city) => city.districts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: City;
}
