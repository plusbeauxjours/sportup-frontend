import React, { useState } from "react";
import styled from "styled-components/native";
import { Input } from "react-native-elements";
import { useMutation } from "react-apollo";
import {
  CreatePost,
  CreatePostVariables,
  GetMainFeed,
  GetMainFeedVariables,
} from "../../types/api";
import { CREATE_POST } from "./WritePostQueries";
import { GET_MAIN_FEED } from "../../screens/FeedScreen/FeedScreenQueries";
import { MY_FEED } from "../../screens/MyProfileScreen/MyProfileScreenQueries";
import { GetMyFeed } from "../../types/api";
import Button from "../../components/Button";

const Container = styled.View`
  padding: 3px 3px 0 3px;
  background-color: white;
  margin-bottom: 3px;
`;

const Border = styled.View`
  width: 100%;
  height: 160px;
  border-color: #999;
  border-width: 0.2px;
  border-radius: 20px;
  padding-top: 30px;
  align-items: center;
  justify-content: space-between;
`;

const WritePost: React.FC = () => {
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
  };
  return (
    <Container>
      <Border>
        <Input
          label={"Write post..."}
          style={{ height: 100 }}
          value={text}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) => setText(text)}
          multiline
        />
        <Button
          loading={createPostLoading}
          disabled={text === ""}
          onPress={onPress}
          text={"Post"}
        />
      </Border>
    </Container>
  );
};

export default WritePost;
