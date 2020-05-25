import React from "react";
import auth, { User } from "../utils/auth";
import { Employee, Client, useGetMeLazyQuery } from "../graphql/hooks";

type EmployeeRecord = Pick<
  Employee,
  | "id"
  | "clientId"
  | "firstName"
  | "lastName"
  | "email"
  | "cellPhone"
  | "userRole"
  | "updatedAt"
  | "createdAt"
>;

type ClientRecord = Pick<
  Client,
  "id" | "updatedAt" | "createdAt" | "name" | "stripeCustomerId"
>;

interface AuthContextState {
  loggedIn: boolean;
  loading: boolean;
  user?: User;
  employee?: EmployeeRecord;
  client?: ClientRecord;
}

const AuthContext = React.createContext<AuthContextState>({
  loggedIn: false,
  loading: true,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC = (props) => {
  const [getMe, meResult] = useGetMeLazyQuery();

  const [user, setUser] = React.useState<User>();
  const [employee, setEmployee] = React.useState<EmployeeRecord>();
  const [client, setClient] = React.useState<ClientRecord>();
  const [authLoading, setAuthLoading] = React.useState(true);

  React.useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        getMe();
      } else {
        setUser(undefined);
        setEmployee(undefined);
        setClient(undefined);
      }
      setAuthLoading(false);
    });
  }, [getMe]);

  React.useEffect(() => {
    if (meResult.data?.me?.client) {
      setEmployee(meResult.data.me);
      setClient(meResult.data.me.client);
    }
  }, [meResult]);

  const loading = authLoading || meResult.loading;

  return (
    <AuthContext.Provider
      value={{ loading, loggedIn: user !== undefined, user, employee, client }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
