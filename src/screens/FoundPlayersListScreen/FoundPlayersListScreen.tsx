import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { Headline } from "react-native-paper";

import { useQuery } from "react-apollo";
import { GET_USERS_FOR_GAME } from "./FoundPlayersListScreenQueries";
import PlayerCard from "../../components/PlayerCard";
import { GetUsersForGameVariables, GetUsersForGame } from "../../types/api";
import Loader from "../../components/Loader";

const FoundPlayersListScreen = ({ navigation }) => {
  const sportIds = navigation.getParam("selectedSportIds");
  const {
    data: { getUsersForGame: { users = null } = {} } = {},
    loading: getUsersForGameLoading,
  } = useQuery<GetUsersForGame, GetUsersForGameVariables>(GET_USERS_FOR_GAME, {
    variables: { sportIds },
    fetchPolicy: "network-only",
  });
  if (getUsersForGameLoading) {
    return <Loader />;
  } else {
    return (
      <FlatList
        data={users}
        renderItem={({ item }: any) => {
          return (
            <PlayerCard
              id={item.id}
              userImg={item.userImg}
              name={item.name}
              username={item.username}
              isFollowing={item.isFollowing}
              sports={item.sports}
              sportIds={sportIds}
            />
          );
        }}
        keyExtractor={(player: any) => player.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          !getUsersForGameLoading ? (
            <View
              style={{
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Headline style={{ fontWeight: "bold" }}>&middot;</Headline>
            </View>
          ) : (
            <ActivityIndicator size="small" />
          )
        }
      />
    );
  }
};
FoundPlayersListScreen.navigationOptions = {
  title: "Players",
};

export default FoundPlayersListScreen;
