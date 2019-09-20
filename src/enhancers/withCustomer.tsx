import { buildSubscription, CacheUpdatesOptions } from 'aws-appsync';
import * as React from 'react';
import { compose, DataValue, graphql } from 'react-apollo';

import withCustomerMutations, {
  WithCustomersMutationsProps,
} from 'src/enhancers/withCustomerMutations';
import withJobMutations, { WithJobsMutationsProps } from 'src/enhancers/withJobMutations';
import { getCustomerQuery } from 'src/graphql/queries';
import {
  onCreateCustomerSubscription,
  onDeleteCustomerSubscription,
  onUpdateCustomerSubscription,
} from 'src/graphql/subscriptions';
import { GetCustomerQueryData, GetCustomerQueryVariables } from 'src/graphql/types';

export type WithCustomerProps = WithSingleCustomerProps &
  WithCustomersMutationsProps &
  WithJobsMutationsProps;

interface WithSingleCustomerProps {
  subscribeToUpdateCustomer: () => void;
  subscribeToCreateCustomer: () => void;
  subscribeToDeleteCustomer: () => void;
  customerData?: DataValue<GetCustomerQueryData, GetCustomerQueryVariables>;
}

interface WithCustomerIdProp {
  id: string;
}

const withCustomer = <TProps extends WithCustomerIdProp>(
  mapPropsToQueryVariables?: (props: TProps) => GetCustomerQueryVariables
) => (Component: React.ComponentType<TProps & WithCustomerProps>) => {
  return class Parent extends React.Component<TProps, {}> {
    public render() {
      const mappedQueryVariables = mapPropsToQueryVariables
        ? mapPropsToQueryVariables(this.props)
        : {};

      const queryVariables: GetCustomerQueryVariables = {
        // default query variables
        id: this.props.id,
        // mapped query variables (they will override the default)
        ...mappedQueryVariables,
      };

      const cacheUpdateOptions: CacheUpdatesOptions = {
        query: getCustomerQuery,
        variables: queryVariables,
      };

      const NewComponent = compose(
        graphql<TProps, GetCustomerQueryData, GetCustomerQueryVariables, WithSingleCustomerProps>(
          getCustomerQuery,
          {
            options: {
              fetchPolicy: 'cache-and-network',
              variables: queryVariables,
            },
            props: r => {
              const { data } = r;
              return {
                subscribeToUpdateCustomer: () =>
                  data &&
                  data.subscribeToMore(
                    buildSubscription(onUpdateCustomerSubscription, cacheUpdateOptions)
                  ),
                subscribeToCreateCustomer: () =>
                  data &&
                  data.subscribeToMore(
                    buildSubscription(onCreateCustomerSubscription, cacheUpdateOptions)
                  ),
                subscribeToDeleteCustomer: () =>
                  data &&
                  data.subscribeToMore(
                    buildSubscription(onDeleteCustomerSubscription, cacheUpdateOptions)
                  ),
                customerData: data,
              };
            },
          }
        ),
        withCustomerMutations(cacheUpdateOptions),
        withJobMutations(cacheUpdateOptions)
      )(Component);

      return <NewComponent {...this.props} />;
    }
  };
};

export default withCustomer;
