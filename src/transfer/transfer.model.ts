import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/user/user.model';
import { Token } from 'src/token/token.model';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ name: "created_at" })
  public created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updated_at: Date;

  @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
  public deleted_at?: Date;

  @ManyToOne(() => User, user => user.transfers)
  public user: User;
  
  @ManyToOne(() => Token, token => token.transfers)
  public token: Token;

  @Column()
  public quantity: string;
}