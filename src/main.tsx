import { Auth0Provider } from "@auth0/auth0-react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import clientConfig from "../convex/_generated/clientConfig";
import App from "./components/App/App";
import Events from "./components/Events/Events";
import Invitation from "./components/Invitation/Invitation";
import Landing from "./components/Landing/Landing";
import RequireSignedIn from "./components/RequireSignedIn/RequireSignedIn";
import "./style/index.css";

const convex = new ConvexReactClient(clientConfig);

ReactDOM.render(
  <Auth0Provider
    domain="dev-gvxf5mpp.us.auth0.com"
    clientId="R7uE0NF2NuZaLLI8fJv4JOaqjiHAoc8H"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
    onRedirectCallback={appState => {
      // Auth0 doesn't accept wildcards for allowed callback URLs, so we
      // include a `returnTo` property when calling `loginWithRedirect`. We
      // can then perform the redirect when the user arrives back in our app.
      if (appState.returnTo) {
        window.location.replace(appState.returnTo);
      }
    }}
  >
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/" element={<App />}>
            <Route
              path="events"
              element={
                <RequireSignedIn>
                  <Events />
                </RequireSignedIn>
              }
            />
            <Route path="redirect" element={<h2>Redirecting...</h2>} />
            <Route path="*" element={<p>Page not found.</p>} />
          </Route>
          <Route path="/" element={<App dark />}>
            <Route path="invitation/:inviteCode" element={<Invitation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConvexProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
