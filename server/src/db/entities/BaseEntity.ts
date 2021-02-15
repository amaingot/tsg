import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity as TypeOrmBaseEntity,
} from "typeorm";

export default abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @DeleteDateColumn({ type: "timestamptz" })
  deletedDate?: Date;

  public get archived() {
    return !this.deletedDate;
  }
}
