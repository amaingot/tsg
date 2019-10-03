import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.USER_POOL_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

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

  const promise = new Promise<CognitoUser>((resolve, reject) => {
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

  const user = await promise;

  return user;
};

interface UserAttributes extends InitialUserAttributes {
  id: string;
}

export const getUserAttributes = async (
  cognitoUser: CognitoUser
): Promise<UserAttributes> => {
  return new Promise<UserAttributes>((resolve, reject) => {
    cognitoUser.getUserAttributes((err, result) => {
      if (err) {
        console.error("Failed fetching user id, ", err);
        reject(err);
      } else if (!result) {
        console.log("Failed fetching user id. No user id present");
        reject(err);
      } else {
        const params = result.reduce((prev, curr) => {
          return {
            ...prev,
            [curr.getName()]: curr.getValue()
          };
        }, {}) as UserAttributes;
        resolve(params);
      }
    });
  });
};

export const getCognitoUser = (email: string): CognitoUser => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  return cognitoUser
}