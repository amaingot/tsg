import { Employee } from "tsg-shared";
import dynamo from "../utils/dynamo";

const getUser = async (userId: string): Promise<Employee> => {
  const userRecord = await dynamo
    .get({
      TableName: process.env.USER_TABLE,
      Key: {
        id: userId
      }
    })
    .promise();

  const user = userRecord.Item as Employee;
  return user;
};
export default getUser;
