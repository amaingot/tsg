import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  SelectQueryBuilder,
  BaseEntity,
} from "typeorm";
import { Client } from "./Client";
import { Job } from "./Job";
import { GraphqlContext } from "../../graphql/context";
import { UserRole } from "./Employee";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  memNum?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  middleInitial?: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  address2?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  zip?: string;

  @Column({ nullable: true })
  homePhone?: string;

  @Column({ nullable: true })
  workPhone?: string;

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
  @ManyToOne((type) => Client, (c) => c.customers)
  client: Client;

  @OneToMany((type) => Job, (j) => j.customer)
  jobs: Job[];

  // Auth

  canAccess(context: GraphqlContext): boolean {
    const { clientId, userRole } = context.currentUser || {};
    return clientId === this.clientId || userRole === UserRole.SuperAdmin;
  }

  canUpdate(context: GraphqlContext): boolean {
    return this.canAccess(context);
  }

  canDelete(context: GraphqlContext): boolean {
    return this.canAccess(context);
  }

  static canCreate(
    context: GraphqlContext,
    input: QueryDeepPartialEntity<Customer>
  ): boolean {
    const { clientId, userRole } = context.currentUser || {};
    return clientId === input.clientId || userRole === UserRole.SuperAdmin;
  }

  static protectedQuery(context: GraphqlContext) {
    const { clientId, userRole } = context.currentUser || {};

    if (userRole === UserRole.SuperAdmin) {
      return (qb: SelectQueryBuilder<Customer>) => qb;
    } else {
      return (qb: SelectQueryBuilder<Customer>) => qb.where({ clientId });
    }
  }
}
