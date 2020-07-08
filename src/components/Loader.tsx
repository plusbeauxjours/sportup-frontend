import React from "react";
import { ActivityIndicator } from "react-native";
import constants from "../constants/dimensions";
import styled from "styled-components/native";

const Container = styled.View`
  width: ${constants.width}px;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Container>
    <ActivityIndicator color={"#999"} />
  </Container>
);
