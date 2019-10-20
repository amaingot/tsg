import "source-map-support/register";
import * as Responses from "../utils/responses";
import withLogger, { Handler } from "../utils/withLogger";
import getUserClient from "../utils/getUserClient";
import { GetMeResponse } from "tsg-shared";

const handler: Handler = logger => async event => {
  const clientuser = await getUserClient(event, logger);

  const response: GetMeResponse = {
    data: clientuser
  };

  return Responses.success(response);
};

export default withLogger(handler);
