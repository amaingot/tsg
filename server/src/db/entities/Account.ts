import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  BaseEntity,
} from "typeorm";
import Customer from "./Customer";
import Job from "./Job";
import Employee from "./Employee";

@Entity()
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  workspace: string;

  @Column({ nullable: false })
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

  @OneToMany((type) => Customer, (c) => c.account, { cascade: true })
  customers: Customer[];

  @OneToMany((type) => Job, (j) => j.account, { cascade: true })
  jobs: Job[];

  @OneToMany((type) => Employee, (e) => e.account, { cascade: true })
  employees: Employee[];
}
