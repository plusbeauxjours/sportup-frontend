import React from "react";
import { FlatList } from "react-native";

import RatingChip from "./RatingChip";

interface IProps {
  sports: any;
  onChipPress?: (sportId: string) => void;
}

const SportsList: React.FC<IProps> = ({
  sports,
  onChipPress = null,
  ...rest
}) => (
  <FlatList
    horizontal
    data={sports}
    renderItem={({ item }: any) => (
      <RatingChip
        sportId={item.sportId}
        name={item.name}
        rating={item.rating}
        onChipPress={onChipPress}
      />
    )}
    keyExtractor={(sport: any) => sport.sportId.toString()}
    showsVerticalScrollIndicator={false}
    {...rest}
  />
);

export default SportsList;
