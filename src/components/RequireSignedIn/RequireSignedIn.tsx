import { useAuth0 } from "@auth0/auth0-react";

const RequireSignedIn = ({ children }: { children: JSX.Element }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    loginWithRedirect({
      redirectUri: "http://localhost:3000/events",
    });

    return <p>You are not authenticated.</p>;
  }

  return children;
};

export default RequireSignedIn;
