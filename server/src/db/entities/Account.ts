import { Entity, Column, OneToMany } from "typeorm";

import BaseEntity from "./BaseEntity";
import Customer from "./Customer";
import Job from "./Job";
import Employee from "./Employee";
import TimeSheetEntry from "./TimeSheetEntry";
import AccountPermission from "./AccountPermission";

type AccountStatus = "ACTIVE" | "PAYMENT_FAILED" | "CANCELED" | "PAUSED";

type AccountType = "CUSTOMER" | "DEMO" | "TRIAL";

@Entity()
export default class Account extends BaseEntity {
  @Column({ nullable: false })
  workspace: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  stripeCustomerId?: string;

  @Column({ nullable: false })
  address: string;

  @Column()
  addressSecondary?: string;

  @Column({ nullable: false })
  businessPhone: string;

  @Column({ nullable: false, default: "ACTIVE" })
  status: AccountStatus;

  @Column({ nullable: false, default: "CUSTOMER" })
  type: AccountType;

  // Relationships

  @OneToMany((type) => AccountPermission, (c) => c.account, { cascade: true })
  permissions: AccountPermission[];

  @OneToMany((type) => Customer, (c) => c.account, { cascade: true })
  customers: Customer[];

  @OneToMany((type) => Job, (j) => j.account, { cascade: true })
  jobs: Job[];

  @OneToMany((type) => Employee, (e) => e.account, { cascade: true })
  employees: Employee[];

  @OneToMany((type) => TimeSheetEntry, (e) => e.account, { cascade: true })
  timeSheetEntries: TimeSheetEntry[];
}
