import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <LoadingContainer>
    <ActivityIndicator size="large" style={{ margin: 20 }} />
  </LoadingContainer>
);
