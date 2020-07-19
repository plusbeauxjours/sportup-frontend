import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Divider, Appbar } from "react-native-paper";
import styled from "styled-components/native";
import * as firebase from "firebase/app";
import "firebase/database";

import ChatCard from "../../components/ChatCard";
import { useMe } from "../../context/meContext";
import Loader from "../../components/Loader";
import ListFooterComponent from "../../components/ListFooterComponent";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ChatListScreen = () => {
  const { me, loading: meLoading } = useMe();
  const [chats, setChats] = useState<any>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getChats = async () => {
    setLoading(true);
    return new Promise<string>((resolve, reject) => {
      firebase
        .database()
        .ref()
        .child("chats")
        .once("value", (snapshot) => {
          if (snapshot.val()) {
            setChats(Object.values(snapshot.val()));
          }
        });
      setLoading(false);
    });
  };
  const amISender = (item) => {
    return item.sender._id === me?.user?.id;
  };
  const onRefresh = () => {
    try {
      setRefreshing(true);
      getChats();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    getChats();
  });
  if (meLoading) {
    return <Loader />;
  } else if (chats) {
    return (
      <Container>
        <FlatList
          data={chats}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }: any) => (
            <ChatCard
              status={item.status}
              createdAt={item.createdAt}
              lastMessage={item.lastMessage}
              chatId={item._id}
              senderUsername={
                amISender(item)
                  ? item.sender.senderUsername
                  : item.sender.receiverUsername
              }
              senderUserId={amISender(item) ? item.sender._id : item.sender._id}
              senderPushToken={
                amISender(item)
                  ? item.sender.senderPushToken
                  : item.sender.receiverPushToken
              }
              receiverUsername={
                amISender(item)
                  ? item.receiver.receiverUsername
                  : item.receiver.senderUsername
              }
              receiverUserId={
                amISender(item) ? item.receiver._id : item.receiver._id
              }
              receiverPushToken={
                amISender(item)
                  ? item.receiver.receiverPushToken
                  : item.receiver.senderPushToken
              }
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <Divider />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <ListFooterComponent loading={loading} />}
        />
      </Container>
    );
  }
  return null;
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
