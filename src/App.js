import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, ColorMode } from "theme-ui";
import ApolloClientProvider from "./components/ApolloClientProvider";
import { AccessTokenProvider } from "./components/AccessTokenContext";
import PrivateRoute from "./components/PrivateRoute";
import HomeScreen from "./pages/HomeScreen";
import StargazersScreen from "./pages/StargazersScreen";
import AuthCallbackScreen from "./pages/AuthCallbackScreen";
import LogoutScreen from "./pages/LogoutScreen";
import theme from "./theme";

function App() {
  return (
    <AccessTokenProvider>
      <ApolloClientProvider>
        <ThemeProvider theme={theme}>
          <ColorMode />
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/auth/callback" component={AuthCallbackScreen} />
            <Route exact path="/logout" component={LogoutScreen} />
            <PrivateRoute
              path="/:repoOwner/:repoName"
              component={StargazersScreen}
            />
          </Switch>
        </ThemeProvider>
      </ApolloClientProvider>
    </AccessTokenProvider>
  );
}

export default App;
