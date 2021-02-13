import { getRepository } from "typeorm";
import { SignUpInput } from "../types";
import * as DB from "../../db";
import Stripe from "../../utils/stripe";
import { GraphqlContext } from "../context";
import auth from "../../utils/auth";
import { logger } from "../../utils/logger";

const signUp = async (input: SignUpInput) => {
  const {
    firstName,
    companyName,
    lastName,
    email,
    password,
    paymentMethodId,
  } = input;

  const user = await auth.createUser({
    displayName: `${firstName} ${lastName} (${companyName})`,
    email: email,
    password: password,
    emailVerified: true,
  });

  logger.info("Created new user", { user });

  const client = await getRepository(DB.Client)
    .create({
      name: companyName,
      stripeCustomerId: "not-created",
    })
    .save();

  logger.info("Created new client", { client });

  const employee = await DB.createOne({
    target: DB.Employee,
    item: {
      firstName,
      lastName,
      email,
      clientId: client.id,
      firebaseId: user.uid,
      userRole: DB.UserRole.AccountAdmin,
    },
    context: GraphqlContext.forServer(),
  });

  logger.info("Created new employee", { employee });

  const stripeCustomer = await Stripe.createCustomer({
    clientId: client.id,
    companyName: client.name,
    email: email,
    paymentMethodId,
  });

  logger.info("Created new stripe customer", { stripeCustomer });

  await auth.setCustomUserClaims(user.uid, {
    clientId: client.id,
    employeeId: employee.id,
    userRole: DB.UserRole.AccountAdmin,
  });

  const updatedClient = await DB.updateOne({
    target: DB.Client,
    id: client.id,
    updatedItem: {
      ...client,
      stripeCustomerId: stripeCustomer.id,
    },
    context: GraphqlContext.forServer(),
  });

  return updatedClient;
};

export default signUp;
