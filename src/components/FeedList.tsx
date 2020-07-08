import React from "react";
import { FlatList } from "react-native";
import PostCard from "./PostCard";

interface IProps {
  posts: any;
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
  posts,
  refreshing,
  disableNavigation = false,
  ...rest
}) => (
  <FlatList
    data={posts}
    refreshing={refreshing}
    renderItem={({ item }) => (
      <PostCard {...item} disableNavigation={disableNavigation} />
    )}
    keyExtractor={(post) => post.id.toString()}
    {...rest}
  />
);

export default FeedList;
