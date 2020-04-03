import React from "react";
import { GetUserFollowers, GetUserFollowersVariables } from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWERS } from "./FollowersQueries";
import { View, Text } from "react-native";
import UserCardList from "../../components/UserCardList";
import ListFooterComponent from "../../components/ListFooterComponent";
import { Divider } from "react-native-paper";
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
      variables: { uuid: navigation.getParam("uuid") }
    }
  );
  console.log(followers);
  return (
    <UserCardList
      users={followers}
      keyExtractor={item => item.uuid.toString()}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => (
        <View>
          <Text>{item.id}</Text>
        </View>
      )}
      ListFooterComponent={() => <ListFooterComponent loading={loading} />}
    />
  );
};
Followers.navigationOptions = {
  title: "Followers"
};

export default Followers;
