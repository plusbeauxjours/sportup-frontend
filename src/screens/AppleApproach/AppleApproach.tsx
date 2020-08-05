import React, { useState } from "react";
import styled from "styled-components/native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useMutation } from "react-apollo-hooks";
import { APPLE_CONNECT } from "./AppleApproachQueries";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { FontAwesome } from "@expo/vector-icons";

import { AppleConnect, AppleConnectVariables } from "../../types/api";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  flex-direction: row;
  background-color: #000;
  width: 240px;
  height: 40px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const LoginTextContainer = styled.View`
  width: 200px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [appleConnectFn, { loading: appleConnectLoading }] = useMutation<
    AppleConnect,
    AppleConnectVariables
  >(APPLE_CONNECT);

  const appleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      try {
        const {
          data: { appleConnect },
        } = await appleConnectFn({
          variables: {
            firstName: credential.fullName.givenName,
            lastName: credential.fullName.familyName,
            email: credential.email,
            appleId: credential.user,
          },
        });
        await AsyncStorage.setItem("jwt", appleConnect.token);
        if (appleConnect.token) {
          await setLoading(false);
          navigation.navigate("Main");
        }
      } catch ({ message }) {
        console.log(`Apple Login Error: ${message}`);
        setLoading(false);
      }
    } catch ({ message }) {
      console.log(`Apple Login Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Touchable
      disabled={loading}
      onPress={() => {
        setLoading(true), appleLogin();
      }}
    >
      <Container>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <LoginTextContainer>
            <FontAwesome name={"apple"} color={"white"} size={20} />
            <Text>CONTINUE WITH APPLE</Text>
          </LoginTextContainer>
        )}
      </Container>
    </Touchable>
  );
};
