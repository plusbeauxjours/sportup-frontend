import React from "react";
import { FlatList } from "react-native";

import RatingChip from "./RatingChip";
import { GetAllSports_getAllSports_sports } from "../types/api";

interface IProps {
  sports: GetAllSports_getAllSports_sports;
  onChipPress?: (sportId: string) => void;
}

const SportsList: React.FC<IProps> = ({
  sports = [],
  onChipPress = null,
  ...rest
}) => (
  <FlatList
    horizontal
    data={sports}
    renderItem={({ item }) => (
      <RatingChip
        sportId={item.id}
        name={item.name}
        rating={item.rating}
        onChipPress={onChipPress}
      />
    )}
    keyExtractor={(sport) => sport.id.toString()}
    {...rest}
  />
);

export default SportsList;
