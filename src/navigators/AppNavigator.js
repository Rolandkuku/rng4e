import { createStackNavigator } from "react-navigation";
import { News, NewsDetails } from "../components";

const AppNavigator = createStackNavigator({
  News,
  NewsDetails
});

export { AppNavigator };
