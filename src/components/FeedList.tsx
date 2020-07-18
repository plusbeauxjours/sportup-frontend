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
  disableNavigation,
  ...rest
}) => (
  <>
    <FlatList
      data={posts}
      refreshing={refreshing}
      renderItem={({ item }: any) => (
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
      keyExtractor={(post: any) => post.id.toString()}
      {...rest}
    />
  </>
);

export default FeedList;
