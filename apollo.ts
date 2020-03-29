import { AsyncStorage } from "react-native";
import { MAIN_URL } from './src/constants/urls';

const apolloClientOptions = {
  uri: MAIN_URL,
  request: async (operation) => {
    const token = await AsyncStorage.getItem("jwt");
    operation.setContext({
      headers: {
        authorization: token ? `JWT ${token}` : ""
      }
    });
  }
};

export default apolloClientOptions;
