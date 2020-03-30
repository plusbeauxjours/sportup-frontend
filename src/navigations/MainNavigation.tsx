import { createSwitchNavigator, createAppContainer } from "react-navigation";
import MainDrawer from "./MainDrawer";
import AuthLoadingContainer from "../components/AuthLoadingContainer";
import AuthNavigation from "./AuthNavigation";

const MainNavigation = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingContainer,
    Auth: AuthNavigation,
    Main: MainDrawer
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(MainNavigation);
