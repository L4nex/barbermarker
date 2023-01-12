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

@Index("fk_schedule_time_barber1_idx", ["barber_id"], {})
@Entity("scheduleTime", { schema: "bm_dev" })
export class ScheduleTime {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date" })
  date: Date;

  @Column("datetime", { name: "hour" })
  hour: Date;

  @Column("tinyint", { name: "active", width: 1, default: () => "'1'", })
  active: boolean;

  @Column("int", { name: "barber_id" })
  barber_id: number;

  @ManyToOne(() => Barber, (barber) => barber.scheduleTimes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "barber_id", referencedColumnName: "id" }])
  barber: Barber;

  @OneToMany(() => Schedule, (schedule) => schedule.scheduleTime)
  schedules: Schedule[];
}
