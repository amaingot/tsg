import Stripe from "stripe";
import { Product, Plan } from "../graphql/types";
import config from "./config";

const client = new Stripe(config.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2020-08-27",
  typescript: true,
});

interface CreateCustomerInputs {
  clientId: string;
  companyName: string;
  email: string;
  paymentMethodId?: string;
}

const createCustomer = async (
  inputs: CreateCustomerInputs
): Promise<Stripe.Customer> => {
  const { clientId, email, companyName, paymentMethodId } = inputs;
  const customer = client.customers.create({
    email,
    name: companyName,
    payment_method: paymentMethodId,
    metadata: {
      clientId,
    },
  });

  return customer;
};

const deleteCustomer = async (id: string) => {
  const deletedCustomer = await client.customers.del(id);

  return deletedCustomer.deleted;
};

const getProducts = async () => {
  return client.products.list().autoPagingToArray({ limit: 100 });
};

const getProduct = async (productId: string): Promise<Product> => {
  const {
    updated,
    created,
    description,
    statement_descriptor,
    unit_label,
    ...product
  } = await client.products.retrieve(productId);

  return {
    ...product,
    description: description === null ? undefined : description,
    updated: new Date(updated),
    created: new Date(created),
    statementDescriptor:
      statement_descriptor === null ? undefined : statement_descriptor,
    unitLabel: unit_label === null ? undefined : unit_label,
  };
};

type PartialPlan = Omit<Plan, "product">;

const getPlans = async (): Promise<PartialPlan[]> => {
  const plans = await client.plans.list().autoPagingToArray({ limit: 100 });

  return plans.map((p) => {
    const {
      created,
      amount_decimal,
      billing_scheme,
      amount,
      product,
      interval_count,
      usage_type,
      nickname,
      metadata,
      ...rest
    } = p;

    const description = metadata && metadata["description"] || "";
    const features = (metadata && metadata["features"] || "").split(",");

    return {
      ...rest,
      created: new Date(created),
      productId: typeof product === "string" ? product : undefined,
      amountDecimal: amount_decimal === null ? "0" : amount_decimal,
      billingScheme: billing_scheme,
      intervalCount: interval_count,
      usageType: usage_type,
      amount: amount === null ? 0 : amount,
      nickname: nickname === null ? undefined : nickname,
      features,
      description,
    };
  });
};

export default {
  getProducts,
  getPlans,
  createCustomer,
  getProduct,
  deleteCustomer,
};
