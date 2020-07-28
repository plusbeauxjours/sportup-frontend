import React from "react";
import { GetUserFollowing, GetUserFollowingVariables } from "../../types/api";
import { useQuery } from "react-apollo";
import { GET_USER_FOLLOWING } from "./FollowingScreenQueries";
import ListFooterComponent from "../../components/ListFooterComponent";
import UserCard from "../../components/UserCard";
import styled from "styled-components/native";
import BackBtn from "../../components/BackBtn";
import { FlatList } from "react-native";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from "react-navigation-stack";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

interface IProps extends NavigationStackScreenProps {
  userId: string;
}

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
      <FlatList
        data={following}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
        ListFooterComponent={() => <ListFooterComponent loading={loading} />}
      />
    </Container>
  );
};
FollowingScreen.navigationOptions = {
  title: "Following",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};

export default FollowingScreen;
