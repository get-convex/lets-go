import { useAuth0 } from "@auth0/auth0-react";

const RequireSignedIn = ({ children }: { children: JSX.Element }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    loginWithRedirect({
      redirectUri: `${window.location.origin}/events`,
    });

    return <p>You are not authenticated.</p>;
  }

  return children;
};

export default RequireSignedIn;
