import React from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";

const UserCardList = ({ users, ...rest }) => (
  <FlatList
    data={users}
    ItemSeparatorComponent={() => <Divider />}
    {...rest}
    showsVerticalScrollIndicator={false}
  />
);

export default UserCardList;
