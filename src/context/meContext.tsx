import React, { createContext, useContext } from "react";
import { useQuery } from "react-apollo-hooks";
import { Me } from "../types/api";
import { ME } from "../screens/MyProfileScreen/MyProfileScreenQueries";

export const MeContext = createContext(null);

export const MeProvider = ({ children }) => {
  const { data: { me = null } = {}, loading } = useQuery<Me>(ME);
  return (
    <MeContext.Provider value={{ me, loading }}>{children}</MeContext.Provider>
  );
};
export const useMe = () => {
  const { me, loading } = useContext(MeContext);
  return { me, loading };
};
