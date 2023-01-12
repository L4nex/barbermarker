import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Service } from "./Service";
import { BarberShop } from "./BarberShop";
import { BarberTime } from "./BarberTime";
import { ScheduleTime } from "./ScheduleTime";

@Index("fk_user_has_barberShop_barberShop1_idx", ["barberShop_id"], {})
@Index("fk_user_has_barberShop_user1_idx", ["user_id"], {})
@Index("fk_serviceType_barber_idx", ["service_id"], {})
@Entity("barber", { schema: "bm_dev" })
export class Barber {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  user_id: number;

  @Column("int", { name: "barberShop_id" })
  barberShop_id: number;

  @Column("int", { name: "service_id" })
  service_id: number;

  @Column("varchar", { name: "observation", nullable: true, length: 100 })
  observation: string | null;

  @ManyToOne(() => User, (user) => user.barbers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Service, (service) => service.barbers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "service_id", referencedColumnName: "id" }])
  service: Service;

  @ManyToOne(() => BarberShop, (barberShop) => barberShop.barbers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "barberShop_id", referencedColumnName: "id" }])
  barberShop: BarberShop;

  @OneToMany(() => BarberTime, (barberTime) => barberTime.barber)
  barberTimes: BarberTime[];

  @OneToMany(() => ScheduleTime, (scheduleTime) => scheduleTime.barber)
  scheduleTimes: ScheduleTime[];
}
