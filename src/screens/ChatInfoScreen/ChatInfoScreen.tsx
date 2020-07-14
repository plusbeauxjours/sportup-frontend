import React, { useState } from "react";
import { Title, Dialog, TextInput, Button } from "react-native-paper";
import { Icon } from "react-native-elements";
import styled from "styled-components/native";
import users from "../../temp/users";
import UserCardList from "../../components/UserCardList";

const View = styled.View``;
const TitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  opacity: 0.5;
`;

const ChatInfoScreen = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  console.log("koko");
  return (
    <View style={{ flex: 1 }}>
      <TitleContainer onPress={() => setModalOpen(true)}>
        <Title>{navigation.getParam("chatName")}</Title>
        <Icon name="edit" />
      </TitleContainer>
      <Button icon="person-add">Add participant</Button>
      <UserCardList
        users={users.map((user) => ({
          ...user,
          bio: "This is a test profile",
        }))}
      />
      <Dialog visible={modalOpen} onDismiss={() => setModalOpen(false)}>
        <Dialog.Title>Enter group title...</Dialog.Title>
        <Dialog.Content>
          <TextInput
            placeholder="Enter new title..."
            value={text}
            onChangeText={(text) => setText(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setModalOpen(false)}>Cancel</Button>
          <Button>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};
ChatInfoScreen.navigationOptions = {
  title: "Chat Info",
};

export default ChatInfoScreen;
