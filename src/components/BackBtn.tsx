import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import utils from "../utils/utils";

const Container = styled.View`
  width: 40px;
  padding-left: 20px;
`;

const BackBtn: React.FC = () => {
  const isAndroid = utils.isAndroid();
  return (
    <Container>
      <Ionicons
        name={isAndroid ? "md-arrow-back" : "ios-arrow-back"}
        size={28}
      />
    </Container>
  );
};

export default BackBtn;
