import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { Customer } from "./Customer";
import { Employee } from "./Employee";

@Entity()
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  finished: boolean;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  stringName?: string;

  @Column({ nullable: true })
  racket?: string;

  @Column({ nullable: true })
  tension?: string;

  @Column({ nullable: true })
  gauge?: string;

  @Column({ nullable: true })
  recievedAt?: Date;

  @Column({ nullable: true })
  finishedAt?: Date;

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
  @ManyToOne((type) => Client, (c) => c.jobs)
  client: Client;

  @Column()
  customerId: string;
  @ManyToOne((type) => Customer, (c) => c.jobs)
  customer: Customer;

  @Column({ nullable: true })
  finishedByEmployeeId?: string;
  @ManyToOne((type) => Employee, (e) => e.jobsFinished, { nullable: true })
  finishedByEmployee?: Employee;
}
