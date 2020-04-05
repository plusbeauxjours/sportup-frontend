import React from "react";
import { GetUserFollowers, GetUserFollowersVariables } from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWERS } from "./FollowersQueries";
import UserCardList from "../../components/UserCardList";
import ListFooterComponent from "../../components/ListFooterComponent";
import { Divider } from "react-native-paper";
import UserCard from "../../components/UserCard/UserCard";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from "react-navigation-stack";

interface IProps extends NavigationStackScreenProps {
  uuid: string;
}

const Followers: NavigationStackScreenComponent<IProps> = ({ navigation }) => {
  const {
    data: { getUser: { user: { followers = null } = {} } = {} } = {},
    loading
  } = useQuery<GetUserFollowers, GetUserFollowersVariables>(
    GET_USER_FOLLOWERS,
    {
      //   variables: { uuid: navigation.getParam("uuid") }
      variables: { uuid: "9b4dd8e7-51e2-4738-b8c1-a1472d4cfa4a" }
    }
  );
  console.log(followers);
  return (
    <UserCardList
      users={followers}
      keyExtractor={item => item.uuid.toString()}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => (
        <UserCard
          uuid={item.uuid}
          avatar={item.userImg}
          name={item.name}
          handle={item.username}
          bio={item.bio}
          following={item.isFollowing}
        />
      )}
      ListFooterComponent={() => <ListFooterComponent loading={loading} />}
    />
  );
};
Followers.navigationOptions = {
  title: "Followers"
};

export default Followers;
