import React from "react";
import { ActivityIndicator } from "react-native";
import constants from "../constants/dimensions";
import styled from "styled-components";

const Container = styled.View`
  width: ${constants.width};
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Container>
    <ActivityIndicator color={"#999"} />
  </Container>
);
