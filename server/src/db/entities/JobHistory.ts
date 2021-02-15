import { Entity, Column, ManyToOne } from "typeorm";

import BaseEntity from "./BaseEntity";
import Job from "./Job";
import Employee from "./Employee";

@Entity()
export default class JobHistory extends BaseEntity {
  @Column()
  snapshot: string;

  // Relationships
  @Column()
  jobId: string;
  @ManyToOne((type) => Job, (c) => c.history)
  job: Job;

  @Column()
  createdByEmployeeId: string;
  @ManyToOne((type) => Employee, (e) => e.jobUpdates)
  createdBy: Employee;
}
