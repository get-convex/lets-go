import classNames from "classnames";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useConvex, useMutation } from "../../../convex/_generated/react";
import { useAuth } from "../../hooks/auth.hooks";
import Header from "../Header/Header";
import "./App.scss";

interface AppProps {
  dark?: boolean;
}

const App = ({ dark }: AppProps) => {
  const { isSignedIn, isLoading: authLoading, getIdTokenClaims } = useAuth();
  const convex = useConvex();
  const storeUser = useMutation("storeUser");
  const [userStored, setUserStored] = useState(false);

  const isLoading = authLoading || !userStored;

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (isSignedIn) {
      getIdTokenClaims().then(async (claims) => {
        // Get the raw ID token from the claims.
        let token = claims!.__raw;
        // Pass it to the Convex client.
        convex.setAuth(token);
        // Store the user in the database.
        // Recall that `storeUser` gets the user information via the `auth`
        // object on the server. You don't need to pass anything manually here.
        let userId = await storeUser();
        if (userId) {
          setUserStored(true);
        }
      });
    } else {
      // Tell the Convex client to clear all authentication state.
      convex.clearAuth();
    }
  }, [isSignedIn, authLoading, getIdTokenClaims, convex, storeUser]);

  return (
    <div className={classNames("App", { "App--dark": dark })}>
      <Header dark={dark} />
      <div className="App__content">
        {isLoading ? "Loading..." : <Outlet />}
      </div>
    </div>
  );
};

export default App;
