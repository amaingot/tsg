import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import BaseEntity from "./BaseEntity";
import Account from "./Account";
import CustomerDetail from "./CustomerDetail";
import CustomerHistory from "./CustomerHistory";
import CustomerRelationship from "./CustomerRelationship";
import Job from "./Job";

@Entity()
export default class Customer extends BaseEntity {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  companyName?: string;

  // Relationships
  @Column()
  accountId: string;
  @ManyToOne((type) => Account, (c) => c.customers)
  account: Account;

  @OneToMany((type) => Job, (j) => j.customer)
  jobs: Job[];

  @OneToMany((type) => CustomerDetail, (j) => j.customer, { eager: true })
  details: CustomerDetail[];

  @OneToMany((type) => CustomerRelationship, (j) => j.customer, { eager: true })
  relationships: CustomerRelationship[];

  @OneToMany((type) => CustomerRelationship, (j) => j.relatedCustomer, {
    eager: true,
  })
  relatedRelationships: CustomerRelationship[];

  @OneToMany((type) => CustomerHistory, (j) => j.customer, { eager: true })
  history: CustomerHistory[];
}
