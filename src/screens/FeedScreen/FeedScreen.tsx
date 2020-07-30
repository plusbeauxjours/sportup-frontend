import React, { useState, useRef } from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { useHeaderHeight } from "react-navigation-stack";
import Animated from "react-native-reanimated";

import { GET_MAIN_FEED } from "./FeedScreenQueries";
import { GetMainFeed, GetMainFeedVariables } from "../../types/api";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";
import WritePost from "../../components/WritePost/WritePost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import AddBtn from "../../components/AddBtn";
import utils from "../../utils/utils";
import constants from "../../constants/dimensions";

const Conatiner = styled.View`
  flex: 1;
  background-color: white;
`;

const ListConatiner = styled.View`
  width: 50%;
`;

const WhiteSpace = styled.View<ITheme>`
  height: ${(props) => props.headerHeight}px;
`;

interface ITheme {
  headerHeight: number;
}

const {
  Value,
  concat,
  interpolate,
  cond,
  and,
  greaterOrEq,
  lessThan,
} = Animated;

const FeedScreen = () => {
  let writeMode = false;
  const x = new Value(0);
  const scrollRef = useRef(null);
  const { width } = constants;
  const headerHeight = useHeaderHeight();
  const isAndroid = utils.isAndroid();
  const perspective = isAndroid ? undefined : 1000;
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: { getMainFeed: { posts = null, hasNextPage, pageNum } = {} } = {},
    loading: getMainFeedLoading,
    fetchMore: getMainFeedFetchMore,
    networkStatus,
    refetch: getMainFeedRefetch,
  } = useQuery<GetMainFeed, GetMainFeedVariables>(GET_MAIN_FEED, {
    variables: { pageNum: 1 },
    fetchPolicy: "network-only",
  });

  const onPress = () => {
    if (writeMode) {
      scrollRef.current &&
        scrollRef.current?.getNode()?.scrollTo({ x: 0, animated: true });
      writeMode = false;
    } else {
      scrollRef.current &&
        scrollRef.current?.getNode()?.scrollTo({ x: width, animated: true });
      writeMode = true;
    }
  };

  const rotateYAsDeg = interpolate(x, {
    inputRange: [0, width],
    outputRange: [0, 180],
  });

  const rotateY = concat(rotateYAsDeg, "deg");
  const opacity = isAndroid
    ? cond(
        and(greaterOrEq(rotateYAsDeg, -90), lessThan(rotateYAsDeg, 90)),
        1,
        0
      )
    : 1;
  const backOpacity = isAndroid ? cond(opacity, 0, 1) : 1;

  if (getMainFeedLoading) {
    return <Loader />;
  } else {
    return (
      <Conatiner>
        <Animated.ScrollView
          ref={scrollRef}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: width * 2 }}
          scrollEventThrottle={1}
          // scrollEnabled={false}
          horizontal
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { x },
              },
            },
          ])}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "center",
              alignItems: "center",
              opacity: backOpacity,
              backfaceVisibility: "hidden",
              transform: [{ perspective }, { rotateY: "180deg" }, { rotateY }],
            }}
          >
            <WritePost scrollRef={scrollRef} />
          </Animated.View>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              opacity: backOpacity,
              backfaceVisibility: "hidden",
              transform: [{ perspective }, { rotateY }],
            }}
          >
            <WhiteSpace headerHeight={headerHeight} />
            <ListConatiner>
              <FeedList
                posts={posts}
                refreshing={networkStatus === 4}
                onRefresh={() => {
                  getMainFeedRefetch({ pageNum: 1 });
                }}
                ListFooterComponent={() => (
                  <ListFooterComponent loading={loading} />
                )}
                onEndReached={() => {
                  if (!loading && hasNextPage) {
                    getMainFeedFetchMore({
                      variables: {
                        pageNum: pageNum + 1,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        if (!fetchMoreResult.getMainFeed) return prev;
                        return Object.assign({}, prev, {
                          getMainFeed: {
                            ...prev.getMainFeed,
                            pageNum: fetchMoreResult.getMainFeed.pageNum,
                            hasNextPage:
                              fetchMoreResult.getMainFeed.hasNextPage,
                            posts: [
                              ...prev.getMainFeed.posts,
                              ...fetchMoreResult.getMainFeed.posts,
                            ],
                          },
                        });
                      },
                    });
                    setLoading(true);
                  }
                }}
                onEndReachedThreshold={0.2}
                onMomentumScrollBegin={() => {
                  setLoading(false);
                }}
                disableNavigation={false}
              />
            </ListConatiner>
          </Animated.View>
        </Animated.ScrollView>
        <AddBtn onPress={onPress} />
      </Conatiner>
    );
  }
};
FeedScreen.navigationOptions = ({ navigation }) => ({
  title: "Feed",
  headerTransparent: true,
  headerBackground: () => (
    <BlurView intensity={10} tint="light" style={StyleSheet.absoluteFill} />
  ),
  headerLeft: () => (
    <Appbar.Action
      icon="menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  ),
});

export default FeedScreen;
