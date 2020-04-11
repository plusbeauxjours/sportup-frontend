import React from "react";
import { Query } from "react-apollo";
import { Appbar } from "react-native-paper";
import { GET_MAIN_FEED } from "./FeedScreenQueries";
import { GetMainFeed, GetMainFeedVariables } from "../../types/api";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";
import WritePost from "../../components/WritePost/WritePost";

class FeedScreen extends React.Component {
  public onEndReachedCalledDuringMomentum;
  static navigationOptions = ({ navigation }) => ({
    title: "Feed",
    headerLeft: () => (
      <Appbar.Action
        icon="menu"
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    ),
  });

  public render() {
    let pageNum = 1;

    return (
      <Query<GetMainFeed, GetMainFeedVariables>
        query={GET_MAIN_FEED}
        variables={{ pageNum }}
        fetchPolicy="cache-and-network"
      >
        {({
          data: { getMainFeed: { posts = null } = {} } = {},
          fetchMore,
          loading,
          refetch,
          networkStatus,
        }) => {
          return (
            <FeedList
              posts={posts}
              refreshing={networkStatus === 4}
              onRefresh={() => {
                pageNum = 1;
                refetch({ pageNum });
              }}
              ListHeaderComponent={() => <WritePost />}
              ListFooterComponent={() => (
                <ListFooterComponent loading={loading} />
              )}
              onEndReached={() => {
                if (!this.onEndReachedCalledDuringMomentum) {
                  pageNum += 1;
                  fetchMore({
                    variables: {
                      pageNum,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      if (!fetchMoreResult.getMainFeed) return prev;
                      return Object.assign({}, prev, {
                        getMainFeed: {
                          ...prev.getMainFeed,
                          posts: [
                            ...prev.getMainFeed.posts,
                            ...fetchMoreResult.getMainFeed.posts,
                          ],
                        },
                      });
                    },
                  });
                  this.onEndReachedCalledDuringMomentum = true;
                }
              }}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              disableNavigation
            />
          );
        }}
      </Query>
    );
  }
}

export default FeedScreen;
