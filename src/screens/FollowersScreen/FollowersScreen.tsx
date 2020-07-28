import React from "react";
import {
  GetUserFollowers,
  GetUserFollowersVariables,
  GetUserFollowers_getUser_user_followers,
} from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWERS } from "./FollowersScreenQueries";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserCard from "../../components/UserCard";
import styled from "styled-components/native";
import BackBtn from "../../components/BackBtn";
import { FlatList } from "react-native";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

interface IProps extends NavigationStackScreenProps {
  userId: string;
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const FollowersScreen: NavigationStackScreenComponent<IProps> = ({
  navigation,
}) => {
  const userId = navigation.getParam("userId");
  const { data: { getUser: { user = null } = {} } = {}, loading } = useQuery<
    GetUserFollowers,
    GetUserFollowersVariables
  >(GET_USER_FOLLOWERS, {
    variables: { userId },
  });
  return (
    <Container>
      <FlatList
        data={user?.followers}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: GetUserFollowers_getUser_user_followers) =>
          item.id.toString()
        }
        renderItem={({ item }) => <UserCard user={item} />}
        ListFooterComponent={() => <ListFooterComponent loading={loading} />}
      />
    </Container>
  );
};
FollowersScreen.navigationOptions = {
  title: "Followers",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default FollowersScreen;
