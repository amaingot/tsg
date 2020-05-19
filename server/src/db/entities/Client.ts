import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { Customer } from "./Customer";
import { Job } from "./Job";
import { Employee } from "./Employee";

@Entity()
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  stripeCustomerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @DeleteDateColumn()
  deletedDate?: Date;

  // Relationships

  @OneToMany((type) => Customer, (c) => c.client, { cascade: true })
  customers: Customer[];

  @OneToMany((type) => Job, (j) => j.client, { cascade: true })
  jobs: Job[];

  @OneToMany((type) => Employee, (e) => e.client, { cascade: true })
  employees: Employee[];
}
