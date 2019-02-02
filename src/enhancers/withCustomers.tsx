import { buildSubscription, CacheUpdatesOptions } from 'aws-appsync';
import * as React from 'react';
import { compose, DataValue, graphql } from 'react-apollo';

import withCustomerMutations, {
  WithCustomersMutationsProps,
} from 'src/enhancers/withCustomerMutations';
import { listCustomersQuery } from 'src/graphql/queries';
import {
  onCreateCustomerSubscription,
  onDeleteCustomerSubscription,
  onUpdateCustomerSubscription,
} from 'src/graphql/subscriptions';
import { ListCustomersQueryData, ListCustomersQueryVariables } from 'src/graphql/types';

export type WithCustomersProps = WithCustomerListProps & WithCustomersMutationsProps;

interface WithCustomerListProps {
  subscribeToUpdateCustomer: () => () => void;
  subscribeToCreateCustomer: () => () => void;
  subscribeToDeleteCustomer: () => () => void;
  listCustomersData: DataValue<ListCustomersQueryData, ListCustomersQueryVariables>;
}

const withCustomers = <TProps extends {}>(
  mapPropsToQueryVariables?: (props: TProps) => ListCustomersQueryVariables
) => (Component: React.ComponentType<TProps & WithCustomersProps>) => {
  return class Parent extends React.Component<TProps, {}> {
    public render() {
      const mappedQueryVariables = mapPropsToQueryVariables
        ? mapPropsToQueryVariables(this.props)
        : {};

      const queryVariables: ListCustomersQueryVariables = {
        // default query variables
        limit: 500,
        // mapped query variables (they will override the default)
        ...mappedQueryVariables,
      };

      const cacheUpdateOptions: CacheUpdatesOptions = {
        query: listCustomersQuery,
        variables: queryVariables,
      };

      const NewComponent = compose(
        graphql<TProps, ListCustomersQueryData, ListCustomersQueryVariables, WithCustomerListProps>(
          listCustomersQuery,
          {
            options: {
              fetchPolicy: 'cache-and-network',
              variables: queryVariables,
            },
            props: r => {
              const { data } = r;
              if (!data) {
                throw new Error(
                  'This stucks, the data at WithCustomers was not there when we needed it!'
                );
              }
              return {
                subscribeToUpdateCustomer: () =>
                  data.subscribeToMore(
                    buildSubscription(onUpdateCustomerSubscription, cacheUpdateOptions)
                  ),
                subscribeToCreateCustomer: () =>
                  data.subscribeToMore(
                    buildSubscription(onCreateCustomerSubscription, cacheUpdateOptions)
                  ),
                subscribeToDeleteCustomer: () =>
                  data.subscribeToMore(
                    buildSubscription(onDeleteCustomerSubscription, cacheUpdateOptions)
                  ),
                listCustomersData: data,
              };
            },
          }
        ),
        withCustomerMutations(cacheUpdateOptions)
      )(Component);

      return <NewComponent {...this.props} />;
    }
  };
};

export default withCustomers;
