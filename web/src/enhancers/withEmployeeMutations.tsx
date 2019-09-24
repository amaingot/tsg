import { CacheOperationTypes, CacheUpdatesOptions } from 'aws-appsync';
import { graphqlMutation } from 'aws-appsync-react';
import { compose } from 'react-apollo';

import {
  createEmployeeMutation,
  deleteEmployeeMutation,
  updateEmployeeMutation,
} from 'src/graphql/mutations';
import {
  CreateEmployeeMutationVariables,
  DeleteEmployeeMutationVariables,
  UpdateEmployeeMutationVariables,
} from 'src/graphql/types';

export interface WithEmployeesMutationsProps {
  updateEmployee: (variables: UpdateEmployeeMutationVariables) => void;
  deleteEmployee: (variables: DeleteEmployeeMutationVariables) => void;
  createEmployee: (variables: CreateEmployeeMutationVariables) => void;
}

const withEmployeeMutations = <TProps extends {}>(options: CacheUpdatesOptions) =>
  compose(
    graphqlMutation(deleteEmployeeMutation, options, 'Employee', 'id', CacheOperationTypes.REMOVE),
    graphqlMutation(createEmployeeMutation, options, 'Employee', 'id', CacheOperationTypes.ADD),
    graphqlMutation(updateEmployeeMutation, options, 'Employee', 'id', CacheOperationTypes.UPDATE)
  ) as (
    WrappedComponent: React.ComponentType<TProps & WithEmployeesMutationsProps>
  ) => React.ComponentClass<TProps, any>;

export default withEmployeeMutations;
