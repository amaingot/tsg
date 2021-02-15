import { getRepository } from "typeorm";
import { MutationResolvers } from "../types";
import * as DB from "../../db";
import Stripe from "../../utils/stripe";
import { logger } from "../../utils/logger";

export const signUp: Required<MutationResolvers>["signUp"] = async (
  _parent,
  { input }
) => {
  const {
    firstName,
    companyName,
    lastName,
    email,
    password,
    paymentMethodId,
  } = input;

  const user = getRepository(DB.User).create({ email });
  user.encryptPassword(password);
  await user.save();

  logger.info("Created new user", { user });

  const account = await getRepository(DB.Account)
    .create({
      workspace: "boom",
      name: companyName,
      address: "",
      businessPhone: "",
      status: "ACTIVE",
      type: "CUSTOMER",
    })
    .save();

  logger.info("Created new account", { account });

  const employee = await getRepository(DB.Employee)
    .create({
      firstName,
      lastName,
      email,
      accountId: account.id,
      type: "ACCOUNT_OWNER",
    })
    .save();

  logger.info("Created new employee", { employee });

  const stripeCustomer = await Stripe.createCustomer({
    clientId: account.id,
    companyName: account.name,
    email: email,
    paymentMethodId,
  });

  logger.info("Created new stripe customer", { stripeCustomer });

  await getRepository(DB.Account).update(account.id, {
    stripeCustomerId: stripeCustomer.id,
  });

  await account.reload();
  return account;
};
