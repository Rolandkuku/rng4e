import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import {
  NewsScreen,
  NewsDetailsScreen,
  ArticleDetailsScreen,
  ArticlesScreen
} from "../components";

const NewsNavigator = createStackNavigator({
  News: NewsScreen,
  NewsDetails: NewsDetailsScreen
});

const ArticlesNavigator = createStackNavigator({
  Articles: ArticlesScreen,
  ArticleDetails: ArticleDetailsScreen
});

const AppNavigator = createBottomTabNavigator({
  NewsNavigator,
  ArticlesNavigator
});

export { AppNavigator };
