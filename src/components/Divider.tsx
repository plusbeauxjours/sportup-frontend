import React from "react";
import styled from "styled-components";
import Reac from "react";

const View = styled.View`
  flex-direction: row;
  padding: 15px;
`;
const Container = styled.View`
  background-color: #3f51b5;
  height: 1;
  flex: 1;
  opacity: 0.4;
  align-self: center;
`;

const Text = styled.Text`
  align-self: center;
  padding: 0 5px;
  color: #3f51b5;
  opacity: 0.7;
`;

interface IProps {
  text: string;
}

const Divider: Reac.FC<IProps> = ({ text }) => {
  return (
    <View style={{ flexDirection: "row", padding: 15 }}>
      <Container />
      <Text>{text}</Text>
      <Container />
    </View>
  );
};

export default Divider;
