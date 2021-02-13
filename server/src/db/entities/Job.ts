import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from "typeorm";
import Account from "./Account";
import Customer from "./Customer";
import Employee from "./Employee";

@Entity()
export default class Job extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "string", nullable: false, default: "PENDING" })
  status: "PENDING" | "FINISHED";

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
  accountId: string;
  @ManyToOne((type) => Account, (c) => c.jobs)
  account: Account;

  @Column()
  customerId: string;
  @ManyToOne((type) => Customer, (c) => c.jobs)
  customer: Customer;

  @Column({ nullable: true })
  finishedByEmployeeId?: string;
  @ManyToOne((type) => Employee, (e) => e.jobsFinished, { nullable: true })
  finishedByEmployee?: Employee;
}
