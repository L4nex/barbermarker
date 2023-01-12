import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("attachment", { schema: "bm_dev" })
export class Attachment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;
}
