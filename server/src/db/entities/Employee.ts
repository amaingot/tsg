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
  SelectQueryBuilder,
  BaseEntity,
} from "typeorm";
import { Client } from "./Client";
import { Job } from "./Job";
import { GraphqlContext } from "../../graphql/context";

export enum UserRole {
  SuperAdmin = "SuperAdmin",
  AccountAdmin = "AccountAdmin",
  Employee = "Employee",
}

@Entity()
export class Employee extends BaseEntity {
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
  clientId: string;
  @ManyToOne((type) => Client, (c) => c.employees)
  client: Client;

  @OneToMany((type) => Job, (j) => j.finishedByEmployee)
  jobsFinished: Job[];

  // Auth

  canAccess(context: GraphqlContext): boolean {
    const { clientId, userRole } = context.currentUser || {};
    return clientId === this.clientId || userRole === UserRole.SuperAdmin;
  }

  canUpdate(context: GraphqlContext): boolean {
    const { clientId, userRole, employeeId } = context.currentUser || {};
    return (
      employeeId === this.id ||
      (clientId === this.clientId && userRole === UserRole.AccountAdmin) ||
      userRole === UserRole.SuperAdmin
    );
  }

  canDelete(context: GraphqlContext): boolean {
    const { clientId, userRole } = context.currentUser || {};
    return (
      (clientId === this.clientId && userRole === UserRole.AccountAdmin) ||
      userRole === UserRole.SuperAdmin
    );
  }

  canCreate(context: GraphqlContext): boolean {
    const { clientId, userRole } = context.currentUser || {};
    return (
      (this.clientId &&
        clientId === this.clientId &&
        userRole === UserRole.AccountAdmin) ||
      userRole === UserRole.SuperAdmin
    );
  }

  static protectedQuery(context: GraphqlContext) {
    const { clientId, userRole } = context.currentUser || {};

    if (userRole === UserRole.SuperAdmin) {
      return {};
    } else {
      return { clientId };
    }
  }
}
