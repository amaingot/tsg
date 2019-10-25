import * as NodeFetch from "node-fetch";
global["fetch"] = NodeFetch;
import * as AWS_SDK from "aws-sdk";
import AWSXray from "aws-xray-sdk-core";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";

const AWS = AWSXray.captureAWS(AWS_SDK);

const Config = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.USER_POOL_CLIENT_ID
};

const userPool = new CognitoUserPool(Config);
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18"
}) as AWS_SDK.CognitoIdentityServiceProvider;

export default userPool;

interface InitialUserAttributes {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

interface SignUpUserParams extends InitialUserAttributes {
  password: string;
}

export interface UserRecord extends InitialUserAttributes {
  id: string;
  enabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export const createUser = async (
  params: InitialUserAttributes,
  password?: string
) => {
  const { email, phoneNumber, firstName, lastName } = params;

  const request = {
    UserPoolId: Config.UserPoolId,
    Username: email,
    MessageAction: "SUPPRESS",
    UserAttributes: [
      {
        Name: "email",
        Value: email
      },
      {
        Name: "phone_number",
        Value: phoneNumber
      },
      {
        Name: "given_name",
        Value: firstName
      },
      {
        Name: "family_name",
        Value: lastName
      }
    ]
  };

  return new Promise<UserRecord>((resolve, reject) => {
    cognitoidentityserviceprovider.adminCreateUser(request, (err, data) => {
      if (err) reject(err);
      if (!!data && !!data.User && data.User !== null) {
        const {
          Username,
          UserCreateDate,
          UserLastModifiedDate,
          Enabled,
          UserStatus
        } = data.User;

        const user: UserRecord = {
          id: Username,
          ...params,
          enabled: Enabled,
          emailVerified: false,
          phoneVerified: false,
          createdAt: UserCreateDate,
          updatedAt: UserLastModifiedDate,
          status: UserStatus
        };

        if (password) {
          const passwordSetRequest = {
            Password: password,
            UserPoolId: Config.UserPoolId,
            Username: Username,
            Permanent: true
          };
          console.log(passwordSetRequest);
          cognitoidentityserviceprovider.adminSetUserPassword(
            passwordSetRequest,
            (err, data) => {
              if (err) console.error(err);
              console.debug(data);
            }
          );
        }

        resolve(user);
      }
      reject(
        "When creating a new user, the response from Cognito included no error and no user"
      );
    });
  });
};

export const signUpUser = async (
  params: SignUpUserParams
): Promise<CognitoUser> => {
  const attributeList = [];

  attributeList.push(
    new CognitoUserAttribute({
      Name: "email",
      Value: params.email
    })
  );
  attributeList.push(
    new CognitoUserAttribute({
      Name: "phone_number",
      Value: params.phoneNumber
    })
  );
  attributeList.push(
    new CognitoUserAttribute({
      Name: "given_name",
      Value: params.firstName
    })
  );
  attributeList.push(
    new CognitoUserAttribute({
      Name: "family_name",
      Value: params.lastName
    })
  );

  return new Promise<CognitoUser>((resolve, reject) => {
    userPool.signUp(
      params.email,
      params.password,
      attributeList,
      null,
      (err, result) => {
        if (err) {
          console.error("Error creating a new user: ", err);
          reject(err);
        }
        const cognitoUser = result.user;
        console.log("Created new user " + cognitoUser.getUsername());
        resolve(cognitoUser);
      }
    );
  });
};

export const getUser = async (email: string): Promise<UserRecord> => {
  const userResponse = await cognitoidentityserviceprovider
    .adminGetUser({ UserPoolId: Config.UserPoolId, Username: email })
    .promise();

  const attrResponse = userResponse.UserAttributes;
  const phoneNumber = attrResponse.find(a => a.Name === "phone_number");
  const phoneVerified = attrResponse.find(
    a => a.Name === "phone_number_verified"
  );
  const emailVerified = attrResponse.find(a => a.Name === "email_verified");
  const firstName = attrResponse.find(a => a.Name === "given_name");
  const lastName = attrResponse.find(a => a.Name === "family_name");

  console.log(userResponse);

  let attrs: UserRecord = {
    id: userResponse.Username,
    email,
    phoneNumber: phoneNumber ? phoneNumber.Value : "",
    phoneVerified: phoneVerified ? Boolean(phoneVerified.Value) : false,
    emailVerified: emailVerified ? Boolean(emailVerified.Value) : false,
    firstName: firstName ? firstName.Value : "",
    lastName: lastName ? lastName.Value : "",
    enabled: userResponse.Enabled,
    createdAt: userResponse.UserCreateDate,
    updatedAt: userResponse.UserLastModifiedDate,
    status: userResponse.UserStatus
  };

  return attrs;
};

export const getCognitoUser = async (email: string): Promise<CognitoUser> => {
  const userData = {
    Username: email,
    Pool: userPool
  };

  return new CognitoUser(userData);
};
