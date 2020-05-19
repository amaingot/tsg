import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { Job } from "./Job";

export enum UserRole {
  SuperAdmin = "SuperAdmin",
  AccountAdmin = "AccountAdmin",
  Employee = "Employee",
}

@Entity()
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  cellPhone?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Employee,
  })
  userRole: UserRole;

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
  @ManyToOne((type) => Client, (c) => c.employees)
  client: Client;

  @OneToMany((type) => Job, (j) => j.finishedByEmployee)
  jobsFinished: Job[];
}
