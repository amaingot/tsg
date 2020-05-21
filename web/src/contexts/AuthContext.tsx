/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Role, GetMeQuery, useGetMeQuery } from "../graphql/hooks";
import config from "../utils/config";

interface AuthContextState {
  loggedIn: boolean;
  currentPerson?: GetMeQuery["me"];
  role?: Role;
  refresh: () => void;
}

const AuthContext = React.createContext<AuthContextState>({
  loggedIn: false,
  refresh: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC = (props) => {
  const [currentPerson, setCurrentPerson] = React.useState<GetMeQuery["me"]>();

  const meResult = useGetMeQuery();

  const loggedIn = currentPerson !== undefined;
  const role = currentPerson?.role;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refresh = () => {
    const cookie = document.cookie
      .split(";")
      .filter((c) => c.includes(config.COOKIE_KEY));
    if (cookie) {
      meResult.refetch();
    } else {
      setCurrentPerson(undefined);
    }
  };

  React.useEffect(() => {
    const me = meResult.data?.me;
    if (me && me.family) {
      setCurrentPerson(me);
    }
  }, [meResult]);

  return (
    <AuthContext.Provider value={{ currentPerson, loggedIn, role, refresh }}>
      {props.children}
    </AuthContext.Provider>
  );
};
