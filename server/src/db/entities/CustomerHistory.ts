import { Entity, Column, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity";
import Customer from "./Customer";
import Employee from "./Employee";

@Entity()
export default class CustomerHistory extends BaseEntity {
  @Column()
  snapshot: string;

  // Relationships
  @Column()
  customerId: string;
  @ManyToOne((type) => Customer, (c) => c.history)
  customer: Customer;

  @Column()
  createdByEmployeeId: string;
  @ManyToOne((type) => Employee, (e) => e.customerUpdates)
  createdBy?: Employee;
}
