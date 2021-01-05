import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Transfer } from 'src/transfer/transfer.model';
import { Balance } from 'src/balance/balance.model';

export enum UserRole {
    CONSUMER = "consumer",
    ADMIN = "admin"
}

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ name: "created_at" })
  public created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updated_at: Date;

  @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
  public deleted_at?: Date;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public salt: string;

  @Column()
  public role: string;

  @Column({default: `https://secure.gravatar.com/avatar/${this.created_at}?s=90&d=identicon`})
  public photo: string;

  @OneToMany(() => Transfer, transfer => transfer.user)
  public transfers: Transfer[];

  @OneToMany(() => Balance, balance => balance.user)
  public balances: Balance[];


}