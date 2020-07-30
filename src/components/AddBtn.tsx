import React from "react";
import Animated from "react-native-reanimated";
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
  rotateIcon?: any;
  onPress: () => void;
}

const AddBtn: React.FC<IProps> = ({ onPress, rotateIcon }) => {
  return (
    <IconContainer onPress={onPress} activeOpacity={1}>
      <Animated.View
        style={{
          transform: [{ rotate: rotateIcon }],
        }}
      >
        <AddIcon>+</AddIcon>
      </Animated.View>
    </IconContainer>
  );
};

export default AddBtn;
