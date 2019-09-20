import { buildSubscription, CacheUpdatesOptions } from 'aws-appsync';
import * as React from 'react';
import { compose, DataValue, graphql } from 'react-apollo';

import withEmployeeMutations, {
  WithEmployeesMutationsProps,
} from 'src/enhancers/withEmployeeMutations';
import { getEmployeeQuery } from 'src/graphql/queries';
import {
  onCreateEmployeeSubscription,
  onDeleteEmployeeSubscription,
  onUpdateEmployeeSubscription,
} from 'src/graphql/subscriptions';
import { GetEmployeeQueryData, GetEmployeeQueryVariables } from 'src/graphql/types';

export type WithEmployeeProps = WithSingleEmployeeProps & WithEmployeesMutationsProps;

interface WithSingleEmployeeProps {
  subscribeToUpdateEmployee: () => void;
  subscribeToCreateEmployee: () => void;
  subscribeToDeleteEmployee: () => void;
  employeeData?: DataValue<GetEmployeeQueryData, GetEmployeeQueryVariables>;
}

interface WithEmployeeIdProp {
  id: string;
}

const withEmployee = <TProps extends WithEmployeeIdProp>(
  mapPropsToQueryVariables?: (props: TProps) => GetEmployeeQueryVariables
) => (Component: React.ComponentType<TProps & WithEmployeeProps>) => {
  return class Parent extends React.Component<TProps, {}> {
    public render() {
      const mappedQueryVariables = mapPropsToQueryVariables
        ? mapPropsToQueryVariables(this.props)
        : {};

      const queryVariables: GetEmployeeQueryVariables = {
        // default query variables
        id: this.props.id,
        // mapped query variables (they will override the default)
        ...mappedQueryVariables,
      };

      const cacheUpdateOptions: CacheUpdatesOptions = {
        query: getEmployeeQuery,
        variables: queryVariables,
      };

      const NewComponent = compose(
        graphql<TProps, GetEmployeeQueryData, GetEmployeeQueryVariables, WithSingleEmployeeProps>(
          getEmployeeQuery,
          {
            options: {
              fetchPolicy: 'cache-and-network',
              variables: queryVariables,
            },
            props: r => {
              const { data } = r;
              return {
                subscribeToUpdateEmployee: () =>
                  data &&
                  data.subscribeToMore(
                    buildSubscription(onUpdateEmployeeSubscription, cacheUpdateOptions)
                  ),
                subscribeToCreateEmployee: () =>
                  data &&
                  data.subscribeToMore(
                    buildSubscription(onCreateEmployeeSubscription, cacheUpdateOptions)
                  ),
                subscribeToDeleteEmployee: () =>
                  data &&
                  data.subscribeToMore(
                    buildSubscription(onDeleteEmployeeSubscription, cacheUpdateOptions)
                  ),
                todoData: data,
              };
            },
          }
        ),
        withEmployeeMutations(cacheUpdateOptions)
      )(Component);

      return <NewComponent {...this.props} />;
    }
  };
};

export default withEmployee;
