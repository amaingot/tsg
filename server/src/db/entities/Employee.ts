import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import BaseEntity from "./BaseEntity";
import Account from "./Account";
import Job from "./Job";
import CustomerHistory from "./CustomerHistory";
import JobHistory from "./JobHistory";
import TimeSheetEntry from "./TimeSheetEntry";

@Entity()
export default class Employee extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  cellPhone?: string;

  @Column()
  type: "ACCOUNT_OWNER" | "EMPLOYEE";

  // Relationships
  @Column()
  accountId: string;
  @ManyToOne((type) => Account, (c) => c.employees)
  account: Account;

  @OneToMany((type) => Job, (j) => j.completedByEmployee)
  jobsCompleted: Job[];

  @OneToMany((type) => JobHistory, (j) => j.createdBy)
  jobUpdates: JobHistory[];

  @OneToMany((type) => CustomerHistory, (j) => j.createdBy)
  customerUpdates: CustomerHistory[];

  @OneToMany((type) => TimeSheetEntry, (j) => j.employee)
  timeSheetEntries: TimeSheetEntry[];
}
