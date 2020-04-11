import React from "react";
import { ActivityIndicator } from "react-native";

import { Query, Mutation, MutationFunction } from "react-apollo";
import {
  GET_USER,
  GET_USER_FEED,
  RATE_USER_SPORT,
} from "./UserProfileScreenQueries";
import FeedList from "../../components/FeedList";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserProfileHeader from "../../components/UserProfileHeader";
import {
  GetUser,
  GetUserVariables,
  GetUserFeed,
  GetUserFeedVariables,
} from "../../types/api";

interface IState {
  uuid: string;
  rating: number;
  dialogVisible: boolean;
  ratingSportWithUuid: string;
}

class UserProfileScreen extends React.Component<any, IState> {
  public onEndReachedCalledDuringMomentum;
  public rateUserSportFn: MutationFunction;
  static navigationOptions = {
    title: "Profile",
  };
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.navigation.getParam("uuid"),
      rating: 0,
      dialogVisible: false,
      ratingSportWithUuid: null,
    };
  }

  public onTeamsPress = (uuid) => {
    this.props.navigation.push("TeamsScreen", { uuid });
  };

  public onFollowersPress = (uuid) => {
    this.props.navigation.push("FollowersScreen", { uuid });
  };

  public onFollowingPress = (uuid) => {
    this.props.navigation.push("FollowingScreen", { uuid });
  };

  public showDialog = (sportUuid) => {
    this.setState({
      rating: 0,
      dialogVisible: true,
      ratingSportWithUuid: sportUuid,
    });
  };

  public closeDialog = () => {
    this.setState({
      rating: 0,
      dialogVisible: false,
      ratingSportWithUuid: null,
    });
  };

  public onStarRatingPress = (rating: number) => {
    this.setState({ rating });
  };

  public onSubmit = () => {
    const { uuid, ratingSportWithUuid, rating } = this.state;
    console.log(uuid, ratingSportWithUuid, rating);
    this.rateUserSportFn({
      variables: { uuid, sportUuid: ratingSportWithUuid, rating },
    });
    this.closeDialog();
  };

  public renderUserInfoArea = () => {
    const { uuid, dialogVisible, rating } = this.state;

    return (
      <Mutation mutation={RATE_USER_SPORT}>
        {(rateUserSportFn, { loading: rateUserSportLoading }) => {
          this.rateUserSportFn = rateUserSportFn;
          return (
            <Query<GetUser, GetUserVariables>
              query={GET_USER}
              variables={{ uuid }}
              fetchPolicy="network-only"
            >
              {({
                data: { getUser: { user = null } = {} } = {},
                loading,
                error,
              }) => {
                if (loading) {
                  return (
                    <ActivityIndicator size="large" style={{ margin: 20 }} />
                  );
                }
                const connections = {
                  teams: user.teamsCount,
                  followers: user.followersCount,
                  following: user.followingCount,
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
                      this.onTeamsPress(user.uuid);
                    }}
                    onFollowersPress={() => {
                      this.onFollowersPress(user.uuid);
                    }}
                    onFollowingPress={() => {
                      this.onFollowingPress(user.uuid);
                    }}
                    showDialog={this.showDialog}
                    isFollowing={user.isFollowing}
                    dialogVisible={dialogVisible}
                    rating={rating}
                    closeDialog={this.closeDialog}
                    onStarRatingPress={this.onStarRatingPress}
                    onSubmit={this.onSubmit}
                  />
                );
              }}
            </Query>
          );
        }}
      </Mutation>
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
          pageNum,
        }}
        fetchPolicy="network-only"
      >
        {({
          data: { getUserFeed: { posts = null } = {} } = {},
          loading,
          fetchMore,
          networkStatus,
          refetch,
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
                      pageNum,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      if (!fetchMoreResult.getUserFeed) return prev;
                      return Object.assign({}, prev, {
                        getUserFeed: {
                          ...prev.getUserFeed,
                          posts: [
                            ...prev.getUserFeed.posts,
                            ...fetchMoreResult.getUserFeed.posts,
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

export default UserProfileScreen;
