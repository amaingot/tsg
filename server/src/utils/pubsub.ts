import { GooglePubSub as GqlPubSub } from "@axelspringer/graphql-google-pubsub";
import { PubSub as GooglePubSub } from "@google-cloud/pubsub";
import config from "./config";
import { logger } from "./logger";

const graphqlPubSub = new GqlPubSub({
  projectId: config.get("GCP_PROJECT_ID"),
  credentials: JSON.parse(config.get("GCP_SERVICE_ACCOUNT_KEY")),
});

const googlePubSub = new GooglePubSub({
  projectId: config.get("GCP_PROJECT_ID"),
  credentials: JSON.parse(config.get("GCP_SERVICE_ACCOUNT_KEY")),
});

const SMS_TOPIC_NAME = `tsg-${config.get("ENVIRONMENT")}-sms`;

export const initPubSub = async () => {
  const [topics] = await googlePubSub.getTopics();

  try {
    if (topics.filter((t) => t.name === SMS_TOPIC_NAME).length > 0) {
      logger.info("Topic initialized");
      return true;
    } else {
      await googlePubSub.createTopic(SMS_TOPIC_NAME);
      logger.info("Created topic");
      return true;
    }
  } catch (e) {
    logger.error("Error initializing pubsub topic", {
      topic: SMS_TOPIC_NAME,
      error: e,
    });
  }
};

interface TextMessageSubscriptionMessage {
  id: string;
}

export const textMessageSubscription = () =>
  graphqlPubSub.asyncIterator<TextMessageSubscriptionMessage>(SMS_TOPIC_NAME);

export const publishSmsMessage = (id: string) =>
  graphqlPubSub.publish(SMS_TOPIC_NAME, { id });
