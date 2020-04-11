import React from "react";
import { GetUserFollowing, GetUserFollowingVariables } from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWING } from "./FollowingScreenQueries";
import { Divider } from "react-native-paper";
import UserCardList from "../../components/UserCardList";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserCard from "../../components/UserCard";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

interface IProps extends NavigationStackScreenProps {
  uuid: string;
}

const FollowingScreen: NavigationStackScreenComponent<IProps> = ({
  navigation,
}) => {
  const {
    data: { getUser: { user: { following = null } = {} } = {} } = {},
    loading,
  } = useQuery<GetUserFollowing, GetUserFollowingVariables>(
    GET_USER_FOLLOWING,
    {
      variables: { uuid: navigation.getParam("uuid") },
    }
  );
  return (
    <UserCardList
      users={following}
      keyExtractor={(item) => item.uuid.toString()}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => (
        <UserCard
          uuid={item.uuid}
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
FollowingScreen.navigationOptions = {
  title: "Following",
};

export default FollowingScreen;
