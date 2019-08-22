import React from "react";

import { Post } from ".";

function NewsDetailsScreen({ navigation }) {
  return <Post isNews post={navigation.getParam("post")} />;
}

export { NewsDetailsScreen };
