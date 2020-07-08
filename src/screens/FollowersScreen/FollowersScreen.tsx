import React from "react";
import {
  GetUserFollowers,
  GetUserFollowersVariables,
  GetUserFollowers_getUser_user_followers,
} from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWERS } from "./FollowersScreenQueries";
import UserCardList from "../../components/UserCardList";
import ListFooterComponent from "../../components/ListFooterComponent";
import { Divider } from "react-native-paper";
import UserCard from "../../components/UserCard";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

interface IProps extends NavigationStackScreenProps {
  id: string;
}

const FollowersScreen: NavigationStackScreenComponent<IProps> = ({
  navigation,
}) => {
  const { data: { getUser: { user = null } = {} } = {}, loading } = useQuery<
    GetUserFollowers,
    GetUserFollowersVariables
  >(GET_USER_FOLLOWERS, {
    variables: { id: navigation.getParam("id") },
  });
  return (
    <UserCardList
      users={user?.followers}
      keyExtractor={(item: GetUserFollowers_getUser_user_followers) =>
        item.id.toString()
      }
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => (
        <UserCard
          id={item.id}
          userImg={item.userImg}
          name={item.name}
          username={item.username}
          bio={item.bio}
          isFollowing={item.isFollowing}
        />
      )}
      ListFooterComponent={() => <ListFooterComponent loading={loading} />}
    />
  );
};
FollowersScreen.navigationOptions = {
  title: "Followers",
};

export default FollowersScreen;
