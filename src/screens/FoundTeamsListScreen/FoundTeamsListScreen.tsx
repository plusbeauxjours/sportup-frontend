import React, { useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { useQuery } from "react-apollo";
import { Headline } from "react-native-paper";
import TeamCard from "../../components/TeamCard";
import { GET_TEAMS_FOR_GAME } from "./FoundTeamsListScreenQueries";
import { GetTeamsForGame, GetTeamsForGameVariables } from "../../types/api";
import Loader from "../../components/Loader";
import ListFooterComponent from "../../components/ListFooterComponent";
import BackBtn from "../../components/BackBtn";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: white;
`;

const FoundTeamsListScreen = ({ navigation }) => {
  const sportIds = navigation.getParam("selectedSportIds");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: { getTeamsForGame: { teams = null, hasNextPage, pageNum } = {} } = {},
    loading: getTeamsForGameLoading,
    fetchMore: getTeamsForGameFetchMore,
    networkStatus,
    refetch: getTeamsForGameRefetch,
  } = useQuery<GetTeamsForGame, GetTeamsForGameVariables>(GET_TEAMS_FOR_GAME, {
    variables: { sportIds, pageNum: 1 },
    fetchPolicy: "network-only",
  });

  if (getTeamsForGameLoading) {
    return <Loader />;
  } else {
    return (
      <Container>
        <FlatList
          data={teams}
          renderItem={({ item }) => <TeamCard enableMessage team={item} />}
          keyExtractor={(teams: any) => teams.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() =>
            !loading ? (
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
          refreshing={networkStatus === 4}
          onRefresh={() => {
            getTeamsForGameRefetch({ sportIds, pageNum: 1 });
          }}
          ListFooterComponent={() => <ListFooterComponent loading={loading} />}
          onEndReached={() => {
            if (!loading && hasNextPage) {
              getTeamsForGameFetchMore({
                variables: { sportIds, pageNum: pageNum + 1 },
                updateQuery: (prev: any, { fetchMoreResult }: any) => {
                  if (!fetchMoreResult) return prev;
                  if (!fetchMoreResult.getTeamsForGame) return prev;
                  return Object.assign({}, prev, {
                    getTeamsForGame: {
                      ...prev.getTeamsForGame,
                      pageNum: fetchMoreResult.getTeamsForGame.pageNum,
                      hasNextPage: fetchMoreResult.getTeamsForGame.hasNextPage,
                      teams: [
                        ...prev.getTeamsForGame.teams,
                        ...fetchMoreResult.getTeamsForGame.teams,
                      ],
                    },
                  });
                },
              });
              setLoading(true);
            }
          }}
          onEndReachedThreshold={0.2}
          onMomentumScrollBegin={() => {
            setLoading(false);
          }}
        />
      </Container>
    );
  }
};
FoundTeamsListScreen.navigationOptions = {
  title: "Teams near you",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackBtn />,
};
export default FoundTeamsListScreen;
