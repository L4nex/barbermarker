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
import { Address } from "./Address";
import { Profile } from "./Profile";

@Index("fk_user_address1_idx", ["address_id"], {})
@Index("fk_user_profile1_idx", ["profile_id"], {})
@Entity("user", { schema: "bm_dev" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "cpfCnpj", nullable: true, length: 18 })
  cpfCnpj: string | null;

  @Column("int", { name: "address_id", nullable: true })
  address_id: number | null;

  @Column("int", { name: "profile_id", nullable: true })
  profile_id: number | null;

  @Column("varchar", { name: "email", length: 50 })
  email: string;

  @Column("varchar", { name: "phone", nullable: true, length: 45 })
  phone: string | null;

  @Column("varchar", { name: "photo", nullable: true, length: 500 })
  photo: string | null;

  @OneToMany(() => Barber, (barber) => barber.user)
  barbers: Barber[];

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];

  @ManyToOne(() => Address, (address) => address.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "id" }])
  address: Address;

  @ManyToOne(() => Profile, (profile) => profile.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "profile_id", referencedColumnName: "id" }])
  profile: Profile;
}
