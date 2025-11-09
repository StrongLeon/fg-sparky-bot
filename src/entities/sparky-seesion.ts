import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SparkySession {
  @PrimaryGeneratedColumn()
  id = 0n;

  @Column("bigint")
  expiration_time = 0n;

  @Column("bigint")
  channel_id = 0n;
}
