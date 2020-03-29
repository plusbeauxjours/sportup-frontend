import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainDrawer from "./MainDrawer";

const MainNavigation = createStackNavigator(
  { MainDrawer },
  { headerMode: "none" }
);

export default createAppContainer(MainNavigation);
