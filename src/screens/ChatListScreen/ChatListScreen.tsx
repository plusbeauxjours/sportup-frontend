import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Divider, Appbar } from "react-native-paper";

import * as firebase from "firebase/app";
import "firebase/database";

import chats from "../../temp/chat";
import ChatCard from "../../components/ChatCard";

const ChatListScreen = () => {
  const [chatss, setChats] = useState<any>([]);

  const getChats = async () => {
    return new Promise<string>((resolve, reject) => {
      firebase
        .database()
        .ref()
        .child("chats")
        .once("value", (snapshot) => {
          console.log(snapshot);
          if (snapshot.val()) {
            setChats(snapshot.val());
          }
        });
    });
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatCard {...item} />}
        keyExtractor={(chat: any) => chat.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
      />
    </>
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
