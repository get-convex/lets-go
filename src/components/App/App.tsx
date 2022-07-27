import classNames from "classnames";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useConvex, useMutation } from "../../../convex/_generated/react";
import { useAuth } from "../../hooks/auth.hooks";
import Header from "../Header/Header";
import "./App.scss";

interface AppProps {
  dark?: boolean;
}

const App = ({ dark }: AppProps) => {
  const { isSignedIn, isLoading, getIdTokenClaims } = useAuth();
  const convex = useConvex();
  const storeUser = useMutation("storeUser");

  useEffect(() => {
    if (isLoading) {
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
        let id = await storeUser();
      });
    } else {
      // Tell the Convex client to clear all authentication state.
      convex.clearAuth();
    }
  }, [isSignedIn, isLoading, getIdTokenClaims, convex, storeUser]);

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
