import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

export const useAuth = () => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
    logout,
    getIdTokenClaims,
  } = useAuth0();
  const location = useLocation();

  const isSignedIn = !isLoading && isAuthenticated;

  const signIn = () =>
    loginWithRedirect({
      redirectUri: `${window.location.origin}/redirect`,
      appState: {
        returnTo: location.pathname,
      },
    });

  const signOut = () => logout({ returnTo: window.location.origin });

  return { signIn, isSignedIn, user, signOut, isLoading, getIdTokenClaims };
};
