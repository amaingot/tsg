import { CacheOperationTypes, CacheUpdatesOptions } from 'aws-appsync';
import { graphqlMutation } from 'aws-appsync-react';
import { compose } from 'react-apollo';

import { createJobMutation, deleteJobMutation, updateJobMutation } from 'src/graphql/mutations';
import {
  CreateJobMutationVariables,
  DeleteJobMutationVariables,
  UpdateJobMutationVariables,
} from 'src/graphql/types';

export interface WithJobsMutationsProps {
  updateJob: (variables: UpdateJobMutationVariables) => void;
  deleteJob: (variables: DeleteJobMutationVariables) => void;
  createJob: (variables: CreateJobMutationVariables) => void;
}

const withJobMutations = <TProps extends {}>(options: CacheUpdatesOptions) =>
  compose(
    graphqlMutation(deleteJobMutation, options, 'Job', 'id', CacheOperationTypes.REMOVE),
    graphqlMutation(createJobMutation, options, 'Job', 'id', CacheOperationTypes.ADD),
    graphqlMutation(updateJobMutation, options, 'Job', 'id', CacheOperationTypes.UPDATE)
  ) as (
    WrappedComponent: React.ComponentType<TProps & WithJobsMutationsProps>
  ) => React.ComponentClass<TProps, any>;

export default withJobMutations;
