import React, { useState } from "react";
import styled from "styled-components/native";
import { GET_MAIN_FEED } from "../../screens/FeedScreen/FeedScreenQueries";
import { Input } from "react-native-elements";
import { useMutation } from "react-apollo";
import {
  CreatePost,
  CreatePostVariables,
  GetMainFeed,
  GetMainFeedVariables,
} from "../../types/api";
import { CREATE_POST } from "./WritePostQueries";
import { Button } from "react-native-paper";

const View = styled.View``;

const WritePost: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [createPostFn, loading] = useMutation<CreatePost, CreatePostVariables>(
    CREATE_POST,
    {
      variables: { text },
      update(cache, { data: { createPost } }) {
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
    }
  );
  return (
    <View>
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
        loading={loading}
        disabled={text === ""}
        onPress={() => {
          createPostFn();
          setText("");
        }}
        title="Post"
      />
    </View>
  );
};

export default WritePost;
