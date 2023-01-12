import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Barber } from "./Barber";

@Index("fk_barber_id_idx", ["barber_id"], {})
@Entity("barberTime", { schema: "bm_dev" })
export class BarberTime {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "times" })
  times: Date;

  @Column("binary", { name: "inUse", length: 1 })
  inUse: Buffer;

  @Column("int", { name: "barber_id" })
  barber_id: number;

  @ManyToOne(() => Barber, (barber) => barber.barberTimes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "barber_id", referencedColumnName: "id" }])
  barber: Barber;
}
