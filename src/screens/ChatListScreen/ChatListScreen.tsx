import React from "react";
import { FlatList } from "react-native";
import { Divider, Appbar } from "react-native-paper";
import chats from "../../temp/chat";
import ChatCard from "../../components/ChatCard";

const ChatListScreen = () => {
  console.log(chats);
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatCard {...item} />}
      keyExtractor={(chat) => chat.id.toString()}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
};
ChatListScreen.navigationOptions = ({ navigation }) => ({
  title: "Chat",
  headerLeft: () => (
    <Appbar.Action
      icon="menu"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  ),
});

export default ChatListScreen;
