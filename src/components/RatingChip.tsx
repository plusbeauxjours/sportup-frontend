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
        if (onChipPress !== null) {
          onChipPress(sportId);
        }
      }}
      style={selected && { backgroundColor: PRIMARY_COLOR }}
    >
      <Text>
        <Text style={selected && { color: "#fff" }}>{name}</Text>
        {rating && <Caption> {rating}</Caption>}
      </Text>
    </Chip>
  );
};

export default RatingChip;
