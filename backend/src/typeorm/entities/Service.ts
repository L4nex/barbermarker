import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Barber } from "./Barber";
import { Schedule } from "./Schedule";
import { BarberShop } from "./BarberShop";

@Index("fk_services_barberShop1_idx", ["barberShop_id"], {})
@Entity("service", { schema: "bm_dev" })
export class Service {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 45 })
  description: string | null;

  @Column("double", { name: "price", nullable: true, precision: 22 })
  price: number | null;

  @Column("int", { name: "barberShop_id" })
  barberShop_id: number;

  @OneToMany(() => Barber, (barber) => barber.service)
  barbers: Barber[];

  @OneToMany(() => Schedule, (schedule) => schedule.service)
  schedules: Schedule[];

  @ManyToOne(() => BarberShop, (barberShop) => barberShop.services, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "barberShop_id", referencedColumnName: "id" }])
  barberShop: BarberShop;
}
