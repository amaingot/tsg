import RollbarType from 'rollbar';
import Auth, { CognitoUser } from '@aws-amplify/auth';

const updateRollbarPerson = async (rb: RollbarType) => {
  try {
    Auth.currentAuthenticatedUser().then((user: CognitoUser) =>
      user.getUserData((error, userData) =>
        !error && !!userData && rb.configure({
          payload: {
            person: {
              id: userData.Username,
              username: userData.Username,
              email: userData.Username
            },
          }
        })
      ));
  } catch {
    rb.configure({
      payload: {
        person: null,
      }
    })
  }
};

export default updateRollbarPerson;