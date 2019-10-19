import "source-map-support/register";
import * as Responses from "../utils/responses";
import dynamo from "../utils/dynamo";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";

const handler: Handler = logger => async event => {
  const request = JSON.parse(event.body);

  logger.info("Updating customer because of this event: ", event);

  if (!event.pathParameters || !event.pathParameters.id) {
    logger.error("No record ID supplied in path");
    return Responses.badRequest();
  }

  const recordId = event.pathParameters.id;

  const {
    memNumber,
    lastName,
    firstName,
    middleInitial,
    email,
    address,
    address2,
    city,
    zip,
    homePhone,
    cellPhone,
    workPhone
  } = request;

  const { client } = await getUserClient(event, logger);

  const customer = await dynamo
    .get({
      TableName: process.env.CUSTOMER_TABLE,
      Key: {
        id: recordId
      }
    })
    .promise();

  if (customer.Item.clientId !== client.id) {
    logger.info("User is updating something they do not have access to");
    return Responses.forbidden();
  }

  const updatedCustomer = await dynamo
    .update({
      TableName: process.env.CUSTOMER_TABLE,
      Key: {
        id: recordId
      },
      UpdateExpression:
        "set memNumber=:memNumber, lastName=:lastName, firstName=:firstName, middleInitial=:middleInitial, email=:email, address=:address, address2=:address2, city=:city, zip=:zip, homePhone=:homePhone, cellPhone=:cellPhone, workPhone=:workPhone",
      ExpressionAttributeValues: {
        ":memNumber": memNumber,
        ":lastName": lastName,
        ":firstName": firstName,
        ":middleInitial": middleInitial,
        ":email": email,
        ":address": address,
        ":address2": address2,
        ":city": city,
        ":zip": zip,
        ":homePhone": homePhone,
        ":cellPhone": cellPhone,
        ":workPhone": workPhone
      }
    })
    .promise();

  return Responses.success({
    data: updatedCustomer.Attributes
  });
};

export default withLogger(handler);
