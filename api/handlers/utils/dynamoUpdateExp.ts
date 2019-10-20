import { Map, List } from "immutable";
import {
  ReturnValue,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap
} from "aws-sdk/clients/dynamodb";

interface Obj {
  [key: string]: any;
}

interface DynamoUpdate {
  UpdateExpression: string;
  ExpressionAttributeNames: ExpressionAttributeNameMap;

  ExpressionAttributeValues: ExpressionAttributeValueMap;
  ReturnValue: ReturnValue;
}

const dynamoUpdate = (original: Obj, modified: Obj): DynamoUpdate => {
  const ori = Map(original);
  const mod = Map(modified);

  const updateExp: DynamoUpdate = {
    UpdateExpression: "",
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValue: "ALL_NEW"
  };

  const sets = mod.reduce((reduction, v, k) => {
    if (v === undefined) return reduction;
    if (v === ori.get(k)) return reduction;
    if (v === "") return reduction;

    updateExp.ExpressionAttributeNames[`#${k}`] = k;
    updateExp.ExpressionAttributeValues[`:${k}`] = v;
    return reduction.push(`#${k} = :${k}`);
  }, List());

  if (!sets.isEmpty()) {
    updateExp.UpdateExpression += ` SET ${sets.join(", ")}`;
  }

  const removes = ori
    .filter((_v, k) => !mod.has(k) || mod.get(k) === "")
    .reduce((reduction, _v, k) => {
      updateExp.ExpressionAttributeNames[`#${k}`] = k;
      return reduction.push(`#${k}`);
    }, List());

  if (!removes.isEmpty()) {
    updateExp.UpdateExpression += ` REMOVE ${removes.join(", ")}`;
  }

  return updateExp;
};

export default dynamoUpdate;
