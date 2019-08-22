import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { StyleSheet } from "react-native";
import {
  NewsScreen,
  NewsDetailsScreen,
  ArticleDetailsScreen,
  ArticlesScreen
} from "../components";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles";
import type { Post } from "../types";

const getTitle = routeName => {
  switch (routeName) {
    case "News":
      return "Brèves";
    case "Articles":
      return "Articles";
    default:
      return "Girondins4ever";
  }
};

const navigationOptions = ({ navigation }) => {
  const post: Post = navigation.getParam("post");
  const { routeName } = navigation.state;
  return {
    title: post ? post.title : getTitle(routeName)
  };
};

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: COLOR_PRIMARY
  },
  headerTitleStyle: {
    color: COLOR_WHITE
  },
  headerTintColor: COLOR_WHITE
};

const NewsNavigator = createStackNavigator(
  {
    News: {
      screen: NewsScreen,
      navigationOptions
    },
    NewsDetails: { screen: NewsDetailsScreen, navigationOptions }
  },
  { defaultNavigationOptions }
);

const ArticlesNavigator = createStackNavigator({
  Articles: { screen: ArticlesScreen, navigationOptions },
  ArticleDetails: { screen: ArticleDetailsScreen, navigationOptions }
});

const AppNavigator = createBottomTabNavigator({
  NewsNavigator,
  ArticlesNavigator
});

export { AppNavigator };
