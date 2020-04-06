import React from "react";
import { ActivityIndicator } from "react-native";

import { Query } from "react-apollo";
import { GET_USER, GET_USER_FEED } from "./UserProfileQueries";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserProfileHeader from "../../components/UserProfileHeader";
import {
  GetUser,
  GetUserVariables,
  GetUserFeed,
  GetUserFeedVariables
} from "../../types/api";

interface IState {
  uuid: string;
}

class UserProfile extends React.Component<any, IState> {
  public onEndReachedCalledDuringMomentum;
  static navigationOptions = {
    title: "Profile"
  };
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.navigation.getParam("uuid")
    };
    console.log("jijijii");
  }

  public onFollowersPress = uuid => {
    this.props.navigation.push("Followers", { uuid });
  };

  public onFollowingPress = uuid => {
    this.props.navigation.push("Following", { uuid });
  };

  // @action
  // public showDialog = sportId => {
  //   this.ratingSportWithId = sportId;
  //   // this.rating = sports.find(sport => sport.sportId === sportId).rated || 0;
  //   this.dialogVisible = true;
  // };

  // @action
  // public closeDialog = () => {
  //   this.ratingSportWithId = null;
  //   this.rating = 0;
  //   this.dialogVisible = false;
  // };

  public renderUserInfoArea = () => {
    const { uuid } = this.state;

    return (
      <Query<GetUser, GetUserVariables>
        query={GET_USER}
        variables={{ uuid }}
        fetchPolicy="network-only"
      >
        {({ data: { getUser: { user = null } = {} } = {}, loading, error }) => {
          if (loading) {
            return <ActivityIndicator size="large" style={{ margin: 20 }} />;
          }
          const connections = {
            teams: user.teamsCount,
            followers: user.followersCount,
            following: user.followingCount
          };

          return (
            <UserProfileHeader
              uuid={user.uuid}
              userImg={user.userImg}
              name={`${user.firstName} ${user.lastName}`}
              username={user.username}
              bio={user.bio}
              sports={user.sports}
              connections={connections}
              onTeamsPress={() => {
                console.log("team press");
              }}
              onFollowersPress={() => {
                this.onFollowersPress(user.uuid);
              }}
              onFollowingPress={() => {
                this.onFollowingPress(user.uuid);
              }}
              isFollowing={user.isFollowing}
            />
          );
        }}
      </Query>
    );
  };

  render() {
    let pageNum = 1;
    const { uuid } = this.state;
    return (
      <Query<GetUserFeed, GetUserFeedVariables>
        query={GET_USER_FEED}
        variables={{
          uuid,
          pageNum
        }}
        fetchPolicy="network-only"
      >
        {({
          data: { getUserFeed: { posts = null } = {} } = {},
          loading,
          fetchMore,
          networkStatus,
          refetch
        }) => {
          return (
            <FeedList
              posts={posts}
              refreshing={networkStatus === 4}
              onRefresh={() => {
                pageNum = 1;
                refetch({ uuid, pageNum });
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
                      if (!fetchMoreResult.getUserFeed) return prev;
                      return Object.assign({}, prev, {
                        getUserFeed: {
                          ...prev.getUserFeed,
                          posts: [
                            ...prev.getUserFeed.posts,
                            ...fetchMoreResult.getUserFeed.posts
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

export default UserProfile;
