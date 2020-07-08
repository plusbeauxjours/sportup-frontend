import React from "react";
import { SectionList, ActivityIndicator } from "react-native";
import { Searchbar, Caption, Divider, ListItem } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { MEDIA_URL, NO_AVATAR_THUMBNAIL } from "../../constants/urls";
import { withNavigation } from "react-navigation";

interface IProps {
  navigation: any;
  loading: boolean;
  users: any;
  renderUser: ({ item }: any) => JSX.Element;
  teams: any;
  renderTeam: ({ item }: any) => JSX.Element;
  events: any;
  renderEvent: ({ item }: any) => JSX.Element;
  setSearch: (search: string) => void;
  search: string;
  onIconPress: () => void;
}

const SearchScreenPresenter: React.FC<IProps> = ({
  navigation,
  loading,
  users,
  renderUser,
  teams,
  renderTeam,
  events,
  renderEvent,
  setSearch,
  search,
  onIconPress,
}) => {
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(text: string) => setSearch(text)}
        value={search}
        onIconPress={() => {
          onIconPress();
        }}
      />
      {users?.map((user: any) => (
        <ListItem
          key={user.id}
          title={user.username}
          description={`@${user.username}`}
          avatar={
            <Avatar
              rounded
              source={
                user.userImg
                  ? { uri: MEDIA_URL + user.userImg }
                  : NO_AVATAR_THUMBNAIL
              }
            />
          }
          onPress={() => {
            navigation.push("Profile", { userId: user.id });
          }}
        />
      ))}
      {/* {users && users.length !== 0 && (
        <SectionList
          renderItem={() => {}}
          renderSectionHeader={({ section: { title } }) => (
            <Caption style={{ paddingLeft: 10 }}>{title}</Caption>
          )}
          sections={[
            {
              title: "Users",
              data: users,
              renderItem: renderUser,
            },
            // {
            //   title: "Teams",
            //   data: teams,
            //   renderItem: renderTeam,
            // },
            // {
            //   title: "Events",
            //   data: events,
            //   renderItem: renderEvent,
            // },
          ]}
          ListEmptyComponent={() => {
            if (loading) {
              return <ActivityIndicator size="small" />;
            }
            return null;
          }}
          keyExtractor={(item: any) => item.id}
          ItemSeparatorComponent={() => <Divider />}
        />
      )} */}
    </>
  );
};

export default withNavigation(SearchScreenPresenter);
