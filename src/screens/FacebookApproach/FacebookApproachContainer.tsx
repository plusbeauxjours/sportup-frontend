import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import * as Facebook from "expo-facebook";
import { useMutation } from "react-apollo-hooks";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

import { FACEBOOK_CONNECT } from "./FacebookApproachQueries";
import FacebookApproachPresenter from "./FacebookApproachPresenter";
import { FacebookConnect, FacebookConnectVariables } from "../../types/api";
import MyProfileScreen from "../MyProfileScreen/MyProfileScreen";

const FacebookApproachContainer = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [facebookConnectFn] = useMutation<
    FacebookConnect,
    FacebookConnectVariables
  >(FACEBOOK_CONNECT);

  const fbLogin = async () => {
    try {
      await Facebook.initializeAsync("215367199809278", "SportUp");
      const authResult = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (authResult.type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${authResult.token}&fields=id,name,last_name,first_name,email`
        );
        const { id, email, first_name, last_name } = await response.json();
        const {
          data: { facebookConnect },
        } = await facebookConnectFn({
          variables: {
            firstName: first_name,
            lastName: last_name,
            email,
            fbId: id,
          },
        });
        await AsyncStorage.setItem("jwt", facebookConnect.token);
        if (facebookConnect.token) {
          await setLoading(false);
          navigation.reset({
            index: 1,
            routes: [{ name: "MainDrawer" }],
          });
        }
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FacebookApproachPresenter
      loading={loading}
      setLoading={setLoading}
      fbLogin={fbLogin}
    />
  );
};

export default FacebookApproachContainer;
