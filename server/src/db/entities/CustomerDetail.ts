import { Entity, Column, ManyToOne } from "typeorm";

import BaseEntity from "./BaseEntity";
import Customer from "./Customer";

type CustomerDetailKey =
  | "EMAIL"
  | "CELL_PHONE"
  | "HOME_PHONE"
  | "WORK_PHONE"
  | "DATE_OF_BIRTH"
  | "ADDRESS"
  | "ADDRESS_SECONDARY"
  | "CITY"
  | "ZIP_CODE"
  | "STATE"
  | "MEMBER_NUMBER"
  | "MIDDLE_INITIAL";

@Entity()
export default class CustomerDetail extends BaseEntity {
  @Column()
  key: CustomerDetailKey;

  @Column()
  value: string;

  // Relationships
  @Column()
  customerId: string;
  @ManyToOne((type) => Customer, (c) => c.details)
  customer: Customer;
}
