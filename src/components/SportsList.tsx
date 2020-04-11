import React from "react";
import { FlatList } from "react-native";

import RatingChip from "./RatingChip";
import { GetAllSports_getAllSports_sports } from "../types/api";

interface IProps {
  sports: GetAllSports_getAllSports_sports;
  onChipPress?: (sportUuid: string) => void;
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
        sportUuid={item.sportUuid}
        name={item.name}
        rating={item.rating}
        onPress={onChipPress}
      />
    )}
    keyExtractor={(sport) => sport.sportUuid.toString()}
    {...rest}
  />
);

export default SportsList;
