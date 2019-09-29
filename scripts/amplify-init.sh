#!/bin/bash
set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"api/src\",\
\"DistributionDir\":\"web/build\",\
\"BuildCommand\":\"yarn build\",\
\"StartCommand\":\"yarn start\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"$AWS_REGION\"\
}"
AMPLIFY="{\
\"projectName\":\"$CIRCLE_PROJECT_REPONAME\",\
\"envName\":\"$AMPLIFY_ENV_NAME\",\
\"defaultEditor\":\"code\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

amplify init \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--yes