import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BarberShop } from "./BarberShop";

@Index("fk_barbershop_idx", ["barberShop_id"], {})
@Entity("barberShopImages", { schema: "bm_dev" })
export class BarberShopImages {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "barberShop_id" })
  barberShop_id: number;

  @Column("varchar", { name: "url", nullable: true, length: 500 })
  url: string | null;

  @ManyToOne(() => BarberShop, (barberShop) => barberShop.barberShopImages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "barberShop_id", referencedColumnName: "id" }])
  barberShop: BarberShop;
}
