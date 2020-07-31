import React from "react";
import { ActivityIndicator } from "react-native";

import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: #2d4da7;
  width: 240px;
  height: 40px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const LoginTextContainer = styled.View`
  width: 210px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

interface IProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fbLogin: () => void;
}

const FacebookApproachPresenter: React.FC<IProps> = ({
  loading,
  setLoading,
  fbLogin,
}) => {
  return (
    <Touchable
      disabled={loading}
      onPress={() => {
        setLoading(true), fbLogin();
      }}
    >
      <Container>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <LoginTextContainer>
            <FontAwesome
              name={"facebook"}
              color={"white"}
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text>CONTINUE WITH FACEBOOK</Text>
          </LoginTextContainer>
        )}
      </Container>
    </Touchable>
  );
};

export default FacebookApproachPresenter;
