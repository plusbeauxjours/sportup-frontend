import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {
  Appbar,
  Headline,
  Divider,
  Subheading,
  Caption,
} from "react-native-paper";
import { Avatar } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { GET_SEARCH_RESULTS } from "./SearchQueries";
import { useLazyQuery } from "react-apollo";
import { GetSearchResults, GetSearchResultsVariables } from "../../types/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RatingChip from "../../components/RatingChip";

const SectionTitle = styled.Text`
  font-size: 10px;
  font-weight: 400;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const OuterUserInfoContainerStyle = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
const InnerUserInfoContainerStyle = styled.View`
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
`;

const SearchScreen = ({ navigation }) => {
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
          <OuterUserInfoContainerStyle key={index}>
            <TouchableOpacity
              onPress={() => {
                navigation.push("UserProfileScreen", { userId: user.id });
              }}
            >
              <Avatar
                rounded
                source={{
                  uri: user.userImg
                    ? MEDIA_URL + user.userImg
                    : NO_AVATAR_THUMBNAIL,
                }}
                containerStyle={{ marginLeft: 30, marginRight: 10 }}
              />
              <InnerUserInfoContainerStyle>
                <Subheading>{user.name}</Subheading>
                <Caption>{`@${user.username}`}</Caption>
              </InnerUserInfoContainerStyle>
            </TouchableOpacity>
          </OuterUserInfoContainerStyle>
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
          <OuterUserInfoContainerStyle key={index}>
            <TouchableOpacity
              onPress={() => {
                navigation.push("TeamProfileScreen", { teamId: team?.id });
              }}
            >
              <InnerUserInfoContainerStyle>
                <Row>
                  <Subheading style={{ textTransform: "capitalize" }}>
                    {team?.teamName}
                  </Subheading>
                  <RatingChip
                    sportId={team.sport.sportId}
                    name={team.sport.name}
                    onChipPress={() => {}}
                  />
                </Row>
                <Caption>{`Created by ${team?.createdBy.name} (@${team?.createdBy.username})`}</Caption>
              </InnerUserInfoContainerStyle>
            </TouchableOpacity>
          </OuterUserInfoContainerStyle>
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
          <OuterUserInfoContainerStyle key={index}>
            <TouchableOpacity
              onPress={() => {
                navigation.push("EvenctScreen", { eventId: event?.id });
              }}
            >
              <InnerUserInfoContainerStyle>
                <Row>
                  <Subheading style={{ textTransform: "capitalize" }}>
                    {event?.name}
                  </Subheading>
                  <RatingChip
                    sportId={event.sport.sportId}
                    name={event.sport.name}
                    onChipPress={() => {}}
                  />
                </Row>
                <Caption>{`Created by ${event?.owner.name} (@${event?.owner.username})`}</Caption>
              </InnerUserInfoContainerStyle>
            </TouchableOpacity>
          </OuterUserInfoContainerStyle>
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
              padding: 10,
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
