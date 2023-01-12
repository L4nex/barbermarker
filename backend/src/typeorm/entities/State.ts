import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";

@Entity("state", { schema: "bm_dev" })
export class State {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", {
    name: "uf",
    comment:
      "Unidade federativa:\nEx: Santa Catarina = SC\nSão Paulo = SP\nAcre = AC",
    length: 2,
  })
  uf: string;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
}
