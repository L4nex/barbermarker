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
import { Address } from "./Address";
import { BarberShopImages } from "./BarberShopImages";
import { Schedule } from "./Schedule";
import { Service } from "./Service";

@Index("fk_barberShop_address1_idx", ["address_id"], {})
@Entity("barberShop", { schema: "bm_dev" })
export class BarberShop {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 45 })
  description: string | null;

  @Column("varchar", { name: "email", length: 50 })
  email: string;

  @Column("varchar", { name: "phone", length: 45 })
  phone: string;

  @Column("int", { name: "address_id", nullable: true })
  address_id: number | null;

  @Column("decimal", {
    name: "latitude",
    nullable: true,
    precision: 10,
    scale: 8,
  })
  latitude: number | null;

  @Column("decimal", {
    name: "longitude",
    nullable: true,
    precision: 10,
    scale: 8,
  })
  longitude: number | null;

  @Column("double", { name: "rating", nullable: true, precision: 22 })
  rating: number | null;

  @Column("int", { name: "votes", nullable: true })
  votes: number | null;

  @Column("int", { name: "totalVotes", nullable: true })
  totalVotes: number | null;
  
  @Column("varchar", { name: "logo", nullable: true, length: 500 })
  logo: string | null;

  @Column("varchar", { name: "banner", nullable: true, length: 500 })
  banner: string | null;

  @Column("varchar", { name: "completeAddress", nullable: true, length: 500 })
  completeAddress: string | null;

  @OneToMany(() => Barber, (barber) => barber.barberShop)
  barbers: Barber[];

  @ManyToOne(() => Address, (address) => address.barberShops, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "id" }])
  address: Address;

  @OneToMany(
    () => BarberShopImages,
    (barberShopImages) => barberShopImages.barberShop
  )
  barberShopImages: BarberShopImages[];

  @OneToMany(() => Schedule, (schedule) => schedule.barberShop)
  schedules: Schedule[];

  @OneToMany(() => Service, (service) => service.barberShop)
  services: Service[];
}
