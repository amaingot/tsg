import crypto from "crypto";
import bcrypt from "bcrypt";
import { Entity, Column } from "typeorm";

import BaseEntity from "./BaseEntity";

type UserType = "SUPERADMIN" | "USER";

const PASSWORD_HASH_ROUNDS = 10;

// Password reset codes only last one hour
const PASSWORD_RESET_CODE_TTL = 1000 * 60 * 60;

@Entity()
export default class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  cellPhone?: string;

  @Column()
  type: UserType;

  @Column()
  passwordHash: string;

  @Column({ nullable: true, type: "number" })
  passwordResetCode?: number;

  @Column({ type: "timestamptz", nullable: true })
  passwordResetCodeExpiration?: Date;

  @Column({ nullable: true })
  impersonatingEmployeeId: string;

  public isCorrectPassword(plainTextPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, this.passwordHash);
  }

  public async encryptPassword(plainTextPassword: string) {
    this.passwordHash = await bcrypt.hash(
      plainTextPassword,
      PASSWORD_HASH_ROUNDS
    );
  }

  public createPasswordResetCode() {
    this.passwordResetCode = crypto.randomInt(999999);
    this.passwordResetCodeExpiration = new Date(
      Date.now() + PASSWORD_RESET_CODE_TTL
    );
  }

  public isPasswordResetCodeValid(code: number) {
    if (!this.passwordResetCode || !this.passwordResetCodeExpiration) {
      return "NO_CODE";
    }

    if (Date.now() > this.passwordResetCodeExpiration.getUTCMilliseconds()) {
      return "CODE_EXPIRED";
    }

    if (code !== this.passwordResetCode) {
      return "INCORRECT_CODE";
    }

    return "VALID";
  }

  public createUserToken() {
    return "some-token";
  }
}
