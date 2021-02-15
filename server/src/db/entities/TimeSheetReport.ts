import { Entity, Column, OneToMany } from "typeorm";

import BaseEntity from "./BaseEntity";
import TimeSheetEntry from "./TimeSheetEntry";

type TimeSheetEntryStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NEEDS_APPROVAL"
  | "PAID";

@Entity()
export default class TimeSheetReport extends BaseEntity {
  @Column({ type: "string", nullable: false, default: "PENDING" })
  status: TimeSheetEntryStatus;

  @Column({ type: "timestamptz" })
  payPeriodStart: Date;

  @Column({ type: "timestamptz" })
  payPeriodEnd: Date;

  // Relationships
  @OneToMany((type) => TimeSheetEntry, (t) => t.report)
  timeSheetEntries: TimeSheetEntry[];
}
