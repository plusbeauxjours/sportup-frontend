import React from "react";
import { GetUserFollowing, GetUserFollowingVariables } from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWING } from "./FollowingQueries";
import { Divider } from "react-native-paper";
import UserCardList from "../../components/UserCardList";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserCard from "../../components/UserCard";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from "react-navigation-stack";

interface IProps extends NavigationStackScreenProps {
  uuid: string;
}

const Following: NavigationStackScreenComponent<IProps> = ({ navigation }) => {
  const {
    data: { getUser: { user: { following = null } = {} } = {} } = {},
    loading
  } = useQuery<GetUserFollowing, GetUserFollowingVariables>(
    GET_USER_FOLLOWING,
    {
      //   variables: { uuid: navigation.getParam("uuid") }
      variables: { uuid: "9b4dd8e7-51e2-4738-b8c1-a1472d4cfa4a" }
    }
  );
  console.log(following);
  return (
    <UserCardList
      users={following}
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
Following.navigationOptions = {
  title: "Following"
};

export default Following;
