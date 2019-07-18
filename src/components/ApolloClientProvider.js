import React, { useContext, useMemo } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AccessTokenContext from "./AccessTokenContext";

function ApolloClientProvider({ children }) {
  const [accessToken] = useContext(AccessTokenContext);
  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        uri: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }),
    [accessToken]
  );

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
