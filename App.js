// @flow

import React from "react";
import { createAppContainer } from "react-navigation";
import { AppNavigator } from "./src";

const AppContainer = createAppContainer(AppNavigator);

export default function() {
  return <AppContainer />;
}
