import React from "react";
import { Text, Caption } from "react-native-paper";
import { PRIMARY_COLOR } from "../constants/colors";
import styled from "styled-components/native";

const Touchable = styled.TouchableOpacity<ITheme>`
  margin: 2px;
  padding: 5px 10px;
  background-color: ${(props) =>
    props.selected ? PRIMARY_COLOR : "rgba(255, 255, 255, 0.5)"};
  border-width: 0.3px;
  border-color: ${(props) => (props.selected ? PRIMARY_COLOR : "grey")};
  flex-wrap: wrap;
  border-radius: 18px;
  height: 36px;
  justify-content: center;
  align-items: center;
`;

interface ITheme {
  selected: boolean;
}

interface IProps {
  sportId: string;
  name: string;
  disabled?: boolean;
  rating?: number;
  selected?: boolean;
  onChipPress?: (sportId: string) => void;
}
const RatingChip: React.FC<IProps> = ({
  sportId,
  name,
  disabled = false,
  rating = null,
  selected = false,
  onChipPress = null,
}) => {
  return (
    <Touchable
      selected={selected}
      disabled={disabled}
      onPress={() => {
        onChipPress && onChipPress(sportId);
      }}
    >
      <Text style={selected && { color: "#fff" }}>{name}</Text>
      {rating && <Caption> ⭐️{rating}</Caption>}
    </Touchable>
  );
};

export default RatingChip;
