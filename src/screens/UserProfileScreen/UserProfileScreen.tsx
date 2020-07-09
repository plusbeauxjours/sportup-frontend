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
import { observer } from "mobx-react/native";
import { observable, action } from "mobx";

interface IState {
  userId: string;
  rating: number;
  dialogVisible: boolean;
  ratingSportWithId: string;
}

@observer
class UserProfileScreen extends React.Component<any, IState> {
  public onEndReachedCalledDuringMomentum;
  public rateUserSportFn: MutationFunction;
  static navigationOptions = {
    title: "Profile",
  };
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.getParam("userId"),
      rating: 0,
      dialogVisible: false,
      ratingSportWithId: null,
    };
  }

  @observable
  dialogVisible = false;

  public onTeamsPress = (userId) => {
    this.props.navigation.push("TeamsScreen", { userId });
  };

  public onFollowersPress = (userId) => {
    this.props.navigation.push("FollowersScreen", { userId });
  };

  public onFollowingPress = (userId) => {
    this.props.navigation.push("FollowingScreen", { userId });
  };

  @action
  public showDialog = (sportId) => {
    this.setState({
      rating: 0,
      dialogVisible: true,
      ratingSportWithId: sportId,
    });
  };

  @action
  public closeDialog = () => {
    this.setState({
      rating: 0,
      dialogVisible: false,
      ratingSportWithId: null,
    });
  };

  public onStarRatingPress = (rating: number) => {
    this.setState({ rating });
  };

  public onSubmit = () => {
    const { userId, ratingSportWithId, rating } = this.state;
    this.rateUserSportFn({
      variables: { userId, sportUuid: ratingSportWithId, rating },
    });
    this.closeDialog();
  };

  public renderUserInfoArea = () => {
    const { userId, dialogVisible, rating } = this.state;
    return (
      <Mutation mutation={RATE_USER_SPORT}>
        {(rateUserSportFn, { loading: rateUserSportLoading }) => {
          this.rateUserSportFn = rateUserSportFn;
          return (
            <Query<GetUser, GetUserVariables>
              query={GET_USER}
              variables={{ userId }}
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
                } else if (user) {
                  const connections = {
                    teams: user.teamsCount,
                    followers: user.followersCount,
                    following: user.followingCount,
                  };
                  return (
                    <UserProfileHeader
                      id={user.id}
                      userImg={user.userImg}
                      name={`${user.firstName} ${user.lastName}`}
                      username={user.username}
                      bio={user.bio}
                      sports={user.sports}
                      connections={connections}
                      onTeamsPress={() => {
                        this.onTeamsPress(user.id);
                      }}
                      onFollowersPress={() => {
                        this.onFollowersPress(user.id);
                      }}
                      onFollowingPress={() => {
                        this.onFollowingPress(user.id);
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
                } else {
                  return null;
                }
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  };

  render() {
    let pageNum = 1;
    const { userId } = this.state;
    return (
      <Query<GetUserFeed, GetUserFeedVariables>
        query={GET_USER_FEED}
        variables={{
          userId,
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
                refetch({ userId, pageNum });
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
