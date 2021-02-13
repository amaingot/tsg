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
  BaseEntity,
} from "typeorm";
import Account from "./Account";
import Job from "./Job";

export enum UserRole {
  SuperAdmin = "SuperAdmin",
  AccountAdmin = "AccountAdmin",
  Employee = "Employee",
}

@Entity()
export default class Employee extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firebaseId: string;

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
  accountId: string;
  @ManyToOne((type) => Account, (c) => c.employees)
  account: Account;

  @OneToMany((type) => Job, (j) => j.finishedByEmployee)
  jobsFinished: Job[];
}
