import React, { useState } from "react";
import styled from "styled-components/native";
import { Input } from "react-native-elements";
import { useMutation } from "react-apollo";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useNavigation } from "@react-navigation/native";

import {
  CreatePost,
  CreatePostVariables,
  GetMainFeed,
  GetMainFeedVariables,
} from "../../types/api";
import { CREATE_POST } from "./WritePostScreenQueries";
import { GET_MAIN_FEED } from "../FeedScreen/FeedScreenQueries";
import { MY_FEED } from "../MyProfileScreen/MyProfileScreenQueries";
import { GetMyFeed } from "../../types/api";
import Button from "../../components/Button";
import BackBtn from "../../components/BackBtn";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const WhiteSpace = styled.View`
  height: 40px;
`;

const Box = styled.View`
  height: 100%;
  padding: 30px 0;
  align-items: center;
  justify-content: center;
`;

const WritePostScreen: NavigationStackScreenComponent = () => {
  const navigation = useNavigation();
  const [text, setText] = useState<string>("");
  const [createPostFn, { loading: createPostLoading }] = useMutation<
    CreatePost,
    CreatePostVariables
  >(CREATE_POST, {
    variables: { text },
    update(cache, { data: { createPost } }) {
      try {
        const data = cache.readQuery<GetMyFeed>({
          query: MY_FEED,
          variables: { pageNum: 1 },
        });
        cache.writeQuery({
          query: MY_FEED,
          variables: { pageNum: 1 },
          data: {
            getMyFeed: {
              ...data.getMyFeed,
              posts: [createPost.post, ...data.getMyFeed.posts],
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
      try {
        const data = cache.readQuery<GetMainFeed, GetMainFeedVariables>({
          query: GET_MAIN_FEED,
          variables: { pageNum: 1 },
        });
        cache.writeQuery({
          query: GET_MAIN_FEED,
          variables: { pageNum: 1 },
          data: {
            getMainFeed: {
              ...data.getMainFeed,
              posts: [createPost.post, ...data.getMainFeed.posts],
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
  const onPress = () => {
    createPostFn();
    setText("");
    navigation.navigate("FeedScreen");
  };
  return (
    <Container>
      <Box>
        <Input
          label={"Write post..."}
          style={{ height: 100, zIndex: 10 }}
          value={text}
          autoCorrect={false}
          autoFocus={true}
          autoCapitalize="none"
          onChangeText={(text) => setText(text)}
          multiline
        />
        <WhiteSpace />
        <Button
          loading={createPostLoading}
          disabled={text === ""}
          onPress={onPress}
          text={"Post"}
        />
      </Box>
    </Container>
  );
};

export default WritePostScreen;
