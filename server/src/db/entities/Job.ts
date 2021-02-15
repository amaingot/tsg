import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import BaseEntity from "./BaseEntity";
import Account from "./Account";
import Customer from "./Customer";
import Employee from "./Employee";
import JobDetail from "./JobDetail";
import JobHistory from "./JobHistory";

type JobType = "STINGING_BASIC" | "STRINGING_HYBRID";

type JobStatus = "PENDING" | "FINISHED";

@Entity()
export default class Job extends BaseEntity {
  @Column({ type: "text", nullable: false, default: "PENDING" })
  status: JobStatus;

  @Column({ type: "text", nullable: false })
  type: JobType;

  @Column({ type: "timestamptz", nullable: true })
  completedAt?: Date;

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
  completedByEmployeeId?: string;
  @ManyToOne((type) => Employee, (e) => e.jobsCompleted, { nullable: true })
  completedByEmployee?: Employee;

  @OneToMany((type) => JobHistory, (j) => j.job)
  history: JobHistory[];

  @OneToMany((type) => JobDetail, (j) => j.job)
  details: JobDetail[];
}
