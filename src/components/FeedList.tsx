import React from "react";
import { FlatList } from "react-native";
import PostCard from "./PostCard";

interface IProps {
  posts: any;
  refreshing: boolean;
  disableNavigation: boolean;
  onRefresh: () => void;
  ListFooterComponent: () => JSX.Element;
  onEndReached: () => void;
  onMomentumScrollBegin: () => void;
  onEndReachedThreshold: number;
  onScroll?: (e) => void;
}

const FeedList: React.FC<IProps> = ({
  posts,
  refreshing,
  disableNavigation,
  ...rest
}) => (
  <>
    <FlatList
      data={posts}
      refreshing={refreshing}
      renderItem={({ item }) => (
        <PostCard
          id={item.id}
          postedBy={item.postedBy}
          score={item.score}
          text={item.text}
          interaction={item.interaction}
          postImg={item.postImg}
          createdAt={item.createdAt}
          disableNavigation={disableNavigation}
        />
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(post) => post.id.toString()}
      {...rest}
    />
  </>
);

export default FeedList;
