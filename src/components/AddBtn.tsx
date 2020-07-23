import React from "react";
import styled from "styled-components/native";

import { PRIMARY_COLOR } from "../constants/colors";

const AddIcon = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: white;
  padding-bottom: 3px;
`;
const IconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${PRIMARY_COLOR};
  box-shadow: 7px 10px 10px rgba(100, 100, 100, 0.5);
`;

interface IProps {
  onPress: () => void;
}
const AddBtn: React.FC<IProps> = ({ onPress }) => {
  return (
    <IconContainer onPress={onPress}>
      <AddIcon>+</AddIcon>
    </IconContainer>
  );
};

export default AddBtn;
