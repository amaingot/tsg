import { GraphqlContext } from "./context";
import { ResolverFn } from "./types";

export const isLoggedIn: ResolverFn<any, any, GraphqlContext, any> = async (
  resolve,
  parent,
  args,
  context
) => {
  resolve()
};
