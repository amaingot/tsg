import { Entity, Column, ManyToOne } from "typeorm";

import BaseEntity from "./BaseEntity";
import Account from "./Account";
import Employee from "./Employee";
import TimeSheetReport from "./TimeSheetReport";

type TimeSheetEntryStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NEEDS_APPROVAL"
  | "PAID";

@Entity()
export default class TimeSheetEntry extends BaseEntity {
  @Column({ type: "text", nullable: false, default: "PENDING" })
  status: TimeSheetEntryStatus;

  @Column({ type: "timestamptz" })
  clockedInAt: Date;

  @Column({ type: "timestamptz", nullable: true })
  clockedOutAt?: Date;

  // Relationships

  @Column()
  accountId: string;
  @ManyToOne((type) => Account, (a) => a.timeSheetEntries)
  account: Account;

  @Column()
  employeeId: string;
  @ManyToOne((type) => Employee, (e) => e.timeSheetEntries)
  employee: Employee;

  @Column({ nullable: true })
  reportId?: string;
  @ManyToOne((type) => TimeSheetReport, (e) => e.timeSheetEntries, {
    nullable: true,
  })
  report?: TimeSheetReport;
}
