import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import { Caption } from "react-native-paper";
import { UPVOTED, DOWNVOTED } from "../../constants/strings";
import {
  REMOVE_POST_INTERACTION,
  UPVOTE_POST,
  DOWNVOTE_POST,
} from "../VoteBtn/VoteBtnQueries";
import {
  UpvotePost,
  UpvotePostVariables,
  DownvotePost,
  DownvotePostVariables,
  RemovePostInteraction,
  RemovePostInteractionVariables,
} from "../../types/api";

const PostVoteContainer = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 50px;
`;

interface IProps {
  postId: string;
  interaction: string;
  score: number;
}

const VoteBtn: React.FC<IProps> = ({
  postId: postId,
  interaction,
  score: scoreProp,
}) => {
  const [upvoteSelected, setUpvoteSelected] = useState<boolean>(false);
  const [downvoteSelected, setDownvoteSelected] = useState<boolean>(false);
  const [score, setScore] = useState<number>(scoreProp);
  const [
    removePostInteractionFn,
    { loading: removePostInteractionLoading },
  ] = useMutation<RemovePostInteraction, RemovePostInteractionVariables>(
    REMOVE_POST_INTERACTION,
    { variables: { postId } }
  );
  const [upVotePostFn, { loading: upVotePostLoading }] = useMutation<
    UpvotePost,
    UpvotePostVariables
  >(UPVOTE_POST, { variables: { postId } });
  const [downVotePostFn, { loading: downVotePostLoading }] = useMutation<
    DownvotePost,
    DownvotePostVariables
  >(DOWNVOTE_POST, { variables: { postId } });
  const toggleUpvote = () => {
    if (downvoteSelected) {
      toggleDownvote();
    }
    upvoteSelected
      ? setScore((score) => score - 1)
      : setScore((score) => score + 1);
    setUpvoteSelected(!upvoteSelected);
  };
  const toggleDownvote = () => {
    if (upvoteSelected) {
      toggleUpvote();
    }
    downvoteSelected
      ? setScore((score) => score + 1)
      : setScore((score) => score - 1);
    setDownvoteSelected(!downvoteSelected);
  };

  useEffect(() => {
    switch (interaction) {
      case UPVOTED:
        setUpvoteSelected(true);
        break;
      case DOWNVOTED:
        setDownvoteSelected(true);
        break;
      default:
    }
    setScore(scoreProp);
  }, []);

  return (
    <PostVoteContainer>
      <Icon
        color={upvoteSelected ? "red" : "gray"}
        containerStyle={{ paddingHorizontal: 10 }}
        onPress={() => {
          if (upvoteSelected) {
            removePostInteractionFn();
          } else {
            upVotePostFn();
          }
          toggleUpvote();
        }}
        name="arrow-upward"
      />
      <Caption>{score}</Caption>
      <Icon
        color={downvoteSelected ? "blue" : "gray"}
        containerStyle={{ paddingHorizontal: 10 }}
        onPress={() => {
          if (downvoteSelected) {
            removePostInteractionFn();
          } else {
            downVotePostFn();
          }
          toggleDownvote();
        }}
        name="arrow-downward"
      />
    </PostVoteContainer>
  );
};

export default VoteBtn;
