import React from "react";
import { GetUserFollowing, GetUserFollowingVariables } from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWING } from "./FollowingQueries";
import { View, Text } from "react-native";
import { Divider } from "react-native-paper";
import UserCardList from "../../components/UserCardList";
import ListFooterComponent from "../../components/ListFooterComponent";
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
      variables: { uuid: navigation.getParam("uuid") }
    }
  );
  console.log(following);
  return (
    <UserCardList
      users={following}
      keyExtractor={item => item.uuid.toString()}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => (
        <View>
          <Text>{item.uuid}</Text>
        </View>
      )}
      ListFooterComponent={() => <ListFooterComponent loading={loading} />}
    />
  );
};
Following.navigationOptions = {
  title: "Following"
};

export default Following;
