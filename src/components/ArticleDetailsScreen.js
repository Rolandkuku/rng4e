import React from "react";

import { Post } from ".";

function ArticleDetailsScreen({ navigation }) {
  return <Post post={navigation.getParam("post")} />;
}

export { ArticleDetailsScreen };
