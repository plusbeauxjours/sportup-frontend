import React, { useState } from "react";
import styled from "styled-components";
import { GET_MAIN_FEED } from "../../screens/Feed/FeedQueries";
import { Input } from "react-native-elements";
import { useMutation } from "react-apollo";
import {
  CreatePost,
  CreatePostVariables,
  GetMainFeed,
  GetMainFeedVariables
} from "../../types/api";
import { CREATE_POST } from "./WritePostQueries";

const View = styled.View``;
const Button = styled.Button`
  align-self: flex-end;
`;

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
            variables: { pageNum: 1 }
          });
          cache.writeQuery({
            query: GET_MAIN_FEED,
            variables: { pageNum: 1 },
            data: {
              getMainFeed: {
                ...data.getMainFeed,
                posts: [createPost.post, ...data.getMainFeed.posts]
              }
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
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
        onChangeText={text => {
          setText(text), console.log(text);
        }}
        multiline
      />
      <Button
        raised
        primary
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
