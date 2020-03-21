import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import ImpressumPage from "./pages/ImpressumPage"

const AppNavigator = createStackNavigator({
  Home: {
    screen: ListPage
  },
  DetailPage: {
    screen: DetailPage
  },
  ImpressumPage: {
    screen: ImpressumPage
  }
});




export default createAppContainer(AppNavigator);
