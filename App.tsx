import React from "react";
import { AsyncStorage } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

import { GRAPHQL_URL } from "./src/constants/urls";
import NavController from "./src/components/NavController";

const httpLink = createUploadLink({
  uri: GRAPHQL_URL
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloHooksProvider client={client}>
      <PaperProvider>
        <NavController />
      </PaperProvider>
    </ApolloHooksProvider>
  );
}
