import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { AsyncStorage } from "react-native";
import { persistCache } from "apollo-cache-persist";
import { Provider as PaperProvider } from "react-native-paper";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloProvider } from "react-apollo";

import apolloClientOptions from "./apollo";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

import { GRAPHQL_URL } from "./src/constants/urls";
import AppContainer from "./src/components/AppContainer";

export default function App() {
  const [client, setClient] = useState<any>(null);
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);
  const makeClient = async () => {
    try {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      // await AsyncStorage.clear();
      cache.reset();
      let httpLink = createUploadLink({
        uri: GRAPHQL_URL as string,
      });
      let authLink = setContext(async (_: any, { headers }: any) => {
        const token = await AsyncStorage.getItem("jwt");
        return {
          headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : "",
          },
        };
      });
      const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
        ...apolloClientOptions,
      });
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  const loadResourcesAsync = async () => {
    await Asset.loadAsync([]);
  };
  const handleLoadingError = (error) => {
    console.warn(error);
  };
  const handleFinishLoading = () => {
    setLoadingComplete(true);
  };
  useEffect(() => {
    makeClient();
  }, []);
  if (isLoadingComplete && client !== null) {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <PaperProvider>
            <AppContainer />
          </PaperProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading()}
      />
    );
  }
}
