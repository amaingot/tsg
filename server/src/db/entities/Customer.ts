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
  BaseEntity,
} from "typeorm";
import Account from "./Account";
import Job from "./Job";

@Entity()
export default class Customer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  companyName?: string;

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
  @ManyToOne((type) => Account, (c) => c.customers)
  account: Account;

  @OneToMany((type) => Job, (j) => j.customer)
  jobs: Job[];
}
