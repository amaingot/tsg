import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { Job } from "./Job";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  memNum?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  middleInitial?: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  address2?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  zip?: string;

  @Column({ nullable: true })
  homePhone?: string;

  @Column({ nullable: true })
  workPhone?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @DeleteDateColumn()
  deletedDate?: Date;

  // Relationships

  @Column()
  clientId: string;
  @ManyToOne((type) => Client, (c) => c.customers)
  client: Client;

  @OneToMany((type) => Job, (j) => j.customer)
  jobs: Job[];
}
