import React from "react";
import { Query } from "react-apollo";
import { ActivityIndicator, AsyncStorage } from "react-native";
import { Appbar } from "react-native-paper";

import { ME, MY_FEED } from "./MyProfileQueries";
import { Me, GetMyFeed, GetMyFeedVariables } from "../../types/api";
import MyProfileHeader from "../../components/MyProfileHeader";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";
import styled from "styled-components";

const View = styled.View`
  flex-direction: row;
`;

export default class MyProfileScreen extends React.Component {
  public onEndReachedCalledDuringMomentum;
  static navigationOptions = ({ navigation }) => ({
    title: "Me",
    headerLeft: () => (
      <Appbar.Action
        icon="menu"
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: () => (
      <View>
        <Appbar.Action
          icon="square-edit-outline"
          onPress={() => {
            navigation.navigate("CreateTeam");
          }}
        />
        <Appbar.Action
          icon="exit-to-app"
          onPress={navigation.getParam("logout")}
        />
      </View>
    ),
  });

  public componentDidMount = () => {
    this.props.navigation.setParams({
      logout: this.handleLogout,
    });
  };

  public onTeamsPress = (uuid) => {
    this.props.navigation.push("Teams", {
      uuid,
    });
  };

  public onFollowersPress = (uuid) => {
    this.props.navigation.push("Followers", {
      uuid,
    });
  };

  public onFollowingPress = (uuid) => {
    this.props.navigation.push("Following", {
      uuid,
    });
  };

  public handleLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  public renderUserInfoArea = () => {
    return (
      <Query<Me> query={ME}>
        {({ data: { me: { user: me = null } = {} } = {}, loading }) => {
          if (loading) {
            return (
              <ActivityIndicator
                size="large"
                style={{
                  margin: 20,
                }}
              />
            );
          }
          const connections = {
            teams: me.teamsCount,
            followers: me.followersCount,
            following: me.followingCount,
          };
          return (
            <MyProfileHeader
              userImg={me.userImg}
              name={`${me.firstName} ${me.lastName}`}
              username={me.username}
              bio={me.bio}
              sports={me.sports}
              connections={connections}
              onTeamsPress={() => {
                this.onTeamsPress(me.uuid);
              }}
              onFollowersPress={() => {
                this.onFollowersPress(me.uuid);
              }}
              onFollowingPress={() => {
                this.onFollowingPress(me.uuid);
              }}
            />
          );
        }}
      </Query>
    );
  };

  public render() {
    let pageNum = 1;

    return (
      <Query<GetMyFeed, GetMyFeedVariables>
        query={MY_FEED}
        variables={{
          pageNum,
        }}
        fetchPolicy={"cache-and-network"}
      >
        {({
          data: { getMyFeed: { posts = null } = {} } = {},
          fetchMore,
          loading,
          networkStatus,
          refetch,
        }) => {
          return (
            <FeedList
              posts={posts}
              refreshing={networkStatus === 4}
              onRefresh={() => {
                pageNum = 1;
                refetch({ pageNum });
              }}
              ListHeaderComponent={this.renderUserInfoArea}
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
                      if (!fetchMoreResult.getMyFeed) return prev;
                      return Object.assign({}, prev, {
                        getMyFeed: {
                          ...prev.getMyFeed,
                          posts: [
                            ...prev.getMyFeed.posts,
                            ...fetchMoreResult.getMyFeed.posts,
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
