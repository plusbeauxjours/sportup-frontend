import React from "react";
import { Chip, Text, Caption } from "react-native-paper";
import { PRIMARY_COLOR } from "../constants/colors";

interface IProps {
  sportId: string;
  name?: string;
  icon?: string;
  rating?: number;
  selected?: boolean;
  onChipPress: (sportId: string) => void;
}
const RatingChip: React.FC<IProps> = ({
  sportId,
  name,
  icon,
  rating = null,
  selected = false,
  onChipPress = null,
}) => {
  return (
    <Chip
      icon={icon && { uri: icon }}
      onPress={() => {
        onChipPress && onChipPress(sportId);
      }}
      style={{
        backgroundColor: selected ? PRIMARY_COLOR : "transparent",
        borderColor: selected ? PRIMARY_COLOR : "grey",
        margin: 2,
      }}
    >
      <Text>
        <Text style={selected && { color: "#fff" }}>{name}</Text>
        {rating && <Caption> {rating}</Caption>}
      </Text>
    </Chip>
  );
};

export default RatingChip;
