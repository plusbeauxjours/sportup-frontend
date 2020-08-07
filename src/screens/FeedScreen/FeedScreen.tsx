import React, { useState } from "react";
import styled from "styled-components/native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useNavigation } from "@react-navigation/native";

import { GET_MAIN_FEED } from "./FeedScreenQueries";
import { GetMainFeed, GetMainFeedVariables } from "../../types/api";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import AddBtn from "../../components/AddBtn";

const Conatiner = styled.View`
  flex: 1;
  background-color: white;
`;

const FeedScreen: NavigationStackScreenComponent = () => {
  const navigation = useNavigation();
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
    navigation.navigate("WritePostScreen");
  };

  if (getMainFeedLoading) {
    return <Loader />;
  } else {
    return (
      <Conatiner>
        <FeedList
          posts={posts}
          refreshing={networkStatus === 4}
          onRefresh={() => {
            getMainFeedRefetch({ pageNum: 1 });
          }}
          ListFooterComponent={() => <ListFooterComponent loading={loading} />}
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
                      hasNextPage: fetchMoreResult.getMainFeed.hasNextPage,
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
        <AddBtn onPress={onPress} />
      </Conatiner>
    );
  }
};

export default FeedScreen;
