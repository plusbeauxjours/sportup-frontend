import React from "react";
import { Query } from "react-apollo";
import { ActivityIndicator, AsyncStorage, Text } from "react-native";
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
            navigation.navigate("EditProfile");
          }}
        />
        <Appbar.Action
          icon="exit-to-app"
          onPress={navigation.getParam("logout")}
        />
      </View>
    )
  });

  componentDidMount = () => {
    this.props.navigation.setParams({
      logout: this.handleLogout
    });
  };

  onTeamsPress = uuid => {
    this.props.navigation.push("UserTeams", {
      uuid
    });
  };

  onFollowersPress = uuid => {
    this.props.navigation.push("Followers", {
      uuid
    });
  };

  onFollowingPress = uuid => {
    this.props.navigation.push("Following", {
      uuid
    });
  };

  handleLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  renderUserInfoArea = () => {
    return (
      <Query<Me> query={ME}>
        {({ data, loading }) => {
          if (loading) {
            return (
              <ActivityIndicator
                size="large"
                style={{
                  margin: 20
                }}
              />
            );
          }
          const { me: { user: me = null } = {} } = ({} = data);
          const connections = {
            teams: me.teamsCount,
            followers: me.followersCount,
            following: me.followingCount
          };
          console.log("me", me);
          return (
            <MyProfileHeader
              userImg={me.userImg}
              name={`${me.firstName} ${me.lastName}`}
              handle={me.username}
              bio={me.bio}
              sports={me.sports}
              connections={connections}
              onTeamsPress={() => {
                this.onTeamsPress(me.id);
              }}
              onFollowersPress={() => {
                this.onFollowersPress(me.id);
              }}
              onFollowingPress={() => {
                this.onFollowingPress(me.id);
              }}
            />
          );
        }}
      </Query>
    );
  };

  render() {
    let pageNum = 1;

    return (
      <Query<GetMyFeed, GetMyFeedVariables>
        query={MY_FEED}
        variables={{
          pageNum
        }}
        fetchPolicy={"cache-and-network"}
      >
        {({ data, fetchMore, loading, networkStatus, refetch }) => {
          return (
            <FeedList
              data={data}
              refreshing={networkStatus === 4}
              onRefresh={() => {
                pageNum = 1;
                refetch({
                  pageNum
                });
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
                      pageNum
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      if (!fetchMoreResult.getMyFeed) return prev;
                      return Object.assign({}, prev, {
                        getMyFeed: {
                          ...prev.getMyFeed,
                          posts: [
                            ...prev.getMyFeed.posts,
                            ...fetchMoreResult.getMyFeed.posts
                          ]
                        }
                      });
                    }
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
