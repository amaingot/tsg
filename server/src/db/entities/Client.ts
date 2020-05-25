import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  SelectQueryBuilder,
  BaseEntity,
} from "typeorm";
import { Customer } from "./Customer";
import { Job } from "./Job";
import { Employee, UserRole } from "./Employee";
import { GraphqlContext } from "../../graphql/context";

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
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

  @OneToMany((type) => Customer, (c) => c.client, { cascade: true })
  customers: Customer[];

  @OneToMany((type) => Job, (j) => j.client, { cascade: true })
  jobs: Job[];

  @OneToMany((type) => Employee, (e) => e.client, { cascade: true })
  employees: Employee[];

  // Auth

  canAccess(context: GraphqlContext): boolean {
    const { clientId, userRole } = context.currentUser || {};
    return clientId === this.id || userRole === UserRole.SuperAdmin;
  }

  canUpdate(context: GraphqlContext): boolean {
    const { clientId, userRole } = context.currentUser || {};
    return (
      (clientId === this.id && userRole === UserRole.AccountAdmin) ||
      userRole === UserRole.SuperAdmin
    );
  }

  canDelete(context: GraphqlContext): boolean {
    const { userRole } = context.currentUser || {};
    return userRole === UserRole.SuperAdmin;
  }

  canCreate(context: GraphqlContext): boolean {
    const { userRole } = context.currentUser || {};
    return userRole === UserRole.SuperAdmin;
  }

  static protectedQuery(context: GraphqlContext) {
    const { clientId, userRole } = context.currentUser || {};

    if (userRole === UserRole.SuperAdmin) {
      return (qb: SelectQueryBuilder<Client>) => qb;
    } else {
      return { clientId };
    }
  }
}
