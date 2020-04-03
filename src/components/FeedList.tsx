import React from "react";
import { FlatList } from "react-native";
import PostCard from "./PostCard";

interface IProps {
  data: any;
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
  data: { getMyFeed: { posts = null } = {} } = {},
  refreshing,
  disableNavigation = false,
  ...rest
}) => (
  <>
    <FlatList
      data={posts}
      refreshing={refreshing}
      renderItem={({ item }) => (
        <PostCard {...item} disableNavigation={disableNavigation} />
      )}
      keyExtractor={post => post.uuid.toString()}
      {...rest}
    />
  </>
);

export default FeedList;
