import { CacheOperationTypes, CacheUpdatesOptions } from 'aws-appsync';
import { graphqlMutation } from 'aws-appsync-react';
import { compose } from 'react-apollo';

import {
  createCustomerMutation,
  deleteCustomerMutation,
  updateCustomerMutation,
} from 'src/graphql/mutations';
import {
  CreateCustomerMutationVariables,
  DeleteCustomerMutationVariables,
  UpdateCustomerMutationVariables,
} from 'src/graphql/types';

export interface WithCustomersMutationsProps {
  updateCustomer: (variables: UpdateCustomerMutationVariables) => void;
  deleteCustomer: (variables: DeleteCustomerMutationVariables) => void;
  createCustomer: (variables: CreateCustomerMutationVariables) => void;
}

const withCustomerMutations = <TProps extends {}>(options: CacheUpdatesOptions) =>
  compose(
    graphqlMutation(deleteCustomerMutation, options, 'Customer', 'id', CacheOperationTypes.REMOVE),
    graphqlMutation(createCustomerMutation, options, 'Customer', 'id', CacheOperationTypes.ADD),
    graphqlMutation(updateCustomerMutation, options, 'Customer', 'id', CacheOperationTypes.UPDATE)
  ) as (
    WrappedComponent: React.ComponentType<TProps & WithCustomersMutationsProps>
  ) => React.ComponentClass<TProps, any>;

export default withCustomerMutations;
