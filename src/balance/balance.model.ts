import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Transfer } from 'src/transfer/transfer.model';
import { User } from 'src/user/user.model';

export enum UserRole {
    CONSUMER = "consumer",
    ADMIN = "admin"
}

@Entity({name: 'balances'})
export class Balance {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ name: "created_at" })
  public created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updated_at: Date;

  @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
  public deleted_at?: Date;

  @Column()
  public value: string;

  @ManyToOne(() => User, user => user.balances)
  public user: User;

}