import * as React from "react";
import cookies from "browser-cookies";

import {
  AccountFragmentFragment,
  EmployeeFragmentFragment,
  useGetMeLazyQuery,
  UserFragmentFragment,
} from "../graphql/hooks";

interface AuthContextState {
  loggedIn: boolean;
  loading: boolean;
  me?: {
    user: UserFragmentFragment;
    account: AccountFragmentFragment;
    employee: EmployeeFragmentFragment;
  };
}

const AuthContext = React.createContext<AuthContextState>({
  loggedIn: false,
  loading: true,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC = (props) => {
  const [getMe, { data, loading, called }] = useGetMeLazyQuery({
    onError: (e) => console.log(`User is not logged in: ${JSON.stringify(e)}`),
  });
  const token = cookies.get(window.App.COOKIE_KEY);

  React.useEffect(() => {
    if (token && !called) {
      getMe();
    }
  }, [token, called, getMe]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        loggedIn: data?.me !== undefined,
        me: data?.me,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
