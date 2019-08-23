import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  BottomTabBar
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  NewsScreen,
  NewsDetailsScreen,
  ArticleDetailsScreen,
  ArticlesScreen
} from "../components";
import {
  COLOR_PRIMARY,
  COLOR_WHITE,
  COLOR_SECONDARY,
  COLOR_GREY
} from "../styles";
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

const getNavigationOptions = color => {
  return ({ navigation }) => {
    const post: Post = navigation.getParam("post");
    const { routeName } = navigation.state;
    return {
      title: post ? post.title : getTitle(routeName),
      headerStyle: {
        backgroundColor: color
      },
      headerTitleStyle: {
        color: COLOR_WHITE
      },
      headerTintColor: COLOR_WHITE
    };
  };
};

const NewsNavigator = createStackNavigator({
  News: {
    screen: NewsScreen,
    navigationOptions: getNavigationOptions(COLOR_PRIMARY)
  },
  NewsDetails: {
    screen: NewsDetailsScreen,
    navigationOptions: getNavigationOptions(COLOR_PRIMARY)
  }
});

const ArticlesNavigator = createStackNavigator({
  Articles: {
    screen: ArticlesScreen,
    navigationOptions: getNavigationOptions(COLOR_SECONDARY)
  },
  ArticleDetails: {
    screen: ArticleDetailsScreen,
    navigationOptions: getNavigationOptions(COLOR_SECONDARY)
  }
});

const AppNavigator = createBottomTabNavigator(
  {
    News: {
      screen: NewsNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon
            name="mobile-alt"
            size={30}
            color={focused ? COLOR_WHITE : COLOR_GREY}
          />
        )
      })
    },
    Articles: {
      screen: ArticlesNavigator,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon
            name="newspaper"
            size={30}
            color={focused ? COLOR_WHITE : COLOR_GREY}
          />
        )
      })
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    },
    tabBarComponent: props => {
      const { index } = props.navigation.state;
      return (
        <BottomTabBar
          {...props}
          style={{
            backgroundColor: index ? COLOR_SECONDARY : COLOR_PRIMARY
          }}
        />
      );
    }
  }
);

export { AppNavigator };
