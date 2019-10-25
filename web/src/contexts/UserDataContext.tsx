import React from "react";
import { Employee, Client, GetMeResponse } from "tsg-shared";
import Auth, { CognitoUser } from "@aws-amplify/auth";

import axios from "../utils/axios";

interface UserDataContextShape {
  employee?: Employee;
  user?: CognitoUser;
  client?: Client;
  loading: boolean;
  reload: (forceRedirect?: boolean) => Promise<void>;
}

const UserDataContext = React.createContext<UserDataContextShape>({
  loading: true,
  reload: () => new Promise(() => {})
});

export const UserDataContextProvider: React.FC = props => {
  const [user, setUser] = React.useState<CognitoUser>();
  const [employee, setEmployee] = React.useState<Employee>();
  const [client, setClient] = React.useState<Client>();

  const [cogLoading, setCogLoading] = React.useState(true);
  const [meLoading, setMeLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  const reload = async (forceRedirect = false) => {
    try {
      const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
      setCogLoading(false);
      const meResponse = await axios.get<GetMeResponse>("/clients/me");
      setClient(meResponse.data.data.client);
      setEmployee(meResponse.data.data.user);
      setMeLoading(false);
    } catch (e) {
      if (forceRedirect) {
        window.Rollbar.info(
          "A user tried to access private pages without being logged in",
          e
        );
        window.location.replace("/");
      }
    }
  };

  React.useEffect(() => {
    reload();
  }, []);

  React.useEffect(() => {
    if (!meLoading && !cogLoading) {
      setLoading(false);
    }
  }, [meLoading, cogLoading]);

  React.useEffect(() => {
    if (employee && client) {
      window.Rollbar.configure({
        payload: {
          person: {
            id: employee.id,
            username: employee.email,
            email: employee.email
          }
        }
      });
      window.analytics.identify(employee.id, {
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email
      });

      window.analytics.group(client.id, {
        name: client.name
      });
    }
  }, [employee, client]);

  return (
    <UserDataContext.Provider
      value={{ user, client, employee, loading, reload }}
    >
      {props.children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => React.useContext(UserDataContext);
