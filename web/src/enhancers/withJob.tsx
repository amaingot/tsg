import { buildSubscription, CacheUpdatesOptions } from 'aws-appsync';
import * as React from 'react';
import { compose, DataValue, graphql } from 'react-apollo';

import withJobMutations, { WithJobsMutationsProps } from 'src/enhancers/withJobMutations';
import { getJobQuery } from 'src/graphql/queries';
import {
  onCreateJobSubscription,
  onDeleteJobSubscription,
  onUpdateJobSubscription,
} from 'src/graphql/subscriptions';
import { GetJobQueryData, GetJobQueryVariables } from 'src/graphql/types';

export type WithJobProps = WithSingleJobProps & WithJobsMutationsProps;

interface WithSingleJobProps {
  subscribeToUpdateJob: () => void;
  subscribeToCreateJob: () => void;
  subscribeToDeleteJob: () => void;
  jobData?: DataValue<GetJobQueryData, GetJobQueryVariables>;
}

interface WithJobIdProp {
  id: string;
}

const withJob = <TProps extends WithJobIdProp>(
  mapPropsToQueryVariables?: (props: TProps) => GetJobQueryVariables
) => (Component: React.ComponentType<TProps & WithJobProps>) => {
  return class Parent extends React.Component<TProps, {}> {
    public render() {
      const mappedQueryVariables = mapPropsToQueryVariables
        ? mapPropsToQueryVariables(this.props)
        : {};

      const queryVariables: GetJobQueryVariables = {
        // default query variables
        id: this.props.id,
        // mapped query variables (they will override the default)
        ...mappedQueryVariables,
      };

      const cacheUpdateOptions: CacheUpdatesOptions = {
        query: getJobQuery,
        variables: queryVariables,
      };

      const NewComponent = compose(
        graphql<TProps, GetJobQueryData, GetJobQueryVariables, WithSingleJobProps>(getJobQuery, {
          options: {
            fetchPolicy: 'cache-and-network',
            variables: queryVariables,
          },
          props: r => {
            const { data } = r;
            return {
              subscribeToUpdateJob: () =>
                data &&
                data.subscribeToMore(
                  buildSubscription(onUpdateJobSubscription, cacheUpdateOptions)
                ),
              subscribeToCreateJob: () =>
                data &&
                data.subscribeToMore(
                  buildSubscription(onCreateJobSubscription, cacheUpdateOptions)
                ),
              subscribeToDeleteJob: () =>
                data &&
                data.subscribeToMore(
                  buildSubscription(onDeleteJobSubscription, cacheUpdateOptions)
                ),
              todoData: data,
            };
          },
        }),
        withJobMutations(cacheUpdateOptions)
      )(Component);

      return <NewComponent {...this.props} />;
    }
  };
};

export default withJob;
