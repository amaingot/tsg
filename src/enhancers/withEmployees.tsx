import { buildSubscription, CacheUpdatesOptions } from 'aws-appsync';
import * as React from 'react';
import { compose, DataValue, graphql } from 'react-apollo';

import withEmployeeMutations, {
  WithEmployeesMutationsProps,
} from 'src/enhancers/withEmployeeMutations';
import { listEmployeesQuery } from 'src/graphql/queries';
import {
  onCreateEmployeeSubscription,
  onDeleteEmployeeSubscription,
  onUpdateEmployeeSubscription,
} from 'src/graphql/subscriptions';
import { ListEmployeesQueryData, ListEmployeesQueryVariables } from 'src/graphql/types';

export type WithEmployeesProps = WithEmployeeListProps & WithEmployeesMutationsProps;

interface WithEmployeeListProps {
  subscribeToUpdateEmployee: () => () => void;
  subscribeToCreateEmployee: () => () => void;
  subscribeToDeleteEmployee: () => () => void;
  listEmployeesData: DataValue<ListEmployeesQueryData, ListEmployeesQueryVariables>;
}

const withEmployees = <TProps extends {}>(
  mapPropsToQueryVariables?: (props: TProps) => ListEmployeesQueryVariables
) => (Component: React.ComponentType<TProps & WithEmployeesProps>) => {
  return class Parent extends React.Component<TProps, {}> {
    public render() {
      const mappedQueryVariables = mapPropsToQueryVariables
        ? mapPropsToQueryVariables(this.props)
        : {};

      const queryVariables: ListEmployeesQueryVariables = {
        // default query variables
        limit: 500,
        // mapped query variables (they will override the default)
        ...mappedQueryVariables,
      };

      const cacheUpdateOptions: CacheUpdatesOptions = {
        query: listEmployeesQuery,
        variables: queryVariables,
      };

      const NewComponent = compose(
        graphql<TProps, ListEmployeesQueryData, ListEmployeesQueryVariables, WithEmployeeListProps>(
          listEmployeesQuery,
          {
            options: {
              fetchPolicy: 'cache-and-network',
              variables: queryVariables,
            },
            props: r => {
              const { data } = r;
              if (!data) {
                throw new Error(
                  'This stucks, the data at WithEmployees was not there when we needed it!'
                );
              }
              return {
                subscribeToUpdateEmployee: () =>
                  data.subscribeToMore(
                    buildSubscription(onUpdateEmployeeSubscription, cacheUpdateOptions)
                  ),
                subscribeToCreateEmployee: () =>
                  data.subscribeToMore(
                    buildSubscription(onCreateEmployeeSubscription, cacheUpdateOptions)
                  ),
                subscribeToDeleteEmployee: () =>
                  data.subscribeToMore(
                    buildSubscription(onDeleteEmployeeSubscription, cacheUpdateOptions)
                  ),
                listEmployeesData: data,
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

export default withEmployees;
