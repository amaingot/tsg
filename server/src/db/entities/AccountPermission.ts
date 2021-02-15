import { Entity, Column, ManyToOne } from "typeorm";

import BaseEntity from "./BaseEntity";
import Account from "./Account";

type AccountPermissionType =
  | "SMS_ENABLED"
  | "TIMESHEETS_ENABLED"
  | "RESERVATIONS_ENABLED";

@Entity()
export default class AccountPermission extends BaseEntity {
  @Column()
  type: AccountPermissionType;

  @Column()
  value: boolean;

  // Relationships
  @Column()
  accountId: string;
  @ManyToOne((type) => Account, (c) => c.permissions)
  account: Account;
}
