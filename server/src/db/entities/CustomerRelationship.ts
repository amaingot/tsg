import { Entity, Column, ManyToOne } from "typeorm";

import BaseEntity from "./BaseEntity";
import Customer from "./Customer";

type CustomerRelationshipType = "PARENT" | "SPOUSE";

@Entity()
export default class CustomerRelationship extends BaseEntity {
  @Column()
  type: CustomerRelationshipType;

  // Relationships
  @Column()
  customerId: string;
  @ManyToOne((type) => Customer, (c) => c.relationships)
  customer: Customer;

  @Column()
  relatedCustomerId: string;
  @ManyToOne((type) => Customer, (c) => c.relatedRelationships)
  relatedCustomer: Customer;
}
