import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("profile", { schema: "bm_dev" })
export class Profile {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 20 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 45 })
  description: string | null;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];
}
