import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Transfer } from 'src/transfer/transfer.model';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ name: "created_at" })
  public created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updated_at: Date;

  @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
  public deleted_at?: Date;

  @Column()
  public symbol: string;

  @Column()
  public value: string;

  @OneToMany(() => Transfer, transfer => transfer.token)
  public transfers: Transfer[];
}