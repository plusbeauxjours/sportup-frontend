import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components";

const View = styled.View``;
const Text = styled.Text`
  font-size: 100px;
`;

interface IProps {
  feed: any;
  refreshing: boolean;
  disableNavigation: boolean;
  onRefresh: () => void;
  ListHeaderComponent: () => JSX.Element;
  ListFooterComponent: () => JSX.Element;
  onEndReached: () => void;
  onMomentumScrollBegin: () => void;
  onEndReachedThreshold: number;
}

const FeedList: React.FC<IProps> = ({
  feed = [],
  refreshing,
  disableNavigation = false,
  ...rest
}) => (
  <FlatList
    data={feed}
    refreshing={refreshing}
    renderItem={({ item, index }) => (
      <View key={index}>
        <Text>{item.id}</Text>
        <Text>{item.id}</Text>
        <Text>{item.id}</Text>
        <Text>{item.id}</Text>
        <Text>{item.id}</Text>
      </View>
    )}
    keyExtractor={psot => psot.id}
    {...rest}
  />
);

export default FeedList;
