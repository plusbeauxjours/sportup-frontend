import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Appbar, Headline, Divider } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { GET_SEARCH_RESULTS } from "./SearchQueries";
import { useLazyQuery } from "react-apollo";
import { GetSearchResults, GetSearchResultsVariables } from "../../types/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RatingChip from "../../components/RatingChip";
import { useMe } from "../../context/meContext";
import FollowBtn from "../../components/FollowBtn";
import UserCard from "../../components/UserCard";

const Border = styled.View`
  border-color: #999;
  border-width: 0.2px;
  border-radius: 20px;
  padding: 10px;
  margin: 3px;
`;

const Header = styled.View`
  flex-direction: column;
  margin-left: 15px;
`;

const SectionTitle = styled.Text`
  text-transform: uppercase;
  margin-left: 10px;
  font-size: 10px;
  font-weight: 600;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const Caption = styled.Text`
  font-size: 10px;
  color: #999;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const OuterUserInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const InnerUserInfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InnerInfoContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchScreen = ({ navigation }) => {
  const { me, loading: meLoading } = useMe();
  const [searchText, setSearchText] = useState<string>("");
  const [
    search,
    {
      data: {
        getSearchUsers: { users = null } = {},
        getSearchTeams: { teams = null } = {},
        getSearchEvents: { events = null } = {},
      } = {},
      loading,
    },
  ] = useLazyQuery<GetSearchResults, GetSearchResultsVariables>(
    GET_SEARCH_RESULTS,
    { variables: { searchText } }
  );

  const handleChange = (text) => {
    setSearchText(text);
  };

  const RenderUser = () => (
    <>
      <SectionTitle>Users</SectionTitle>
      {users && users.length !== 0 ? (
        users?.map((user, index) => (
          <Border key={index}>
            <UserCard
              userId={user.id}
              userImg={user.userImg}
              name={user.name}
              username={user.username}
              isFollowing={user.isFollowing}
            />
          </Border>
        ))
      ) : (
        <Headline style={{ fontWeight: "bold", textAlign: "center" }}>
          &middot;
        </Headline>
      )}
    </>
  );

  const RenderTeam = () => (
    <>
      <SectionTitle>Teams</SectionTitle>
      {teams && teams.length !== 0 ? (
        teams?.map((team, index) => (
          <Border key={index}>
            <OuterUserInfoContainer>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("TeamProfileScreen", { teamId: team?.id });
                }}
              >
                <InnerInfoContainer>
                  <Row>
                    <NameText style={{ textTransform: "capitalize" }}>
                      {team?.teamName}
                    </NameText>
                    <RatingChip
                      sportId={team.sport.sportId}
                      name={team.sport.name}
                      onChipPress={() => {}}
                      disabled={true}
                    />
                  </Row>
                  {team.rating && <Caption>{`⭐️ ${team?.rating}`}</Caption>}
                  <Caption>{`Created by ${team.createdBy.name} (@${team.createdBy.username})`}</Caption>
                </InnerInfoContainer>
              </TouchableOpacity>
            </OuterUserInfoContainer>
          </Border>
        ))
      ) : (
        <Headline style={{ fontWeight: "bold", textAlign: "center" }}>
          &middot;
        </Headline>
      )}
    </>
  );

  const RenderEvent = () => (
    <>
      <SectionTitle>Events</SectionTitle>
      {events && events.length !== 0 ? (
        events?.map((event, index) => (
          <Border key={index}>
            <OuterUserInfoContainer>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("EventScreen", { eventId: event?.id });
                }}
              >
                <InnerInfoContainer>
                  <Row>
                    <NameText style={{ textTransform: "capitalize" }}>
                      {event?.name}
                    </NameText>
                    <RatingChip
                      sportId={event.sport.sportId}
                      name={event.sport.name}
                      onChipPress={() => {}}
                    />
                  </Row>
                  <Caption>{`Created by ${event?.owner.name} (@${event?.owner.username})`}</Caption>
                </InnerInfoContainer>
              </TouchableOpacity>
            </OuterUserInfoContainer>
          </Border>
        ))
      ) : (
        <Headline style={{ fontWeight: "bold", textAlign: "center" }}>
          &middot;
        </Headline>
      )}
    </>
  );

  useEffect(() => {
    search();
  }, [searchText]);

  return (
    <React.Fragment>
      <Searchbar
        placeholder="Search"
        onChangeText={handleChange}
        value={searchText}
      />
      <Container>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: "#fff",
            }}
            keyboardShouldPersistTaps="handled"
          >
            <RenderUser />
            <Divider />
            <RenderTeam />
            <Divider />
            <RenderEvent />
          </KeyboardAwareScrollView>
        )}
      </Container>
    </React.Fragment>
  );
};
SearchScreen.navigationOptions = ({ navigation }) => ({
  title: "Search",
  headerLeft: () => (
    <Appbar.Action
      icon="menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  ),
});

export default SearchScreen;
