import React from "react";
import { GetUserFollowing, GetUserFollowingVariables } from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWING } from "./FollowingScreenQueries";
import { Divider } from "react-native-paper";
import UserCardList from "../../components/UserCardList";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserCard from "../../components/UserCard";
import styled from "styled-components/native";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

interface IProps extends NavigationStackScreenProps {
  userId: string;
}

const Container = styled.View`
flex:1
  background-color: white;
`;

const FollowingScreen: NavigationStackScreenComponent<IProps> = ({
  navigation,
}) => {
  const {
    data: { getUser: { user: { following = null } = {} } = {} } = {},
    loading,
  } = useQuery<GetUserFollowing, GetUserFollowingVariables>(
    GET_USER_FOLLOWING,
    { variables: { userId: navigation.getParam("userId") } }
  );
  return (
    <Container>
      <UserCardList
        users={following}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <UserCard
            userId={item.id}
            userImg={item.userImg}
            name={item.name}
            username={item.username}
            isFollowing={item.isFollowing}
          />
        )}
        ListFooterComponent={() => <ListFooterComponent loading={loading} />}
      />
    </Container>
  );
};
FollowingScreen.navigationOptions = {
  title: "Following",
};

export default FollowingScreen;
