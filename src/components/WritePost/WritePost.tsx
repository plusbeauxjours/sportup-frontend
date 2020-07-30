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
import constants from "../../constants/dimensions";
import { useHeaderHeight } from "react-navigation-stack";

const Container = styled.View<ITheme>`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 3px 3px 0 3px;
  background-color: white;
  width: 50%;
  height: ${(props) => props.height - props.headerHeight}px;
  margin-bottom: 3px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
`;

const Border = styled.View`
  width: 100%;
  height: 100%;
  border-color: #999;
  border-width: 0.2px;
  border-radius: 20px;
  padding: 30px 0;
  align-items: center;
  justify-content: center;
`;

const WhiteSpace = styled.View<ITheme>`
  height: ${(props) => props.headerHeight}px;
`;

interface ITheme {
  height?: number;
  headerHeight?: number;
}

interface IProps {
  scrollRef: any;
}

const WritePost: React.FC<IProps> = ({ scrollRef }) => {
  const headerHeight = useHeaderHeight();
  const { height } = constants;
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
    scrollRef.current &&
      scrollRef.current?.getNode()?.scrollToStart({ animated: true });
  };
  return (
    <>
      <WhiteSpace headerHeight={headerHeight} />
      <Container headerHeight={headerHeight} height={height}>
        <Border>
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
          <WhiteSpace headerHeight={headerHeight} />
          <ButtonContainer>
            <Button
              loading={createPostLoading}
              disabled={text === ""}
              onPress={onPress}
              text={"Post"}
            />
          </ButtonContainer>
        </Border>
      </Container>
    </>
  );
};

export default WritePost;
