import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components";

const View = styled.View``;
const Text = styled.Text``;

interface IProps {
  feed: any;
  disableNavigation: boolean;
}

const FeedList: React.FC<IProps> = ({
  feed = [],
  disableNavigation = false,
  ...rest
}) => (
  <FlatList
    data={feed}
    renderItem={({ item }) => (
      <View>
        <Text>{item}</Text>
      </View>
    )}
    keyExtractor={post => post.id.toString()}
    {...rest}
  />
);

export default FeedList;
