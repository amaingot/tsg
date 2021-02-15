import { Entity, Column, ManyToOne } from "typeorm";

import BaseEntity from "./BaseEntity";
import Job from "./Job";

type JobDetailKey =
  | "RACKET_BRAND"
  | "RACKET_NAME"
  | "RACKET_SIZE"
  | "RACKET_SKU"
  | "STRINGS_BRAND"
  | "STRINGS_NAME"
  | "STRINGS_TENSION"
  | "STRINGS_SKU"
  | "MAIN_STRINGS_BRAND"
  | "MAIN_STRINGS_NAME"
  | "MAIN_STRINGS_TENSION"
  | "MAIN_STRINGS_SKU"
  | "CROSS_STRINGS_BRAND"
  | "CROSS_STRINGS_NAME"
  | "CROSS_STRINGS_TENSION"
  | "CROSS_STRINGS_SKU";

@Entity()
export default class JobDetail extends BaseEntity {
  @Column()
  key: JobDetailKey;

  @Column()
  value: string;

  // Relationships
  @Column()
  jobId: string;
  @ManyToOne((type) => Job, (c) => c.details)
  job: Job;
}
