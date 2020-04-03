import React, { useState } from "react";
import styled from "styled-components";
import { Appbar } from "react-native-paper";

const View = styled.View``;
const Text = styled.Text``;

const Feed = ({ navigation }) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const { data: { getMainFeed = null } = {} };
  return (
    <View>
      <Text>Feed??</Text>
    </View>
  );
};
Feed.navigationOptions = ({ navigation }) => ({
  title: "Feed",
  headerLeft: () => (
    <Appbar.Action
      icon="menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  )
});

export default Feed;
