import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { State } from "./State";
import { District } from "./District";

@Index("fk_city_state_idx", ["state_id"], {})
@Entity("city", { schema: "bm_dev" })
export class City {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("int", { name: "state_id" })
  state_id: number;

  @ManyToOne(() => State, (state) => state.cities, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "state_id", referencedColumnName: "id" }])
  state: State;

  @OneToMany(() => District, (district) => district.city)
  districts: District[];
}
