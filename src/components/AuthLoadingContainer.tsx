import React, { useEffect } from "react";

import { ActivityIndicator, AsyncStorage } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default ({ navigation }) => {
  const checkAuthentication = async () => {
    try {
      const id = await AsyncStorage.getItem("jwt");
      navigation.navigate(id ? "Main" : "Auth");
    } catch (_) {
      navigation.navigate("Auth");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
};
