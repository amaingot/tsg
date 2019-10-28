import * as NodeFetch from "node-fetch";
global["fetch"] = NodeFetch;
import * as AWS_SDK from "aws-sdk";
import AWSXray from "aws-xray-sdk-core";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";

const AWS = process.env.DISABLE_XRAY ? AWS_SDK : AWSXray.captureAWS(AWS_SDK);

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
      },
      {
        Name: "email_verified",
        Value: "false"
      },
      {
        Name: "phone_number_verified",
        Value: "false"
      }
    ]
  };

  return new Promise<UserRecord>((resolve, reject) => {
    cognitoidentityserviceprovider.adminCreateUser(
      request,
      async (err, data) => {
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
            await setUserPassword(Username, password);
          }

          resolve(user);
        }
        reject(
          "When creating a new user, the response from Cognito included no error and no user"
        );
      }
    );
  });
};

export const disableUser = async (userId: string) => {
  const request = {
    UserPoolId: Config.UserPoolId,
    Username: userId
  };

  return new Promise<void>((resolve, reject) =>
    cognitoidentityserviceprovider.adminDisableUser(request, err => {
      if (err) reject(err);
      resolve();
    })
  );
};

export const globalSignoutUser = async (userId: string) => {
  const request = {
    UserPoolId: Config.UserPoolId,
    Username: userId
  };

  return new Promise<void>((resolve, reject) =>
    cognitoidentityserviceprovider.adminUserGlobalSignOut(request, err => {
      if (err) reject(err);
      resolve();
    })
  );
};

export const setUserAttribute = async (
  userId: string,
  attributeKey: string,
  attributeValue: string
) => {
  const request: AWS_SDK.CognitoIdentityServiceProvider.AdminUpdateUserAttributesRequest = {
    UserPoolId: Config.UserPoolId,
    Username: userId,
    UserAttributes: []
  };

  const user = await _getUser(userId);

  request.UserAttributes = user.UserAttributes;

  const indexOfSub = user.UserAttributes.findIndex(a => a.Name === "sub");

  request.UserAttributes.splice(indexOfSub);

  const indexOfCurrentValue = user.UserAttributes.findIndex(
    a => a.Name === attributeKey
  );

  if (indexOfCurrentValue >= 0) {
    request.UserAttributes[indexOfCurrentValue].Value = attributeValue;
  } else {
    request.UserAttributes.push({ Name: attributeKey, Value: attributeValue });
  }

  return new Promise<void>((resolve, reject) =>
    cognitoidentityserviceprovider.adminUpdateUserAttributes(request, err => {
      if (err) reject(err);
      resolve();
    })
  );
};

export const resetUserPassword = async (userId: string) => {
  const request = {
    UserPoolId: Config.UserPoolId,
    Username: userId
  };

  return new Promise<void>((resolve, reject) =>
    cognitoidentityserviceprovider.adminResetUserPassword(request, err => {
      if (err) reject(err);
      resolve();
    })
  );
};

export const setUserPassword = async (userId: string, password: string) => {
  const request = {
    UserPoolId: Config.UserPoolId,
    Username: userId,
    Permanent: true,
    Password: password
  };

  return new Promise<void>((resolve, reject) =>
    cognitoidentityserviceprovider.adminSetUserPassword(request, err => {
      if (err) reject(err);
      resolve();
    })
  );
};

export const enableUser = async (userId: string) => {
  const request = {
    UserPoolId: Config.UserPoolId,
    Username: userId
  };

  return new Promise<void>((resolve, reject) =>
    cognitoidentityserviceprovider.adminEnableUser(request, err => {
      if (err) reject(err);
      resolve();
    })
  );
};

export const confirmSignUp = async (userId: string) => {
  const request = {
    UserPoolId: Config.UserPoolId,
    Username: userId
  };

  return new Promise<void>((resolve, reject) =>
    cognitoidentityserviceprovider.adminConfirmSignUp(request, err => {
      if (err) reject(err);
      resolve();
    })
  );
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

const _getUser = async (email: string) => {
  return cognitoidentityserviceprovider
    .adminGetUser({ UserPoolId: Config.UserPoolId, Username: email })
    .promise();
};

export const getUser = async (email: string): Promise<UserRecord> => {
  const userResponse = await _getUser(email);

  const cognitoAttrs = userResponse.UserAttributes;
  const phoneNumber = cognitoAttrs.find(a => a.Name === "phone_number");
  const phoneVerified = cognitoAttrs.find(
    a => a.Name === "phone_number_verified"
  );
  const emailVerified = cognitoAttrs.find(a => a.Name === "email_verified");
  const firstName = cognitoAttrs.find(a => a.Name === "given_name");
  const lastName = cognitoAttrs.find(a => a.Name === "family_name");

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
