import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Service } from "./Service";
import { BarberShop } from "./BarberShop";
import { User } from "./User";
import { ScheduleTime } from "./ScheduleTime";

@Index("fk_schedule_user1_idx", ["user_id"], {})
@Index("fk_schedule_barberShop1_idx", ["barberShop_id"], {})
@Index("fk_service_schedule_idx", ["service_id"], {})
@Index("fk_scheduleTime", ["scheduleTime_id"], {})
@Entity("schedule", { schema: "bm_dev" })
export class Schedule {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  user_id: number;

  @Column("int", { name: "barberShop_id" })
  barberShop_id: number;

  @Column("int", { name: "service_id" })
  service_id: number;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  active: boolean | null;

  @Column("int", { name: "scheduleTime_id" })
  scheduleTime_id: number;

  @ManyToOne(() => Service, (service) => service.schedules, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "service_id", referencedColumnName: "id" }])
  service: Service;

  @ManyToOne(() => BarberShop, (barberShop) => barberShop.schedules, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "barberShop_id", referencedColumnName: "id" }])
  barberShop: BarberShop;

  @ManyToOne(() => User, (user) => user.schedules, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => ScheduleTime, (scheduleTime) => scheduleTime.schedules, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "scheduleTime_id", referencedColumnName: "id" }])
  scheduleTime: ScheduleTime;
}
