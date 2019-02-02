import { buildSubscription, CacheUpdatesOptions } from 'aws-appsync';
import * as React from 'react';
import { compose, DataValue, graphql } from 'react-apollo';

import withJobMutations, { WithJobsMutationsProps } from 'src/enhancers/withJobMutations';
import { listJobsQuery } from 'src/graphql/queries';
import {
  onCreateJobSubscription,
  onDeleteJobSubscription,
  onUpdateJobSubscription,
} from 'src/graphql/subscriptions';
import { ListJobsQueryData, ListJobsQueryVariables } from 'src/graphql/types';

export type WithJobsProps = WithJobListProps & WithJobsMutationsProps;

interface WithJobListProps {
  subscribeToUpdateJob: () => () => void;
  subscribeToCreateJob: () => () => void;
  subscribeToDeleteJob: () => () => void;
  listJobsData: DataValue<ListJobsQueryData, ListJobsQueryVariables>;
}

const withJobs = <TProps extends {}>(
  mapPropsToQueryVariables?: (props: TProps) => ListJobsQueryVariables
) => (Component: React.ComponentType<TProps & WithJobsProps>) => {
  return class Parent extends React.Component<TProps, {}> {
    public render() {
      const mappedQueryVariables = mapPropsToQueryVariables
        ? mapPropsToQueryVariables(this.props)
        : {};

      const queryVariables: ListJobsQueryVariables = {
        // default query variables
        limit: 500,
        // mapped query variables (they will override the default)
        ...mappedQueryVariables,
      };

      const cacheUpdateOptions: CacheUpdatesOptions = {
        query: listJobsQuery,
        variables: queryVariables,
      };

      const NewComponent = compose(
        graphql<TProps, ListJobsQueryData, ListJobsQueryVariables, WithJobListProps>(
          listJobsQuery,
          {
            options: {
              fetchPolicy: 'cache-and-network',
              variables: queryVariables,
            },
            props: r => {
              const { data } = r;
              if (!data) {
                throw new Error(
                  'This stucks, the data at WithJobs was not there when we needed it!'
                );
              }
              return {
                subscribeToUpdateJob: () =>
                  data.subscribeToMore(
                    buildSubscription(onUpdateJobSubscription, cacheUpdateOptions)
                  ),
                subscribeToCreateJob: () =>
                  data.subscribeToMore(
                    buildSubscription(onCreateJobSubscription, cacheUpdateOptions)
                  ),
                subscribeToDeleteJob: () =>
                  data.subscribeToMore(
                    buildSubscription(onDeleteJobSubscription, cacheUpdateOptions)
                  ),
                listJobsData: data,
              };
            },
          }
        ),
        withJobMutations(cacheUpdateOptions)
      )(Component);

      return <NewComponent {...this.props} />;
    }
  };
};

export default withJobs;
